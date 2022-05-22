#!/bin/bash

# or /usr/sbin/apache2 -D FOREGROUND
echo "Starting the container"

php artisan migrate

# Start apache server (as a background process)
apachectl -D FOREGROUND &

# Run face recognition python script
cd public
python3 monitorStudents.py
