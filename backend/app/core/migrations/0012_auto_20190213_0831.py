# Generated by Django 2.1.5 on 2019-02-13 08:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20190213_0636'),
    ]

    operations = [
        migrations.RenameField(
            model_name='c_invoice',
            old_name='invoice_number',
            new_name='key',
        ),
    ]
