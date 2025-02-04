# Football Scores Application

---

## **Backend Setup (Django)**

1. Make sure that you are in in the `backend` folder

1. Create a **virtual environment** and activate it:

   ```sh
   python -m venv venv
   source venv/bin/activate   # For MacOS/Linux
   venv\Scripts\activate      # For Windows
   ```

1. Set up the database:

   - Run the migrations to create the database schema:
     ```sh
     python manage.py migrate
     ```

1. Create `.env` with follwing variables

   ```env
   API_KEY=<your-api-key-from-football-api>
   SECRET_KEY=<secret-key-for-django>
   DEBUG=True
   DEFAULT_DJANGO_ADMIN_USER_EMAIL=admin@email.com
   DEFAULT_DJANGO_ADMIN_USER_USERNAME=admin
   DEFAULT_DJANGO_ADMIN_USER_PASSWORD=admin
   DEFAULT_ADMIN_USER_EMAIL=user@email.com
   DEFAULT_ADMIN_USER_USERNAME=username
   DEFAULT_ADMIN_USER_PASSWORD=user
   ```

1. Create default users:

   ```sh
   python manage.py create_default_users
   ```

1. Fetch games from the api into database

   ```sh
   python manage.py fetch_games
   ```

1. Run the Django server:
   ```sh
   python manage.py runserver
   ```

## **Frontend Setup (Next.js)**

1. Make sure that you are in in the `frontend` folder

1. Install dependencies:

   ```sh
   npm install
   ```

1. Create `.env` with follwing variables

   ```env
   NEXT_PUBLIC_SERVER_API_URL=http://localhost:<backend port(default is 8000)>
   ```

1. Start the app:

   ```sh
   npm run dev
   ```
