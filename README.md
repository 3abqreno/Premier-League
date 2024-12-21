# premier league
A FastAPI-based backend and react frontend system for managing football match bookings.


## Backend Setup
### 1. Create Virtual Environment
Create virtual environment
python -m venv venv

### Activate virtual environment
On Windows:
```
venv\Scripts\activate
```
On Unix or MacOS:
```
source venv/bin/activate
````
### 2. Install Dependencies
```python
pip install -r requirements.txt
```

### 3. Environment Configuration
Create a .env file in the root directory with the following content:
```
DATABASE_URL=postgresql://username:password@localhost:5432/football_booking
SECRET_KEY=your-secret-key-for-jwt
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```
Replace username, password with your PostgreSQL credentials.

### 4. Database Setup
Create and initialize database
```python
python -m scripts.create_db
```

If you need to reset the database
```python
python -m scripts.drop_db
python -m scripts.create_db
```
### 5. Run the Application
Development server with auto-reload
```
uvicorn app.main:app --reload
```
The API will be available at http://localhost:8000

### API Documentation
Swagger UI: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc
Default Admin User
Username: admin
Password: admin123
Email: admin@example.com


## Frontend Setup

Navigate to the `frontend` directory:
```
cd frontend
```

### 1. Install Dependencies
Install the necessary packages:
```
npm install
```

### 2. Run the Application
Start the development server:
```
npm start
```

The frontend application will be available at http://localhost:3000