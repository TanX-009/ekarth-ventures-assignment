from django.urls import path
from .views import FootballGameListView, UpdateGameScoreView

urlpatterns = [
    path(
        "api/football-games/", FootballGameListView.as_view(), name="get_football_games"
    ),
    path("api/update-score/", UpdateGameScoreView.as_view(), name="update_game_score"),
]
