
# Start from composer base image, use it to install composer dependencies
FROM composer as build
COPY composer.json composer.lock /app/
RUN composer install --prefer-dist --no-dev --optimize-autoloader --no-interaction --no-scripts
# --no-dev and --optimize-autoloader are well suited for a production build, 
# --no-scripts Skips execution of scripts defined in composer.json

FROM php:7.4-apache as prod

# Author field of the generated images. 
MAINTAINER Diaa Eldeen  <dx.dx@dx.dx>

# Python
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y --fix-missing \
    build-essential \
    cmake \
    gfortran \
    git \
    wget \
    curl \
    graphicsmagick \
    libgraphicsmagick1-dev \
    libatlas-base-dev \
    libavcodec-dev \
    libavformat-dev \
    libgtk2.0-dev \
    libjpeg-dev \
    liblapack-dev \
    libswscale-dev \
    pkg-config \
    python3-dev \
    python3-numpy \
    python3-opencv \
    python3-tk \
    python3-setuptools \
    python3-pip \
    software-properties-common \
    zip \
    && apt-get clean && rm -rf /tmp/* /var/tmp/*


RUN mkdir -p dlib && \
    git clone -b 'v19.9' --single-branch https://github.com/davisking/dlib.git dlib/ && \
    cd  dlib/ && \
    python3 setup.py install --yes USE_AVX_INSTRUCTIONS

COPY requirements.txt /var/www/html
RUN cd /var/www/html && \
    pip3 install -r requirements.txt


# Install php mysqli, pdo, pdo_mysql extensions 
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Copy the project to apache document root
COPY --from=build /app /var/www/html
COPY . /var/www/html
COPY .env.example /var/www/html/.env
# COPY . /var/www/html
# COPY .env.example /var/www/html/.env


# Set the apache server user as the owner of the files and folders 
RUN chown www-data /var/www/html -R

# Configure apache directory and document root
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
ENV APACHE_DIRECTORY /var/www/html/
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DIRECTORY}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Required for web routes to work
RUN a2enmod rewrite


# Change Laravel environment variables for Database
ENV DB_HOST 192.168.1.5
ENV DB_USERNAME diaa
ENV DB_PASSWORD password
ENV DB_DATABASE laravel
# RUN sed -ri -e 's!DB_HOST=127.0.0.1!DB_HOST=192.168.1.5!g' .env
# RUN sed -ri -e 's!DB_USERNAME=root!DB_USERNAME=diaa!g' .env
# RUN sed -ri -e 's!DB_PASSWORD=!DB_PASSWORD=password!g' .env

# Change Laravel ennvironment variables to production
# ENV APP_ENV=production
# ENV APP_DEBUG=false

# RUN sed -ri -e 's!AllowOverride None!AllowOverride All!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN php artisan key:generate
RUN php artisan storage:link

VOLUME /var/www/html/storage

COPY starter.sh /var/www/html
RUN chmod +x starter.sh

CMD ["./starter.sh"]