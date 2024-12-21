import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from app.core.config import settings
import os
from urllib.parse import urlparse

def create_database():
    # Parse DATABASE_URL
    db_url = urlparse(str(settings.DATABASE_URL))
    db_name = db_url.path[1:]  # Remove leading '/'
    user = db_url.username
    password = db_url.password
    host = db_url.hostname
    port = db_url.port or 5432  # Default to 5432 if no port specified

    # Connect to PostgreSQL server (to postgres database initially)
    conn = psycopg2.connect(
        dbname="postgres",  # Connect to default postgres database first
        user=user,
        password=password,
        host=host,
        port=port
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()

    try:
        # Check if database exists
        cursor.execute(f"SELECT 1 FROM pg_database WHERE datname = '{db_name}'")
        exists = cursor.fetchone()
        
        if not exists:
            # Create database
            cursor.execute(f"CREATE DATABASE {db_name}")
            print(f"Database {db_name} created successfully!")
        else:
            print(f"Database {db_name} already exists!")

        # Close connection to PostgreSQL server
        cursor.close()
        conn.close()

        # Connect to the newly created database
        conn = psycopg2.connect(
            dbname=db_name,
            user=user,
            password=password,
            host=host,
            port=port
        )
        cursor = conn.cursor()

        # Execute SQL scripts
        script_dir = os.path.join(os.path.dirname(__file__), 'sql')
        
        # Create tables
        with open(os.path.join(script_dir, 'create_tables.sql'), 'r') as f:
            cursor.execute(f.read())
        
        # Insert initial data
        with open(os.path.join(script_dir, 'initial_data.sql'), 'r') as f:
            cursor.execute(f.read())

        conn.commit()
        print("Database tables and initial data created successfully!")

    except psycopg2.Error as e:
        print(f"Error: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    create_database()