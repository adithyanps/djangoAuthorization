# Generated by Django 2.1.5 on 2019-02-25 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_auto_20190214_1321'),
    ]

    operations = [
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.CharField(max_length=50)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=15)),
            ],
        ),
    ]
