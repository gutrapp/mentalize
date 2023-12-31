from django.db import models


class Address(models.Model):
    SANTA_CATARINA = "SC"
    RIO_GRANDE_DO_SUL = "RS"
    PARANA = "PR"
    SAO_PAULO = "SP"
    RIO_DE_JANEIRO = "RJ"
    DISTRITO_FEDERAL = "DF"
    MATO_GROSSO = "MT"
    MATO_GROSSO_DO_SUL = "MS"
    GOIAS = "GO"
    ACRE = "AC"
    ALAGOAS = "AL"
    AMAPA = "AP"
    AMAZONAS = "AM"
    BAHIA = "BA"
    CEARA = "CE"
    ESPIRITO_SANTO = "ES"
    MINAS_GERAIS = "MG"
    MARANHAO = "MA"
    PARA = "PA"
    PARAIBA = "PB"
    PERNAMBUCO = "PE"
    PIAUI = "PI"
    RIO_GRANDE_DO_NORTE = "RN"
    RONDONIO = "RO"
    RORAIMA = "RR"
    SERGIPE = "SE"
    TOCANTINS = "TO"
    STATE_CHOICES = [
        (SANTA_CATARINA, "Santa Catarina"),
        (RIO_GRANDE_DO_SUL, "Rio Grande do Sul"),
        (PARANA, "Paraná"),
        (SAO_PAULO, "São Paulo"),
        (RIO_DE_JANEIRO, "Rio de Janeiro"),
        (DISTRITO_FEDERAL, "Distrito Federal"),
        (MATO_GROSSO, "Mato Grosso"),
        (MATO_GROSSO_DO_SUL, "Mato Grosso do Sul"),
        (GOIAS, "Goiás"),
        (ACRE, "Acre"),
        (ALAGOAS, "Alagoas"),
        (AMAPA, "Amapá"),
        (AMAZONAS, "Amazonas"),
        (BAHIA, "Bahia"),
        (CEARA, "Ceará"),
        (ESPIRITO_SANTO, "Espirito Santo"),
        (MINAS_GERAIS, "Minas Gerais"),
        (MARANHAO, "Maranhão"),
        (PARA, "Pará"),
        (PARAIBA, "Paraíba"),
        (PERNAMBUCO, "Pernambuco"),
        (PIAUI, "Piauí"),
        (RIO_GRANDE_DO_NORTE, "Rio Grande do Norte"),
        (RONDONIO, "Rôndonia"),
        (RORAIMA, "Roraima"),
        (SERGIPE, "Sergipe"),
        (TOCANTINS, "Tocantins"),
    ]

    cep = models.CharField(max_length=8)
    number = models.CharField(max_length=10)
    street = models.CharField(max_length=50)
    neighboorhood = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=2, choices=STATE_CHOICES)


class Cellphone(models.Model):
    FIXED = "FX"
    MOBILE = "MO"
    TYPE_CHOICES = [
        (FIXED, "Fixo"),
        (MOBILE, "Celular"),
    ]

    ddd = models.CharField(max_length=2)
    telefone = models.CharField(max_length=9)
    type = models.CharField(max_length=2, choices=TYPE_CHOICES)


class Clinic(models.Model):
    name = models.CharField(max_length=50)
    address = models.OneToOneField(Address, on_delete=models.SET_NULL, null=True)
    cellphone = models.OneToOneField(Cellphone, on_delete=models.SET_NULL, null=True)
