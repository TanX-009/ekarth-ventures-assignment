from django.conf import Settings
import requests
from django.core.management.base import BaseCommand
from games.models import FootballGame
from datetime import datetime

API_URL = "https://v3.football.api-sports.io/fixtures"


class Command(BaseCommand):
    help = "Fetch football games from API-Football and store them in the database"

    def handle(self, *args, **kwargs):
        headers = {"x-apisports-key": Settings.API_KEY}

        # Fetch games for today
        start_date = datetime.now().strftime("%Y-%m-%d")

        params = {
            "date": start_date,
            "timezone": "Asia/Kolkata",
        }

        response = requests.get(API_URL, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json().get("response", [])
            for match in data:
                fixture = match.get("fixture", {})
                league = match.get("league", {})
                teams = match.get("teams", {})
                goals = match.get("goals", {})
                score = match.get("score", {}).get("halftime", {})

                if not fixture or not teams:
                    continue

                fixture_id = fixture["id"]
                game_date = datetime.fromisoformat(fixture["date"])
                home_team = teams["home"]["name"]
                away_team = teams["away"]["name"]
                home_score = goals.get("home", 0)
                away_score = goals.get("away", 0)
                halftime_home_score = score.get("home", 0)
                halftime_away_score = score.get("away", 0)
                venue_name = fixture.get("venue", {}).get("name", "")
                venue_city = fixture.get("venue", {}).get("city", "")
                league_name = league.get("name", "")
                league_season = league.get("season", "")
                status = fixture.get("status", {}).get("long", "")

                # Create or update the game in the database
                _, created = FootballGame.objects.update_or_create(
                    fixture_id=fixture_id,
                    defaults={
                        "home_team": home_team,
                        "away_team": away_team,
                        "home_score": home_score,
                        "away_score": away_score,
                        "halftime_home_score": halftime_home_score,
                        "halftime_away_score": halftime_away_score,
                        "game_date": game_date,
                        "venue_name": venue_name,
                        "venue_city": venue_city,
                        "league_name": league_name,
                        "league_season": league_season,
                        "status": status,
                    },
                )

                if created:
                    self.stdout.write(
                        self.style.SUCCESS(f"Added: {home_team} vs {away_team}")
                    )
                else:
                    self.stdout.write(
                        self.style.SUCCESS(f"Updated: {home_team} vs {away_team}")
                    )
        else:
            self.stderr.write(
                f"Error fetching data: {response.status_code} - {response.text}"
            )
