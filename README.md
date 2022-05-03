- [Smart attendance system](#smart-attendance-system)
- [Installation](#installation)
  - [Python](#python)
  - [Laravel](#laravel)
  - [Web camera setup](#web-camera-setup)
- [Start the application](#start-the-application)


## Smart attendance system
Log people's attendance via web camera.

- Use captures taken from a web camera to detect and recognize present people by comparing their faces to a known database.
- A web user interface is implemented using Laravel to show attendance info and add new people to the database.

## Installation

### Python
  - First install conda the latest version
  - Create a virtual environment with python version 3.6 and name it `env36` strictly (newer versions make conflicts)
    ``` 
      conda create --name env36 python=3.6
      conda activate env36
    ```
  - Install the following packages
    - face_recognition `conda install -c conda-forge face_recognition`
    - opencv  `conda install -c conda-forge opencv`
    - dlib `conda install -c conda-forge dlib`
    - imutils `conda install -c conda-forge imutils`
    - mysql-connector `conda install -c anaconda mysql-connector-python`
    - requests `conda install -c anaconda requests`
    - ipykernel `conda install -c anaconda ipykernel`
    
  You should be able to run python code in this configuration

### Laravel
- This is straight forward, clone the repo
- cd into the project folder
- Install Composer Dependencies `$ composer install`
- Install NPM Dependencies `$ npm install`
- Create a copy of your .env file `$ cp .env.example .env`
- Generate an app encryption key `$ php artisan key:generate`
- Create an empty database
- In the .env file, add database information to allow Laravel to connect to the database
  - fill in the DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, and DB_PASSWORD 
- Migrate the database `$ php artisan migrate`


### Web camera setup
- Install on your andriod mobile IP webcam application from google play store
- Open the application and start the server
- Open monitorStudent.py file and change `webcams` global variable with your mobile (Web camera) IP


## Start the application
- Run python code, monitorStudents.py (In the created env36 environment)
- Start the server `$ php artisan serve`
