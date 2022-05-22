#!/bin/bash

# or /usr/sbin/apache2 -D FOREGROUND
echo "Starting the container"

php artisan migrate

apachectl -D FOREGROUND

python3 public/monitorStudents.py