from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import views

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status

from core.models import Customer,Items,C_Invoice,P_Invoice
from invoice import serializers
from rest_framework import filters

# Create your views here.

class CustomerViewset(viewsets.ModelViewSet):
    """create a new customer and see all customers"""
    queryset = Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

    """search json data on api"""
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name",)



class ItemViewset(viewsets.ModelViewSet):
    """create a new item and see all items"""
    queryset = Items.objects.all()
    serializer_class = serializers.ItemsSerializer

    filter_backends = (filters.SearchFilter,)
    search_fields = ("item",)

class C_InvoiceViewset(viewsets.ModelViewSet):
    """created a view for nested serializer-child data"""

    queryset = C_Invoice.objects.all()
    serializer_class = serializers.C_InvoiceSerializer

    filter_backends = (filters.SearchFilter,)
    search_fields = ("item","key")
class P_InvoiceViewset(viewsets.ModelViewSet):
    """created a view for nested serializer - parent data"""

    queryset = P_Invoice.objects.all()
    serializer_class = serializers.P_InvoiceSerializer

    filter_backends = (filters.SearchFilter,)
    search_fields = ("name",)


class Chart(generics.ListAPIView):
    """get all total amount wrt its name"""

    # queryset =  P_Invoice.objects.all()
    serializer_class = serializers.ChartSerializer

    queryset =  P_Invoice.objects.all()

    dict = {}
    for d in queryset.values():
        q,w,e,r,t = d.values()
        dict[e] = dict.get(e,0) + t
    user = [{'name':n,'total_amount':t} for n,t in dict.items()]
    datas= user
    queryset = serializers.ChartSerializer(datas, many=True).data

    filter_backends = (filters.SearchFilter,)
    search_fields = ("name",)
    # def get_queryset(self):
    #     # print(self.queryset,"////////////////////////////////////")
        # queryset =  P_Invoice.objects.all()
    #     # dict = {}
    #     # for d in queryset.values():
    #     #     q,w,e,r,t = d.values()
    #     #     dict[e] = dict.get(e,0) + t
    #     # user = [{'name':n,'total_amount':t} for n,t in dict.items()]
    #     # datas= user
    #     # queryset = serializers.ChartSerializer(datas, many=True).data
    #     # queryset = queryset.objects.all()
    #
    #     username = self.request.query_params.get('name', None)
    #     if username is not None:
    #         queryset = queryset.filter(name=username)
    #     filter_backends = (filters.SearchFilter,)
    #     search_fields = ("name","total_amount")
        # return queryset


class DateChart(viewsets.ModelViewSet):
    """get total_amount from wrt datefield"""

    queryset =  P_Invoice.objects.all()
    serializer_class = serializers.DateChartSerializer
    # print(queryset,".........")
    date_list = []
    a = []
    amount = 0

    for d in queryset:
        print(d.date,"ddddd")

        if d.date in date_list:
            date_list.append(d.date)
        else :
            date_list.append(d.date)
        print(date_list,"//////")
    for date in date_list:
        # print(date,'jjjj')
        data = P_Invoice.objects.filter(date=date)
        for i in data:
            amount = i.total_amount + amount
            temp = {
                "total_amount": amount,
                "date": i.date,
            }
        a.append(temp)
