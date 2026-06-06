import os
import numpy as np
from sklearn.model_selection import train_test_split
import cv2  # For image resizing
from PIL import Image  # For loading images

def load_and_preprocess_data(ictal_dir='data/ictal', preictal_dir='data/preictal', img_size=(224, 224)):
    """
    Load images from directories, preprocess, and split.
    Assumes images are in 'ictal' (label 1) and 'preictal' (label 0) folders.
    """
    X = []
    y = []
    
    # Load ictal images (label 1)
    for img_file in os.listdir(ictal_dir):
        if img_file.endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(ictal_dir, img_file)
            img = Image.open(img_path).convert('L')  # Grayscale
            img = np.array(img)
            img = cv2.resize(img, img_size)  # Resize
            img = img / 255.0  # Normalize to [0, 1]
            img = np.expand_dims(img, axis=-1)  # Add channel dim: (224, 224, 1)
            X.append(img)
            y.append(1)
    
    # Load preictal images (label 0)
    for img_file in os.listdir(preictal_dir):
        if img_file.endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(preictal_dir, img_file)
            img = Image.open(img_path).convert('L')  # Grayscale
            img = np.array(img)
            img = cv2.resize(img, img_size)  # Resize
            img = img / 255.0  # Normalize
            img = np.expand_dims(img, axis=-1)  # Add channel dim
            X.append(img)
            y.append(0)
    
    X = np.array(X)  # Shape: (num_samples, 224, 224, 1)
    y = np.array(y)
    
    # Split into train, val, test
    X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)
    X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42, stratify=y_temp)
    
    return X_train, X_val, X_test, y_train, y_val, y_test

# For quick sanity test if run standalone
if __name__ == "__main__":
    X_train, X_val, X_test, y_train, y_val, y_test = load_and_preprocess_data()
    print("Train shape:", X_train.shape)
    print("Val shape:", X_val.shape)
    print("Test shape:", X_test.shape)