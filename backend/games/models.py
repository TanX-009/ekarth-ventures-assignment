from django.db import models


class FootballGame(models.Model):
    fixture_id = models.IntegerField(unique=True)
    home_team = models.CharField(max_length=100)
    away_team = models.CharField(max_length=100)
    home_score = models.IntegerField(null=True, blank=True)
    away_score = models.IntegerField(null=True, blank=True)
    halftime_home_score = models.IntegerField(null=True, blank=True)
    halftime_away_score = models.IntegerField(null=True, blank=True)
    game_date = models.DateTimeField()
    venue_name = models.CharField(max_length=200, null=True, blank=True)
    venue_city = models.CharField(max_length=100, null=True, blank=True)
    league_name = models.CharField(max_length=100, null=True, blank=True)
    league_season = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} - {self.home_score}:{self.away_score}"
