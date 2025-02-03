from rest_framework import serializers
from .models import FootballGame


class FootballGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballGame
        fields = "__all__"
