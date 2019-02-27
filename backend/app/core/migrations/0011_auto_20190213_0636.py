# Generated by Django 2.1.5 on 2019-02-13 06:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_customer_items'),
    ]

    operations = [
        migrations.CreateModel(
            name='C_Invoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item', models.CharField(max_length=60)),
                ('price', models.DecimalField(decimal_places=2, max_digits=15)),
                ('quantity', models.IntegerField()),
                ('sub_total', models.DecimalField(decimal_places=2, max_digits=15)),
            ],
        ),
        migrations.CreateModel(
            name='P_Invoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('date', models.DateField()),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=15)),
            ],
        ),
        migrations.AddField(
            model_name='c_invoice',
            name='invoice_number',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='child', to='core.P_Invoice'),
        ),
    ]