from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
            CustomerViewset,
            ItemViewset,
            P_InvoiceViewset,C_InvoiceViewset,
            Chart,DateChart
            )
router = DefaultRouter()
router.register('customer', CustomerViewset)
router.register('items', ItemViewset)
router.register('invoice', P_InvoiceViewset)
router.register('item', C_InvoiceViewset)
# router.register('chart', Chart)





app_name = 'invoice'

urlpatterns = [

    path('',include(router.urls)),
    # path('userchart/',Chart.as_view({'get': 'list'})),
    path('userchart/',Chart.as_view()),

    # path('test/',DateChart.as_view({'get': 'list'})),


]
