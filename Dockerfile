# Dockerfile
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy app files
COPY server ./server
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5000

# Run the app
CMD ["python","-m", "server.run"]
