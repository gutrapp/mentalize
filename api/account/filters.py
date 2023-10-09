from django_filters import rest_framework as filters

from .models import Person, User


class PersonFilter(filters.FilterSet):
    cpf = filters.CharFilter(lookup_expr="icontains")
    age = filters.NumberFilter()
    sex = filters.ChoiceFilter(choices=Person.SEX_CHOICES)

    class Meta:
        model = Person
        fields = ["cpf", "age", "sex"]


class UserFilter(filters.FilterSet):
    first_name = filters.CharFilter(lookup_expr="icontains")
    last_name = filters.CharFilter(lookup_expr="icontains")
    email = filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email"]
