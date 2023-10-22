# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables for Python
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE myproject.settings
ENV DEBUG=False
ENV DJANGO_SECRET="g8j0)^%t7!v4_yq1sk8$8r=rlbqbc0zi$=2mr&t9)v)5%i+xoh"
ENV DB_NAME="mentalize"
ENV DB_USER="postgres"
ENV DB_PASSWORD="99831745gusta"
ENV DB_HOST="localhost"
ENV DB_PORT="5432"

# Install Poetry
RUN pip install poetry

# Create and set the working directory in the container
WORKDIR /app

# Copy the poetry files and install dependencies
COPY pyproject.toml poetry.lock /app/
RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

# Copy the rest of the application code into the container at /app
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port 8000
EXPOSE 8000

# Start the Gunicorn web server for production
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
