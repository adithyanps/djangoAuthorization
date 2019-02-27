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
from itertools import zip_longest as zip
import calendar
# Create your views here.

class CustomerViewset(viewsets.ModelViewSet):
    """create a new customer and see all customers"""
    queryset = Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

    """search json data on api"""
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name",)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.order_by('id')


class ItemViewset(viewsets.ModelViewSet):
    """create a new item and see all items"""
    queryset = Items.objects.all()
    serializer_class = serializers.ItemsSerializer

    filter_backends = (filters.SearchFilter,)
    search_fields = ("item",)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.order_by('id')

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

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.order_by('id')


class UserChartViewset(viewsets.ModelViewSet):
    """get all total amount wrt its name"""

    serializer_class = serializers.UserChartSerializer
    queryset =  P_Invoice.objects.all()

    dict = {}
    for d in queryset.values():
        q,w,e,r,t = d.values()
        dict[e] = dict.get(e,0) + t
    user = [{'name':n,'total_amount':t} for n,t in dict.items()]
    datas= user
    newlist = sorted(datas, key=lambda k: k['name'])
    queryset = serializers.UserChartSerializer(newlist, many=True).data


class YearChartViewset(viewsets.ModelViewSet):
    """get total_amount from wrt datefield"""
    serializer_class = serializers.DateChartSerializer
    queryset =  P_Invoice.objects.all()

    def list(self, request):
        queryset =  P_Invoice.objects.all()
        date_list = []
        a = []
        b =[]
        amount1 = []
        year = []
        for d in queryset:
            if d.date.year not in date_list:
                date_list.append(d.date.year)
        for da in date_list:
            b = P_Invoice.objects.filter(date__year=da)
            print(b,'////????')
            amount = 0
            for i in b:
                if i.date.year == da:
                    amount = i.total_amount + amount
            amount1.append(amount)
            year.append(i.date.year)
        list = []
        final_list = []
        for (a,b) in zip(year,amount1):
            templist = []
            templist.append(a)
            templist.append(b)
            list.append(templist)
        list2 = ['year','total_amount']
        for i in list:
            temp_dict = dict(zip(list2,i))
            final_list.append(temp_dict)
        datas = final_list
        print(datas)
        newlist = sorted(datas, key=lambda k: k['year'])
        queryset = serializers.DateChartSerializer(newlist, many=True).data
        return Response(queryset)


class CustomersYearChartViewset(viewsets.ModelViewSet):
    """get all user and obtain total_amount based on month"""

    serializer_class = serializers.CustomersYearChartSerializer
    queryset = P_Invoice.objects.all()

    date_list = []

    amount1 = []
    year = []
    month_list = []
    month_list1 = []
    month_name = []
    name_list = []
    year_list = []

    for d in queryset:
        year_list.append(d.date.year)
        if d.date.year not in date_list:
            date_list.append(d.date.year)

    # print(date_list)
    for d in queryset:
        name_list.append(d.name)
    print(name_list)
    print(year_list)

    # for da in date_list:
    #     b = P_Invoice.objects.filter(date__year=da)
    #     month = []
    #     for m in b :
    #         m1 = []
    #         if m.date.month not in month:
    #             month.append(m.date.month)
    #     # print(month,'....')
    #     month_list.append(month)
    #     for mn in month:
    #         # print(b,'////')
    #         # print(mn,'@@@@@')
    #         c = b.filter(date__month=mn)
    #         # print(c,"////????")
    #         amount = 0
    #         for i in c:
    #             if i.date.month == mn:
    #                 amount = i.total_amount + amount
    #         # print('total',amount,'.......',i.date.month,'month',i.date.year)
    #         amount1.append(amount)
    # # print(amount1,'...')


    for name in name_list:
        data = P_Invoice.objects.filter(name=name)
        # print(data,'....')
        for da in date_list:
            # print(da)
            b = data.filter(date__year=da)
            # print(b,'...',name,'....')
            month = []
            for m in b :
                m1 = []
                # print(m.date.month,"????//")
                if m.date.month not in month:
                    month.append(m.date.month)
            # print(month,'********')
            month_list1.append(month)
            for mn in month:
                print(mn)
                c = b.filter(date__month=mn)
                # print(c,'.......////')
                amount = 0
                for i in c:
                    # print(i,name)
                    if i.date.month == mn:
                        amount = i.total_amount + amount
                print('total',amount,'.......',mn,'month',da,name)
                amount1.append(amount)
    print(amount1)
    # print(month_list1,'////')


    # print(month_list,';;;;')
    for dd in month_list:
        monthname1 = []
        for ddd in dd:
            xx = calendar.month_name[ddd]
            monthname1.append(xx)
        month_name.append(monthname1)
    # print(month_name,'...///')
