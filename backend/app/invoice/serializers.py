from rest_framework import serializers
from core.models import Customer,Items,P_Invoice,C_Invoice,DateChart,CustomersYearChart


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id','name']


class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = ['id','item','price']

# //////////////////////////////////////////////////////////////
class C_InvoiceSerializer(serializers.ModelSerializer):
    """child data of P_InvoiceSerializer"""

    class Meta:
        model = C_Invoice
        fields = ('id','key','item','price','quantity','sub_total')


class P_InvoiceSerializer(serializers.ModelSerializer):
    child = C_InvoiceSerializer(many=True)

    class Meta:
        model = P_Invoice
        fields = ('id','invoice','name','date','total_amount','child')

    def create(self, validated_data):
        albums_data = validated_data.pop('child')
        musician = P_Invoice.objects.create(**validated_data)
        for album_data in albums_data:
            C_Invoice.objects.create(key=musician, **album_data)
        return musician
#
    def update(self, instance, validated_data):
        albums_data = validated_data.pop('child')
        albums = (instance.child).all()
        albums = list(albums)
        instance.invoice = validated_data.get('invoice', instance.invoice)
        instance.name = validated_data.get('name', instance.name)
        instance.date = validated_data.get('date', instance.date)
        instance.total_amount = validated_data.get('total_amount', instance.total_amount)

        instance.save()

        for album_data in albums_data:
            album = albums.pop(0)
            album.item = album_data.get('item', album.item)
            album.price = album_data.get('price', album.price)
            album.quantity = album_data.get('quantity', album.quantity)
            album.sub_total = album_data.get('sub_total', album.sub_total)

            album.save()
        return instance

class UserChartSerializer(serializers.ModelSerializer):
    """get user and its price field"""

    class Meta:
        model = P_Invoice
        fields = ("id","name","total_amount")

class DateChartSerializer(serializers.ModelSerializer):
    """get all year and its total_amount"""

    class Meta:
        model = DateChart
        fields = ("year","total_amount")

class CustomersYearChartSerializer(serializers.ModelSerializer):
    """get all user and obtain total_amount based on month"""

    class Meta:
        model = CustomersYearChart
        fields = ("name","total_amount","month","amount")
