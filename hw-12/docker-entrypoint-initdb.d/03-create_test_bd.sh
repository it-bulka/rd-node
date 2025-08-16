#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE "test_e2e";
    GRANT ALL PRIVILEGES ON DATABASE "test_e2e" TO $APP_USER;
    \c test_e2e
        GRANT ALL PRIVILEGES ON SCHEMA public TO $APP_USER;
        CREATE SCHEMA transfer AUTHORIZATION $APP_USER;
EOSQL
