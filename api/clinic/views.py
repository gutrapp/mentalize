from django.db.models import Exists, Q, OuterRef, Value, Subquery
from rest_framework import viewsets, status
from django.http import QueryDict
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Clinic, Address, Cellphone
from .filters import ClinicFilter, AddressFilter, CellphoneFilter
from .serializers import ClinicSerializer, AddressSerializer, CellphoneSerializer
from tests.models import Result
from tests.serializers import (
    ResultSerializer,
    LoveLanguageSerializer,
    LifeSerializer,
    SelfKnowledgeSerializer,
    MbtiSerializer,
)
from tests.models import Mbti, LoveLanguage, Life, SelfKnowledge
from account.serializers import PersonSerializer, UserSerializer
from account.models import Person, User


class ClinicViews(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer
    filterset_class = ClinicFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]

    @action(detail=False, methods=["GET"], name="Get admin clinics")
    def admin_clinics(self, request, *args, **kwargs):
        try:
            user = request.user
            serializer = ClinicSerializer(user.admin.clinic.all(), many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=["GET"], name="Get clinics results")
    def clinic_results(self, request, pk, *args, **kwargs):
        try:
            data = []
            filters = {k: v for k, v in QueryDict.copy(request.GET).items()}
            limit = int(filters.pop("limit"))
            offset = int(filters.pop("offset"))
            results = (
                Clinic.objects.filter(id=pk)
                .first()
                .result_set.all()
                .filter(**{f"{k}__icontains": v for k, v in filters.items()})[
                    offset : offset + limit
                ]
            )
            for result in results:
                data.append(
                    {
                        **ResultSerializer(result).data,
                        "person": PersonSerializer(result.person).data,
                    }
                )
            return Response(data=data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(
        detail=True,
        methods=["GET"],
        name="Get clinics result",
        url_path="clinic_result/(?P<key_id>\d+)",
    )
    def clinic_result(self, request, pk, key_id, *args, **kwargs):
        try:
            result = (
                Clinic.objects.filter(id=pk)
                .first()
                .result_set.filter(id=key_id)
                .first()
            )
            return Response(
                data={
                    **ResultSerializer(result).data,
                    "person": PersonSerializer(result.person).data,
                },
                status=status.HTTP_200_OK,
            )
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(
        detail=True,
        methods=["GET"],
        name="Get clinics people",
        url_path="clinic_person/(?P<person_id>\d+)",
    )
    def clinic_person(self, request, pk, person_id, *args, **kwargs):
        try:
            results_exists = Result.objects.filter(
                person_id=OuterRef("id"), clinic_id=pk
            )
            person = Person.objects.filter(
                Q(id=person_id), Q(Exists(results_exists))
            ).first()

            if not person:
                return Response(status=status.HTTP_404_NOT_FOUND)

            mbtis, sks, lifes, lls, exclude = [], [], [], [], []
            keys = person.result_set.all()
            for key in keys:
                if key.test == Result.MBTI and key.testTaken == Result.USADO:
                    exclude.append(key)
                    mbtis.append(MbtiSerializer(key.mbti).data)
                if key.test == Result.SELF_KNOWLEDGE and key.testTaken == Result.USADO:
                    exclude.append(key)
                    sks.append(SelfKnowledge(key.selfknowledge).data)
                if key.test == Result.LIFE and key.testTaken == Result.USADO:
                    exclude.append(key)
                    lifes.append(Life(key.life).data)
                if key.test == Result.LOVE_LANGUAGE and key.testTaken == Result.USADO:
                    exclude.append(key)
                    lls.append(LoveLanguage(key.lovelanguage).data)
            keys = keys.filter(~Q(id__in=[k.id for k in exclude]))

            serializer = PersonSerializer(person)
            key_serializer = ResultSerializer(keys, many=True)
            return Response(
                data={
                    **serializer.data,
                    "keys": key_serializer.data,
                    "mbtis": mbtis,
                    "sks": sks,
                    "lifes": lifes,
                    "lls": lls,
                },
                status=status.HTTP_200_OK,
            )
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=["GET"], name="Get clinics people")
    def clinic_people(self, request, pk, *args, **kwargs):
        try:
            filters = {k: v for k, v in QueryDict.copy(request.GET).items()}
            limit = int(filters.pop("limit"))
            offset = int(filters.pop("offset"))

            cellphone_filters, person_filters = {}, {}

            if filters.get("telefone") != None:
                cellphone_filters.update(
                    {"telefone__icontains": filters.get("telefone")}
                )
            if filters.get("full_name") != None:
                person_filters.update(
                    {"user__full_name__icontains": filters.get("full_name")}
                )
            if filters.get("email") != None:
                person_filters.update({"user__email__icontains": filters.get("email")})
            if filters.get("cpf") != None:
                person_filters.update({"cpf__icontains": filters.get("cpf")})
            if filters.get("age") != None:
                person_filters.update({"age": filters.get("age")})
            if filters.get("sex") != None:
                person_filters.update({"sex__icontains": filters.get("sex")})

            results_exists = Result.objects.filter(
                person_id=OuterRef("id"), clinic_id=pk
            )
            cellphone_exists = Cellphone.objects.filter(
                Q(id=OuterRef("cellphone_id")) & Q(**cellphone_filters)
            )

            people = Person.objects.filter(
                Q(Exists(results_exists))
                & Q(Exists(cellphone_exists))
                & Q(**person_filters)
            )[offset : offset + limit]

            serializer = PersonSerializer(
                people,
                many=True,
            )
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(
        detail=True,
        methods=["GET"],
        name="Get clinics mbtis",
        url_path="clinic_tests/(?P<test>\w+)",
    )
    def clinic_tests(self, request, pk, test, *args, **kwargs):
        try:
            filters = {k: v for k, v in QueryDict.copy(request.GET).items()}
            limit = int(filters.pop("limit"))
            offset = int(filters.pop("offset"))
            data = []

            user_filters, results_filter = {}, {}
            if filters.get("full_name") != None:
                user_filters.update(
                    {"user__full_name__icontains": filters.get("full_name")}
                )
            if filters.get("email") != None:
                user_filters.update({"user__email__icontains": filters.get("email")})
            if filters.get("key") != None:
                results_filter.update({"key__icontains": filters.get("key")})

            match test:
                case Result.MBTI:
                    mbti_filters = {}
                    if filters.get("first") != None:
                        mbti_filters.update({"first": filters.get("first")})
                    if filters.get("second") != None:
                        mbti_filters.update({"second": filters.get("second")})
                    if filters.get("firstScore") != None:
                        mbti_filters.update({"firstScore": filters.get("firstScore")})
                    if filters.get("secondScore") != None:
                        mbti_filters.update({"secondScore": filters.get("secondScore")})

                    person_subquery = Person.objects.filter(
                        Q(id=OuterRef("person_id")), Q(**user_filters)
                    ).values("id")

                    results_subquery = Result.objects.filter(
                        Q(clinic_id=pk),
                        Q(id=OuterRef("result_id")),
                        Q(Exists(person_subquery)),
                        Q(
                            **results_filter,
                        ),
                    ).values("id")

                    mbtis = Mbti.objects.filter(
                        Q(clinic_id=pk),
                        Q(Exists(results_subquery)),
                        **mbti_filters,
                    )[offset : offset + limit]

                    for mbti in mbtis:
                        data.append(
                            {
                                **MbtiSerializer(mbti).data,
                                "result": ResultSerializer(mbti.result).data,
                                "user": UserSerializer(mbti.result.person.user).data,
                            }
                        )
                case Result.SELF_KNOWLEDGE:
                    sks_filters = {}
                    if filters.get("first") != None:
                        sks_filters.update({"first": filters.get("first")})
                    if filters.get("second") != None:
                        sks_filters.update({"second": filters.get("second")})
                    if filters.get("firstScore") != None:
                        sks_filters.update({"firstScore": filters.get("firstScore")})
                    if filters.get("secondScore") != None:
                        sks_filters.update({"secondScore": filters.get("secondScore")})

                    person_subquery = Person.objects.filter(
                        Q(id=OuterRef("person_id")), Q(**user_filters)
                    ).values("id")

                    results_subquery = Result.objects.filter(
                        Q(clinic_id=pk),
                        Q(id=OuterRef("result_id")),
                        Q(Exists(person_subquery)),
                        Q(
                            **results_filter,
                        ),
                    ).values("id")

                    sks = SelfKnowledge.objects.filter(
                        Q(clinic_id=pk),
                        Q(Exists(results_subquery)),
                        **sks_filters,
                    )[offset : offset + limit]

                    for sk in sks:
                        data.append(
                            {
                                **SelfKnowledgeSerializer(sk).data,
                                "result": ResultSerializer(sk.result).data,
                                "user": UserSerializer(sk.result.person.user).data,
                            }
                        )
                case Result.LIFE:
                    life_filters = {}
                    if filters.get("average") != None:
                        life_filters.update({"average": filters.get("average")})
                    if filters.get("total") != None:
                        life_filters.update({"total": filters.get("total")})

                    person_subquery = Person.objects.filter(
                        Q(id=OuterRef("person_id")), Q(**user_filters)
                    ).values("id")

                    results_subquery = Result.objects.filter(
                        Q(clinic_id=pk),
                        Q(id=OuterRef("result_id")),
                        Q(Exists(person_subquery)),
                        Q(
                            **results_filter,
                        ),
                    ).values("id")

                    lifes = Mbti.objects.filter(
                        Q(clinic_id=pk),
                        Q(Exists(results_subquery)),
                        **life_filters,
                    )[offset : offset + limit]

                    for life in lifes:
                        data.append(
                            {
                                **LifeSerializer(life).data,
                                "result": ResultSerializer(life.result).data,
                                "user": UserSerializer(life.result.person.user).data,
                            }
                        )
                case Result.LOVE_LANGUAGE:
                    lls_filters = {}
                    if filters.get("first") != None:
                        lls_filters.update({"first": filters.get("first")})
                    if filters.get("second") != None:
                        lls_filters.update({"second": filters.get("second")})
                    if filters.get("firstScore") != None:
                        lls_filters.update({"firstScore": filters.get("firstScore")})
                    if filters.get("secondScore") != None:
                        lls_filters.update({"secondScore": filters.get("secondScore")})

                    person_subquery = Person.objects.filter(
                        Q(id=OuterRef("person_id")), Q(**user_filters)
                    ).values("id")

                    results_subquery = Result.objects.filter(
                        Q(clinic_id=pk),
                        Q(id=OuterRef("result_id")),
                        Q(Exists(person_subquery)),
                        Q(
                            **results_filter,
                        ),
                    ).values("id")

                    lls = Mbti.objects.filter(
                        Q(clinic_id=pk),
                        Q(Exists(results_subquery)),
                        **lls_filters,
                    )[offset : offset + limit]

                    for ll in lls:
                        data.append(
                            {
                                **LoveLanguage(ll).data,
                                "result": ResultSerializer(ll.result).data,
                                "user": UserSerializer(ll.result.person.user).data,
                            }
                        )
            return Response(
                data=data,
                status=status.HTTP_200_OK,
            )
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(
        detail=True,
        methods=["GET"],
        name="Get clinics people",
        url_path="clinic_test/(?P<test_id>\d+)/(?P<test>\w+)",
    )
    def clinic_test(self, request, pk, test_id, test, *args, **kwargs):
        try:
            if test == Result.MBTI:
                test = Mbti.objects.filter(Q(clinic_id=pk), Q(id=test_id)).first()
                if test:
                    result = test.result
                    result.seen = Result.VISTO
                    result.save()
                    serializer = MbtiSerializer(test)
            if test == Result.SELF_KNOWLEDGE:
                test = SelfKnowledge.objects.filter(
                    Q(clinic_id=pk), Q(id=test_id)
                ).first()
                if test:
                    result = test.result
                    result.seen = Result.VISTO
                    result.save()
                    serializer = SelfKnowledgeSerializer(test)
            if test == Result.LIFE:
                test = Life.objects.filter(Q(clinic_id=pk), Q(id=test_id)).first()
                if test:
                    result = test.result
                    result.seen = Result.VISTO
                    result.save()
                    serializer = LifeSerializer(test)
            if test == Result.LOVE_LANGUAGE:
                test = LoveLanguage.objects.filter(
                    Q(clinic_id=pk), Q(id=test_id)
                ).first()
                if test:
                    result = test.result
                    result.seen = Result.VISTO
                    result.save()
                    serializer = LoveLanguageSerializer(test)
            return Response(
                data={
                    **serializer.data,
                    "result": ResultSerializer(test.result).data,
                    "person": PersonSerializer(test.result.person).data,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddressViews(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    filterset_class = AddressFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]


class CellphoneViews(viewsets.ModelViewSet):
    queryset = Cellphone.objects.all()
    serializer_class = CellphoneSerializer
    filterset_class = CellphoneFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"
    ordering = ["id"]
