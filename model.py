import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
from data_preprocessing import load_and_preprocess_data
from shap_explanation import create_shap_background_from_training
import pickle
import os

def build_cnn_model(input_shape=(224, 224, 1)):  # 2D CNN for images (grayscale)
    inputs = Input(shape=input_shape)
    
    # CNN layers for spatial features in images
    x = Conv2D(32, (3, 3), activation='relu', padding='same')(inputs)
    x = MaxPooling2D((2, 2))(x)
    x = Conv2D(64, (3, 3), activation='relu', padding='same')(x)
    x = MaxPooling2D((2, 2))(x)
    x = Conv2D(128, (3, 3), activation='relu', padding='same')(x)
    x = MaxPooling2D((2, 2))(x)
    x = Flatten()(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.5)(x)
    outputs = Dense(1, activation='sigmoid')(x)
    
    model = Model(inputs, outputs)
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

def train_model():
    # Load data (now images)
    X_train, X_val, X_test, y_train, y_val, y_test = load_and_preprocess_data()
    
    model = build_cnn_model()
    
    early_stop = EarlyStopping(monitor='val_accuracy', patience=5, restore_best_weights=True)
    history = model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=50,
        batch_size=32,
        callbacks=[early_stop]
    )
    
    # Evaluate
    test_loss, test_acc = model.evaluate(X_test, y_test)
    print(f"Test Accuracy: {test_acc * 100:.2f}%")
    
    # Ensure 'models' directory exists
    os.makedirs('models', exist_ok=True)
    
    # Save model in .keras format
    model.save('models/epilepsy_model.keras')
    
    # No scaler needed for images (handled via normalization in preprocessing)
    print("Model saved. No scaler needed for images.")
    
    # Save background samples for SHAP
    print("\nCreating SHAP background samples...")
    create_shap_background_from_training(X_train, num_samples=50)
    
    return model

if __name__ == "__main__":  
    model = train_model()