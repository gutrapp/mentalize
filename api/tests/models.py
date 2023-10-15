import datetime

from django.db import models

from account.models import Person
from clinic.models import Clinic


class Result(models.Model):
    MBTI = "MB"
    SELF_KNOWLEDGE = "SK"
    LOVE_LANGUAGE = "LO"
    LIFE = "LI"
    TESTS = [
        (MBTI, "MBTI"),
        (SELF_KNOWLEDGE, "Auto Conhecimento"),
        (LOVE_LANGUAGE, "Linguagem Amorosa"),
        (LIFE, "Vida"),
    ]

    EXPIRED = "EX"
    VALID = "VA"
    SITUACAO_EXPIRACAO = [(EXPIRED, "Expirado"), (VALID, "Válido")]

    USADO = "US"
    NAO_USADO = "NU"
    SITUACAO_TESTE = [(USADO, "Usado"), (NAO_USADO, "Não usado")]

    VISTO = "VI"
    NAO_VISTO = "NV"
    SITUACAO_REVIEW = [(VISTO, "Visto"), (NAO_VISTO, "Não visto")]

    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    expired = models.CharField(max_length=2, choices=SITUACAO_EXPIRACAO, default=VALID)
    testTaken = models.CharField(
        max_length=2, choices=SITUACAO_TESTE, default=NAO_USADO
    )
    test = models.CharField(choices=TESTS, max_length=2)
    key = models.CharField(max_length=50, unique=True)
    seen = models.CharField(max_length=2, choices=SITUACAO_REVIEW, default=NAO_VISTO)
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True, null=True, blank=True)
    expires_at = models.DateField(
        default=datetime.date.today() + datetime.timedelta(days=30),
        null=True,
        blank=True,
    )


class Life(models.Model):
    average = models.DecimalField(max_digits=5, decimal_places=2)
    total = models.IntegerField()
    result = models.OneToOneField(Result, on_delete=models.CASCADE)
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)


class SelfKnowledge(models.Model):
    VISUAL = "VI"
    KINESTHETIC = "KI"
    AUDITORY = "AU"
    DIGITAL = "DI"
    TRAITS = [
        (VISUAL, "Visual"),
        (KINESTHETIC, "Cinestésico"),
        (AUDITORY, "Auditório"),
        (DIGITAL, "Digital"),
    ]

    first = models.CharField(choices=TRAITS, max_length=2)
    second = models.CharField(choices=TRAITS, max_length=2)
    third = models.CharField(choices=TRAITS, max_length=2)
    fourth = models.CharField(choices=TRAITS, max_length=2)
    firstScore = models.DecimalField(max_digits=5, decimal_places=2)
    secondScore = models.DecimalField(max_digits=5, decimal_places=2)
    thirdScore = models.DecimalField(max_digits=5, decimal_places=2)
    fourthScore = models.DecimalField(max_digits=5, decimal_places=2)
    result = models.OneToOneField(Result, on_delete=models.CASCADE)
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)


class LoveLanguage(models.Model):
    AFIRMATION = "AF"
    SERVICE = "SE"
    PRESENTS = "PE"
    TIME = "TI"
    TOUCH = "TO"
    PREFERENCES = [
        (AFIRMATION, "Afirmação"),
        (SERVICE, "Serviço"),
        (PRESENTS, "Presentes"),
        (TIME, "Tempo"),
        (TOUCH, "Toque"),
    ]

    first = models.CharField(choices=PREFERENCES, max_length=2)
    second = models.CharField(choices=PREFERENCES, max_length=2)
    third = models.CharField(choices=PREFERENCES, max_length=2)
    fourth = models.CharField(choices=PREFERENCES, max_length=2)
    fifth = models.CharField(choices=PREFERENCES, max_length=2)
    firstScore = models.DecimalField(max_digits=5, decimal_places=2)
    secondScore = models.DecimalField(max_digits=5, decimal_places=2)
    thirdScore = models.DecimalField(max_digits=5, decimal_places=2)
    fourthScore = models.DecimalField(max_digits=5, decimal_places=2)
    fifthScore = models.DecimalField(max_digits=5, decimal_places=2)
    result = models.OneToOneField(Result, on_delete=models.CASCADE)
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)


class Mbti(models.Model):
    AIR = "AR"
    EARTH = "EA"
    FIRE = "FI"
    WATER = "WA"
    PERSONALITIES = [(AIR, "Ar"), (EARTH, "Terra"), (FIRE, "Fogo"), (WATER, "Água")]

    first = models.CharField(choices=PERSONALITIES, max_length=2)
    second = models.CharField(choices=PERSONALITIES, max_length=2)
    third = models.CharField(choices=PERSONALITIES, max_length=2)
    fourth = models.CharField(choices=PERSONALITIES, max_length=2)
    firstScore = models.DecimalField(max_digits=5, decimal_places=2)
    secondScore = models.DecimalField(max_digits=5, decimal_places=2)
    thirdScore = models.DecimalField(max_digits=5, decimal_places=2)
    fourthScore = models.DecimalField(max_digits=5, decimal_places=2)
    result = models.OneToOneField(Result, on_delete=models.CASCADE)
    clinic = models.ForeignKey(Clinic, on_delete=models.CASCADE)
