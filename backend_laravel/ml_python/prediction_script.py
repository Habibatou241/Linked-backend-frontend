# -*- coding: utf-8 -*-
import sys
import io
import pandas as pd
import json
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import (
    RandomForestClassifier, RandomForestRegressor,
    GradientBoostingClassifier, GradientBoostingRegressor,
    AdaBoostClassifier, AdaBoostRegressor,
    StackingClassifier, StackingRegressor
)
from sklearn.svm import SVC, SVR
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.neural_network import MLPClassifier, MLPRegressor
from sklearn.metrics import f1_score, accuracy_score, mean_squared_error, r2_score
from math import sqrt
from xgboost import XGBClassifier, XGBRegressor  

# Forcer la sortie en UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def load_data(path):
    return pd.read_csv(path)

def get_models(task):
    if task == "classification":
        return {
            "Decision Tree": DecisionTreeClassifier(),
            "Random Forest": RandomForestClassifier(),
            "SVM": SVC(probability=True),
            "ANN": MLPClassifier(max_iter=500),
            "Gradient Boosting": GradientBoostingClassifier(),
            "XGBoost": XGBClassifier(use_label_encoder=False, eval_metric='logloss'),
            "AdaBoost": AdaBoostClassifier(),
            "KNN": KNeighborsClassifier()
        }
    else:
        return {
            "Decision Tree": DecisionTreeRegressor(),
            "Random Forest": RandomForestRegressor(),
            "SVM": SVR(),
            "ANN": MLPRegressor(max_iter=500),
            "Gradient Boosting": GradientBoostingRegressor(),
            "XGBoost": XGBRegressor(),
            "AdaBoost": AdaBoostRegressor(),
            "KNN": KNeighborsRegressor()
        }

def evaluate_model(model, X_test, y_test, task):
    y_pred = model.predict(X_test)
    if task == "classification":
        return {
            "F1-Score": round(f1_score(y_test, y_pred, average='weighted'), 4),
            "Accuracy": round(accuracy_score(y_test, y_pred), 4)
        }
    else:
        return {
            "RMSE": round(sqrt(mean_squared_error(y_test, y_pred)), 4),
            "R2": round(r2_score(y_test, y_pred), 4)
        }

def get_score_key(task):
    return "F1-Score" if task == "classification" else "R2"

def predict_main(file_path, features, target, task, split_ratio):
    df = load_data(file_path)

    X = df[features]
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=(1 - split_ratio), random_state=42)

    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    models = get_models(task)
    results = {}

    for name, model in models.items():
        model.fit(X_train, y_train)
        metrics = evaluate_model(model, X_test, y_test, task)
        results[name] = metrics

    # Select top 4 models
    sorted_models = sorted(results.items(), key=lambda item: item[1][get_score_key(task)], reverse=True)
    top_models = sorted_models[:4]
    estimators = [(name, get_models(task)[name]) for name, _ in top_models]

    # Stacked model
    if task == "classification":
        stacked = StackingClassifier(estimators=estimators, final_estimator=RandomForestClassifier())
    else:
        stacked = StackingRegressor(estimators=estimators, final_estimator=RandomForestRegressor())

    stacked.fit(X_train, y_train)
    stacked_metrics = evaluate_model(stacked, X_test, y_test, task)
    results["Stacked Model"] = stacked_metrics

    best_model = max(results.items(), key=lambda item: item[1][get_score_key(task)])

    return {
        "selected_features": features,
        "target_variable": target,
        "train_test_split": f"{int(split_ratio*100)}/{int((1-split_ratio)*100)}",
        "task": task,
        "models_comparison": results,
        "best_model": {
            "name": best_model[0],
            "metrics": best_model[1]
        }
    }

if __name__ == "__main__":
    if len(sys.argv) < 6:
        print(json.dumps({"error": "Usage: script.py file_path features_json target task split_ratio"}, ensure_ascii=False, indent=2))
        sys.exit(1)

    path = sys.argv[1]
    features = json.loads(sys.argv[2])
    target = sys.argv[3]
    task = sys.argv[4]  # "classification" or "regression"
    split_ratio = float(sys.argv[5])

    if not os.path.exists(path):
        print(json.dumps({"error": "Fichier introuvable"}, ensure_ascii=False, indent=2))
        sys.exit(1)

    try:
        result = predict_main(path, features, target, task, split_ratio)
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except Exception as e:
        print(json.dumps({"error": str(e)}, ensure_ascii=False, indent=2))
        sys.exit(1)
