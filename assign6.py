import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import accuracy_score, classification_report

# --- Generate a valid synthetic binary classification dataset ---
X, y = make_classification(
    n_samples=500,
    n_features=2,
    n_classes=2,
    n_clusters_per_class=1,
    n_informative=2,
    n_redundant=0,
    random_state=42
)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# --- Logistic Regression: Gradient Descent Implementation ---
class LogisticRegressionGD:
    def __init__(self, learning_rate=0.1, n_iter=2000):
        self.lr = learning_rate
        self.n_iter = n_iter
        self.weights = None
        self.bias = None

    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))

    def fit(self, X, y):
        m, n = X.shape
        self.weights = np.zeros(n)
        self.bias = 0

        for _ in range(self.n_iter):
            linear = np.dot(X, self.weights) + self.bias
            pred = self.sigmoid(linear)

            dw = (1 / m) * np.dot(X.T, (pred - y))
            db = (1 / m) * np.sum(pred - y)

            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict(self, X):
        linear = np.dot(X, self.weights) + self.bias
        pred_prob = self.sigmoid(linear)
        return (pred_prob >= 0.5).astype(int)

# Train and evaluate custom logistic regression
logreg_gd = LogisticRegressionGD(learning_rate=0.1, n_iter=2000)
logreg_gd.fit(X_train, y_train)
y_pred_lr_gd = logreg_gd.predict(X_test)

print("Logistic Regression (Gradient Descent) Classification Report:")
print(classification_report(y_test, y_pred_lr_gd))
print("Accuracy:", accuracy_score(y_test, y_pred_lr_gd))

# --- Compare with Linear Regression (on binary target) ---
linreg = LinearRegression()
linreg.fit(X_train, y_train)
y_pred_linreg = linreg.predict(X_test)
y_pred_linreg_class = (y_pred_linreg >= 0.5).astype(int)

print("\nLinear Regression (used for Classification) Classification Report:")
print(classification_report(y_test, y_pred_linreg_class))
print("Accuracy:", accuracy_score(y_test, y_pred_linreg_class))

print(
"""
Comparison:
- Logistic Regression (GD) optimizes for classification by predicting probabilities in [0,1], yielding more reliable and realistic class predictions.
- Linear Regression treats the target as continuous and the thresholding approach produces less reliable classification, as it doesn't capture the probabilistic nature of classification tasks.
- For binary classification, Logistic Regression should always be preferred.
"""
)
