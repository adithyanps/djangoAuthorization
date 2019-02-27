from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
            CustomerViewset,
            ItemViewset,
            P_InvoiceViewset,C_InvoiceViewset,
            UserChartViewset,YearChartViewset
            )
router = DefaultRouter()
router.register('customer', CustomerViewset)
router.register('items', ItemViewset)
router.register('invoice', P_InvoiceViewset)
router.register('childitem', C_InvoiceViewset)
router.register('yearchart', YearChartViewset, base_name='tasks')
router.register('userchart', UserChartViewset, base_name='userchart')

app_name = 'invoice'

urlpatterns = [

    path('',include(router.urls)),
    # path('userchart/',Chart.as_view({'get': 'list'})),
    # path('userchart/',Chart.as_view()),
    # path('yearchart/',YearChart.as_view({'get': 'list'})),
]
