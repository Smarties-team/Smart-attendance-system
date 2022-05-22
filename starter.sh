#!/bin/bash

# or /usr/sbin/apache2 -D FOREGROUND
echo "Starting the container"

# Wait until the database is up and running
until nc -z -v -w30 $DB_HOST 3306
do
  echo "Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done

# Database migrations
php artisan migrate

# Start apache server (as a background process)
apachectl -D FOREGROUND &

# Run face recognition python script
cd public
python3 monitorStudents.py
