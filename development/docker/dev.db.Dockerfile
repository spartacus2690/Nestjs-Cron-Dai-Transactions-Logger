FROM postgres:12

ENV POSTGRES_USER 'user'
ENV POSTGRES_PASSWORD 'password'
ENV POSTGRES_DB 'db'

COPY ./development/scripts/load-extensions.sql /docker-entrypoint-initdb.d
