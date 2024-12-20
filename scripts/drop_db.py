import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from app.core.config import settings

def drop_database():
    # Parse DATABASE_URL
    db_url = urlparse(str(settings.DATABASE_URL))
    db_name = db_url.path[1:]
    user = db_url.user
    password = db_url.password
    host = db_url.host
    port = db_url.port

    # Connect to PostgreSQL server
    conn = psycopg2.connect(
        user=user,
        password=password,
        host=host,
        port=port
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()

    try:
        # Terminate all connections to the database
        cursor.execute(f"""
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = '{db_name}'
            AND pid <> pg_backend_pid();
        """)
        
        # Drop database
        cursor.execute(f"DROP DATABASE IF EXISTS {db_name}")
        print(f"Database {db_name} dropped successfully!")

    except psycopg2.Error as e:
        print(f"Error: {e}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    drop_database()