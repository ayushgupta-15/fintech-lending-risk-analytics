import os
import sys
from pathlib import Path

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent))

from etl.extract import extract_data
from etl.load import load_to_bronze

def main():
    print("--- Starting ETL Pipeline ---")
    data_path = "data/raw/loans_full_schema.csv"
    
    try:
        # 1. Extract
        df = extract_data(data_path)
        
        # Note: We don't clean or transform data here. 
        # Python only extracts and loads the raw data. 
        # dbt will handle transformations in the Silver/Gold layers.
        
        # 2. Load
        load_to_bronze(df, table_name="loans_raw", schema="bronze")
        
        print("--- ETL Pipeline completed successfully ---")
    except Exception as e:
        print(f"ETL Pipeline failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
