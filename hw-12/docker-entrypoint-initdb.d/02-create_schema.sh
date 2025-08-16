#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$APP_DB" <<-EOSQL
CREATE SCHEMA transfer AUTHORIZATION $APP_USER;
EOSQL
