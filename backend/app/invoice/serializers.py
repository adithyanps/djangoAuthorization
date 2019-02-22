from rest_framework import serializers
from core.models import Customer,Items,P_Invoice,C_Invoice


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

class ChartSerializer(serializers.ModelSerializer):

    class Meta:
        model = P_Invoice
        fields = ("id","name","total_amount")

class DateChartSerializer(serializers.ModelSerializer):

    class Meta:
        models = P_Invoice
        fields = ("id","date","total_amount")
