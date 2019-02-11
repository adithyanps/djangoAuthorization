from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status

from core.models import Employee
from company import serializers
from . import permissions

# Create your views here.

class EmployeeViewSet(viewsets.ModelViewSet):
    """Manage tags in the database"""
    serializer_class = serializers.EmployeeSerializer
    queryset = Employee.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.Permission,IsAuthenticated,)
    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        return self.queryset.filter(user=self.request.user)
    def perform_create(self, serializer):
        """Create a new tag"""

        serializer.save(user=self.request.user)
