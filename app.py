from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    flash,
    jsonify,
)
import os
import numpy as np
from tensorflow.keras.models import load_model
import pickle
from shap_explanation import explain_prediction
import cv2
from PIL import Image
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # For flash messages


def allowed_file(filename: str) -> bool:
    return filename.lower().endswith(('.png', '.jpg', '.jpeg'))


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS'
    return response

# Load model and background
model = load_model('models/epilepsy_model.keras')
try:
    with open('models/shap_background.pkl', 'rb') as f:
        background = pickle.load(f)
except FileNotFoundError:
    background = None

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        file = request.files.get('file')  # ⬅️ get the single uploaded file

        if not file or not allowed_file(file.filename):
            flash('Please upload a valid image file.')
            return redirect(request.url)

        image_results = []
        total_confidence = 0

        os.makedirs('static/uploads', exist_ok=True)

        # Process the single file without saving to disk
        try:
            # Preprocess image directly from file stream
            img = Image.open(file.stream).convert('L')
            img_array = np.array(img)
            img_resized = cv2.resize(img_array, (224, 224))
            img_normalized = img_resized / 255.0
            X_sample = np.expand_dims(img_normalized, axis=[0, -1])

            # Prediction
            prediction = model.predict(X_sample, verbose=0)[0][0]
            label = "Seizure EEG Detected" if prediction > 0.5 else "Non-Seizure EEG"
            confidence = prediction if prediction > 0.5 else 1 - prediction
            total_confidence += confidence

            # SHAP explanation (plot still saved for web display)
            plot_path = os.path.join('static/uploads', f"shap_{file.filename}.png")
            shap_values = explain_prediction(model, X_sample, background, save_path=plot_path)

            image_results.append({
                "filename": file.filename,
                "label": label,
                "confidence": f"{confidence*100:.1f}%",
                "plot_url": url_for('static', filename=f'uploads/shap_{file.filename}.png')
            })
        except Exception as e:
            flash(f"Error processing {file.filename}: {str(e)}")

        # Calculate overall average confidence (though it's single, kept for consistency)
        if image_results:
            avg_conf = total_confidence / len(image_results)
            overall_label = "Seizure EEG Detected" if avg_conf > 0.5 else "Non-Seizure EEG"
            overall_confidence = f"{avg_conf*100:.1f}%"
        else:
            overall_label = "No valid images processed"
            overall_confidence = "N/A"

        return render_template('predict.html', 
                               uploaded=True,
                               overall_label=overall_label,
                               overall_confidence=overall_confidence,
                               image_results=image_results)

    return render_template('predict.html', uploaded=False)


@app.route('/api/predict', methods=['POST', 'OPTIONS'])
def api_predict():
    if request.method == 'OPTIONS':
        return ('', 204)

    files = request.files.getlist('files')

    if not files:
        return jsonify({'error': 'No files uploaded'}), 400

    os.makedirs('static/uploads', exist_ok=True)

    image_results = []
    errors = []

    for file in files:
        if not file or not allowed_file(file.filename):
            errors.append(f'{file.filename or "Unknown file"} is not a supported image type.')
            continue

        filename = secure_filename(file.filename)

        try:
            img = Image.open(file.stream).convert('L')
            img_array = np.array(img)
            img_resized = cv2.resize(img_array, (224, 224))
            img_normalized = img_resized / 255.0
            X_sample = np.expand_dims(img_normalized, axis=[0, -1])

            prediction = model.predict(X_sample, verbose=0)[0][0]
            label = "Seizure EEG Detected" if prediction > 0.5 else "Non-Seizure EEG"
            confidence = prediction if prediction > 0.5 else 1 - prediction

            plot_filename = f"shap_{filename}.png"
            plot_path = os.path.join('static/uploads', plot_filename)
            explain_prediction(model, X_sample, background, save_path=plot_path)

            image_results.append({
                "filename": filename,
                "label": label,
                "confidence": f"{confidence * 100:.1f}%",
                "plot_url": url_for('static', filename=f'uploads/{plot_filename}', _external=True)
            })
        except Exception as e:
            errors.append(f"Error processing {filename}: {str(e)}")

    if not image_results:
        return jsonify({"errors": errors or ["No valid images processed."]}), 400

    response = {"image_results": image_results}

    if errors:
        response["errors"] = errors

    return jsonify(response), 200

@app.route('/hospitals')
def hospitals():
    return render_template('hospitals.html')

if __name__ == '__main__':
    app.run(debug=True)
