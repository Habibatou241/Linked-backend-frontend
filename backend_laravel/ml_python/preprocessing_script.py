import pandas as pd
import json
import sys
import os
import numpy as np
from scipy import stats


def convert_numpy(obj):
    if isinstance(obj, (np.integer, np.floating)):
        return obj.item()
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    return str(obj)


def clean_dataset(df: pd.DataFrame) -> (pd.DataFrame, dict):
    df_cleaned = df.dropna()
    summary = {
        "step": "cleaning",
        "initial_shape": df.shape,
        "cleaned_shape": df_cleaned.shape,
        "rows_removed": df.shape[0] - df_cleaned.shape[0]
    }
    return df_cleaned, summary


def fill_missing_values(df: pd.DataFrame, method: str) -> (pd.DataFrame, dict):
    if method == "mean":
        df_filled = df.fillna(df.mean(numeric_only=True))
    elif method == "median":
        df_filled = df.fillna(df.median(numeric_only=True))
    elif method == "mode":
        df_filled = df.fillna(df.mode().iloc[0])
    else:
        raise ValueError("Invalid fill method. Use 'mean', 'median', or 'mode'.")
    summary = {
        "step": "fill",
        "method_used": method,
        "missing_before": int(df.isnull().sum().sum()),
        "missing_after": int(df_filled.isnull().sum().sum())
    }
    return df_filled, summary


def apply_scaling(df: pd.DataFrame, method: str) -> (pd.DataFrame, dict):
    numeric_cols = df.select_dtypes(include='number').columns.tolist()
    if not numeric_cols:
        raise ValueError("No numeric columns found for scaling.")

    df_scaled = df.copy()
    if method == "normalization":
        df_scaled[numeric_cols] = (df[numeric_cols] - df[numeric_cols].min()) / (df[numeric_cols].max() - df[numeric_cols].min())
    elif method == "standardization":
        df_scaled[numeric_cols] = (df[numeric_cols] - df[numeric_cols].mean()) / df[numeric_cols].std()
    else:
        raise ValueError("Invalid scaling method. Use 'normalization' or 'standardization'.")

    summary = {
        "step": "scaling",
        "method": method,
        "scaled_columns": numeric_cols,
        "original_shape": df.shape,
        "scaled_shape": df_scaled.shape
    }
    return df_scaled, summary


def remove_duplicates(df: pd.DataFrame) -> (pd.DataFrame, dict):
    df_no_duplicates = df.drop_duplicates()
    summary = {
        "step": "duplicates",
        "initial_shape": df.shape,
        "cleaned_shape": df_no_duplicates.shape,
        "duplicates_removed": df.shape[0] - df_no_duplicates.shape[0]
    }
    return df_no_duplicates, summary


def remove_outliers(df: pd.DataFrame, method: str) -> (pd.DataFrame, dict):
    numeric_cols = df.select_dtypes(include='number').columns.tolist()
    if not numeric_cols:
        raise ValueError("No numeric columns found for outlier detection.")

    if method == "zscore":
        z_scores = np.abs(stats.zscore(df[numeric_cols]))
        mask = (z_scores < 3).all(axis=1)
        df_cleaned = df[mask]
    elif method == "iqr":
        Q1 = df[numeric_cols].quantile(0.25)
        Q3 = df[numeric_cols].quantile(0.75)
        IQR = Q3 - Q1
        mask = ~((df[numeric_cols] < (Q1 - 1.5 * IQR)) | (df[numeric_cols] > (Q3 + 1.5 * IQR))).any(axis=1)
        df_cleaned = df[mask]
    else:
        raise ValueError("Invalid outlier method. Use 'zscore' or 'iqr'.")

    summary = {
        "step": "outliers",
        "method": method,
        "original_shape": df.shape,
        "cleaned_shape": df_cleaned.shape,
        "rows_removed": df.shape[0] - df_cleaned.shape[0]
    }
    return df_cleaned, summary


def main():
    try:
        if len(sys.argv) < 3:
            raise Exception("Usage: python preprocessing_script.py <file_path> <preprocessings_json>")

        file_path = sys.argv[1]
        preprocessings_json = sys.argv[2]

        if not os.path.exists(file_path):
            raise FileNotFoundError(f"The file {file_path} does not exist.")

        preprocessings = json.loads(preprocessings_json)
        df = pd.read_csv(file_path)

        summary_before = {
            "rows": df.shape[0],
            "columns": df.shape[1],
            "missing_values": int(df.isnull().sum().sum())
        }

        summaries = []

        for step in preprocessings:
            step_type = step.get("type")
            method = step.get("method")

            if step_type == "cleaning":
                df, summary = clean_dataset(df)
            elif step_type == "fill":
                if not method:
                    raise Exception("Fill method is required.")
                df, summary = fill_missing_values(df, method)
            elif step_type == "scaling":
                if not method:
                    raise Exception("Scaling method is required.")
                df, summary = apply_scaling(df, method)
            elif step_type == "duplicates":
                df, summary = remove_duplicates(df)
            elif step_type == "outliers":
                if not method:
                    raise Exception("Outlier method is required.")
                df, summary = remove_outliers(df, method)
            else:
                raise Exception(f"Unknown preprocessing type: {step_type}")

            summaries.append(summary)

        summary_after = {
            "rows": df.shape[0],
            "columns": df.shape[1],
            "missing_values": int(df.isnull().sum().sum())
        }

        output_path = file_path.replace(".csv", "_preprocessed.csv")
        df.to_csv(output_path, index=False)

        result = {
            "file_path": output_path,
            "summary": {
                "before": summary_before,
                "after": summary_after
            },
            "steps": summaries
        }

        sys.stdout.write(json.dumps(result, ensure_ascii=False, default=convert_numpy))

    except Exception as e:
        import traceback
        error = {
            "status": "error",
            "message": str(e),
            "trace": traceback.format_exc()
        }
        sys.stdout.write(json.dumps(error, ensure_ascii=False))
        sys.exit(1)


if __name__ == "__main__":
    main()
