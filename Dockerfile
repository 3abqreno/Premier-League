# Stage 1: Build React App
FROM node:18 AS frontend-build
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Stage 2: Python Base with Nginx & FastAPI
FROM python:3.10

# Install system dependencies (including Nginx)
RUN apt update && apt install -y nginx

# Copy built React app from first stage to Nginx directory
COPY --from=frontend-build /frontend/build /usr/share/nginx/html


# Set working directory for FastAPI backend
WORKDIR /backend

# Copy backend files and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend ./



# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/sites-available/default

# Expose ports
EXPOSE 80 8000

# Create a non-root user and group
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Change ownership of the backend directory
RUN chown -R appuser:appuser /backend

# USER appuser

# Start FastAPI backend and Nginx
CMD ["sh", "-c", "python main.py & nginx -g 'daemon off;'"]
