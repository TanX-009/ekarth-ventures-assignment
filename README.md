# Football Scores Application

## **Backend Setup (Django)**

1. Make sure that you are in in the `backend` folder

1. Create a **virtual environment** and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate   # For MacOS/Linux
   venv\Scripts\activate      # For Windows
   ```

1. Install dependencies

   ```bash
   pip install -r requirements.txt
   ```

1. Set up the database:

   - Run the migrations to create the database schema:
     ```bash
     python manage.py migrate
     ```

1. Create `.env` with follwing variables

   - Generate a secret

     1. Enter django shell

        ```bash
        django-admin shell
        ```

     2. In that shell

        ```python
        from django.core.management.utils import get_random_secret_key
        get_random_secret_key()
        ```

     3. Use the key as `SECRET_KEY`

   - Get API_KEY from [API-FOOTBALL](https://www.api-football.com/)

   - Set `.env`
     ```env
     API_KEY=<your-api-key-from-football-api>
     SECRET_KEY=<secret-key-for-django>
     DEBUG=True
     DEFAULT_DJANGO_ADMIN_USER_EMAIL=admin@email.com
     DEFAULT_DJANGO_ADMIN_USER_USERNAME=admin
     DEFAULT_DJANGO_ADMIN_USER_PASSWORD=admin
     DEFAULT_ADMIN_USER_EMAIL=user@email.com
     DEFAULT_ADMIN_USER_USERNAME=user
     DEFAULT_ADMIN_USER_PASSWORD=user
     ```

1. Create default users:

   ```bash
   python manage.py create_default_users
   ```

1. Fetch games from the api into database

   ```bash
   python manage.py fetch_games
   ```

1. Run the Django server:
   ```bash
   python manage.py runserver
   ```

## **Frontend Setup (Next.js)**

1. Make sure that you are in in the `frontend` folder

1. Install dependencies:

   ```bash
   npm install
   ```

1. Create `.env` with follwing variables

   ```env
   NEXT_PUBLIC_SERVER_API_URL=http://localhost:<backend port(default is 8000)>
   ```

1. Start the app:

   ```bash
   npm run dev
   ```

1. Open [http://localhost:3000](http://localhost:3000) in browser

1. Login using any user that were created in the backend
