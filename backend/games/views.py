from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FootballGame
from .serializers import FootballGameSerializer
from rest_framework.permissions import IsAuthenticated


class FootballGameListView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, _):
        games = FootballGame.objects.all()
        serializer = FootballGameSerializer(games, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateGameScoreView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            fixture_id = request.data.get("fixture_id")
            home_score = request.data.get("home_score")
            away_score = request.data.get("away_score")

            if not fixture_id or (home_score is None and away_score is None):
                return Response(
                    {"error": "Missing required fields"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            game = FootballGame.objects.get(fixture_id=fixture_id)

            if home_score is not None:
                game.home_score = home_score
            if away_score is not None:
                game.away_score = away_score

            game.save()

            return Response(
                {"message": "Score updated successfully"}, status=status.HTTP_200_OK
            )

        except FootballGame.DoesNotExist:
            return Response(
                {"error": "Game not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
