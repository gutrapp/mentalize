from rest_framework import serializers

from .models import Life, LoveLanguage, Mbti, SelfKnowledge, Result
from account.serializers import PersonSerializer


class LifeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Life
        fields = "__all__"


class MbtiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mbti
        fields = "__all__"


class SelfKnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SelfKnowledge
        fields = "__all__"


class LoveLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoveLanguage
        fields = "__all__"


class ResultSerializer(serializers.ModelSerializer):
    created_at = serializers.DateField(
        format="%d/%m/%Y", input_formats=["%d-%m-%Y", "iso-8601"], required=False
    )
    expires_at = serializers.DateField(
        format="%d/%m/%Y", input_formats=["%d-%m-%Y", "iso-8601"], required=False
    )
    mbti = MbtiSerializer(read_only=True, allow_null=True)
    life = LifeSerializer(read_only=True, allow_null=True)
    love_language = LoveLanguageSerializer(read_only=True, allow_null=True)
    self_knowledge = SelfKnowledgeSerializer(read_only=True, allow_null=True)

    class Meta:
        model = Result
        fields = "__all__"
