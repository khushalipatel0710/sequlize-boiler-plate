#!/bin/bash

DB_URL=`node database/getDBConnectionString.js`

node_modules/.bin/migrate up -d $DB_URL --autosync
