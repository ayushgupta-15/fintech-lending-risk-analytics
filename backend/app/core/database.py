import psycopg
from psycopg.rows import dict_row
from contextlib import contextmanager
from app.core.config import settings

@contextmanager
def get_db_connection():
    """Context manager for raw psycopg database connections."""
    conn = psycopg.connect(settings.DATABASE_URL, row_factory=dict_row)
    try:
        yield conn
    finally:
        conn.close()
