# Generated by Django 3.1.3 on 2022-02-01 21:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0010_auto_20220201_2052'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='createDate',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
