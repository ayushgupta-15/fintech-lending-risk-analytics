import pandas as pd
from pathlib import Path

def extract_data(file_path: str) -> pd.DataFrame:
    """Extracts raw CSV data into a pandas DataFrame."""
    print(f"Extracting data from {file_path}...")
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")
    
    df = pd.read_csv(file_path)
    print(f"Successfully extracted {len(df)} records.")
    return df
