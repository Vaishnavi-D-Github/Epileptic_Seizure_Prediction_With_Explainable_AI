# shap_explanation.py
import shap
import numpy as np
import tensorflow as tf
import pickle
import warnings
import matplotlib
matplotlib.use('Agg')  # Prevent Tkinter GUI issues
import matplotlib.pyplot as plt
import matplotlib.cm as cm
from PIL import Image
import cv2

warnings.filterwarnings('ignore')

def visualize_shap_overlay(img, shap_values, save_path=None, title="Model Focus Map"):
    """
    Creates a SHAP heatmap overlay with binary colors (red for positive, blue for negative).
    """
    # Use diverging colormap for binary colors: red for positive, blue for negative
    shap_colormap = cm.get_cmap('RdBu')  # Red-Blue diverging colormap

    # Normalize SHAP values centered at zero for proper diverging scale
    shap_min = np.min(shap_values)
    shap_max = np.max(shap_values)
    norm = plt.Normalize(vmin=shap_min, vmax=shap_max)

    # Convert grayscale input image to RGB
    img_rgb = cv2.cvtColor((img * 255).astype(np.uint8), cv2.COLOR_GRAY2RGB)

    # Create heatmap in RGBA using normalized SHAP values
    shap_heat = shap_colormap(norm(shap_values))
    shap_heat = (shap_heat[:, :, :3] * 255).astype(np.uint8)

    # Blend image + SHAP heatmap (adjust alpha for intensity)
    overlay = cv2.addWeighted(img_rgb, 0.6, shap_heat, 0.6, 0)

    # Plot using Matplotlib with subplots to fix colorbar issue
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.imshow(overlay)
    ax.set_title(title, fontsize=14, fontweight='bold', color='#3a1c8d')
    ax.axis('off')

    # Add colorbar for interpretability with the same norm
    mappable = cm.ScalarMappable(cmap='RdBu', norm=norm)
    cbar = plt.colorbar(mappable, ax=ax, fraction=0.046, pad=0.04)
    cbar.set_label('Feature Importance (SHAP Value)', fontsize=10, color='#3a1c8d')

    if save_path:
        plt.savefig(save_path, bbox_inches='tight', dpi=200)
        plt.close()
    else:
        plt.show()

def explain_prediction(model, X_sample, background_samples=None, save_path=None):
    """
    Generate SHAP values for image-based epilepsy prediction and save overlay.
    """
    # 🧠 Ensure model is in inference mode
    model.trainable = False

    # --- Load background safely ---
    if background_samples is None:
        try:
            with open('models/shap_background.pkl', 'rb') as f:
                background_samples = pickle.load(f)
            print(f"✅ Loaded background of shape {np.array(background_samples).shape}")
        except Exception as e:
            print(f"⚠️ Background load failed ({e}), using random background")
            background_samples = np.random.rand(50, 224, 224, 1).astype(np.float32)
    else:
        background_samples = np.array(background_samples, dtype=np.float32)

    if isinstance(background_samples, tf.Tensor):
        background_samples = background_samples.numpy()
    if background_samples.shape[0] > 50:
        background_samples = background_samples[:50]

    # --- Ensure sample shape ---
    if X_sample.ndim == 3:
        X_sample = np.expand_dims(X_sample, axis=0)
    X_sample = np.array(X_sample, dtype=np.float32)

    # ✅ Step 1: Model prediction (always happens)
    prediction = model.predict(X_sample, verbose=0)
    predicted_label = np.argmax(prediction) if prediction.shape[-1] > 1 else float(prediction[0][0])
    print(f"✅ Prediction done. Model output: {predicted_label}")

    try:
        # --- Use DeepExplainer (works for CNNs) ---
        explainer = shap.DeepExplainer(model, background_samples)
        shap_values = explainer.shap_values(X_sample)

        if isinstance(shap_values, list):
            shap_values = shap_values[0]

        shap_values = np.squeeze(shap_values)
        img = np.squeeze(X_sample)

        # --- Create interpretable SHAP overlay ---
        visualize_shap_overlay(img, shap_values, save_path=save_path)

        if save_path:
            print(f"✅ Saved SHAP plot to {save_path}")
        else:
            plt.show()

        return shap_values

    except Exception as e:
        print(f"❌ SHAP explanation failed due to: {e}")
        return np.zeros((224, 224))

def create_shap_background_from_training(X_train, num_samples=100):
    """
    Create a background dataset for SHAP explanations using a random subset
    of the training data.
    """
    import numpy as np

    if isinstance(X_train, list):
        X_train = np.array(X_train)
        
    if len(X_train) > num_samples:
        idx = np.random.choice(len(X_train), num_samples, replace=False)
        background = X_train[idx]
    else:
        background = X_train

    # Save the background
    with open('models/shap_background.pkl', 'wb') as f:
        pickle.dump(background, f)
    print(f"✅ Saved SHAP background to models/shap_background.pkl with shape {background.shape}")

    return background