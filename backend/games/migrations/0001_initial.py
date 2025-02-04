# Generated by Django 5.1.5 on 2025-02-03 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="FootballGame",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("fixture_id", models.IntegerField(unique=True)),
                ("home_team", models.CharField(max_length=100)),
                ("away_team", models.CharField(max_length=100)),
                ("home_score", models.IntegerField(default=0)),
                ("away_score", models.IntegerField(default=0)),
                ("halftime_home_score", models.IntegerField(default=0)),
                ("halftime_away_score", models.IntegerField(default=0)),
                ("game_date", models.DateTimeField()),
                ("venue_name", models.CharField(blank=True, max_length=200, null=True)),
                ("venue_city", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "league_name",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                ("league_season", models.IntegerField(blank=True, null=True)),
                ("status", models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
    ]
