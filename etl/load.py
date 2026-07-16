import pandas as pd
from sqlalchemy import create_engine, text
import os

DB_USER = os.environ.get("POSTGRES_USER", "admin")
DB_PASS = os.environ.get("POSTGRES_PASSWORD", "adminpassword")
DB_HOST = os.environ.get("POSTGRES_HOST", "localhost")
DB_PORT = os.environ.get("POSTGRES_PORT", "5433")
DB_NAME = os.environ.get("POSTGRES_DB", "enterprise_risk")

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

def load_to_bronze(df: pd.DataFrame, table_name: str = "loans_raw", schema: str = "bronze"):
    print(f"Connecting to database at {DB_HOST}:{DB_PORT}...")
    engine = create_engine(DATABASE_URL)
    
    with engine.begin() as conn:
        print(f"Ensuring schema '{schema}' exists...")
        conn.execute(text(f"CREATE SCHEMA IF NOT EXISTS {schema}"))
        
    print(f"Loading {len(df)} records into {schema}.{table_name}...")
    
    df.to_sql(
        name=table_name,
        con=engine,
        schema=schema,
        if_exists="replace",
        index=False
    )
    print("Load complete.")
