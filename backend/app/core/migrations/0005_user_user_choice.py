# Generated by Django 2.1.5 on 2019-02-09 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_delete_tag'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_choice',
            field=models.CharField(choices=[('BASE', 'Base'), ('MEDIUM', 'Medium'), ('TOP', 'Top')], default='BASE', max_length=15),
        ),
    ]