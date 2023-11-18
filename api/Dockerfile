FROM python:3.11-slim

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE config.settings
ENV DEBUG=False
ENV DJANGO_SECRET="g8j0)^%t7!v4_yq1sk8$8r=rlbqbc0zi$=2mr&t9)v)5%i+xoh"
ENV DB_NAME="mentalize"
ENV DB_USER="postgres"
ENV DB_PASSWORD="99831745gusta"
ENV DB_HOST="85.31.230.250"
ENV DB_PORT="5432"

RUN pip install poetry

WORKDIR /app

COPY pyproject.toml poetry.lock /app/
RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi

COPY . /app/

RUN python manage.py makemigrations
RUN python manage.py migrate account
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]