from rest_framework import serializers

from core.models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    """serialzer for Employee"""
    class Meta:
        model = Employee
        fields = ('id','name','age','salary','dob','gender')
        read_only_Fields = ('id',)
