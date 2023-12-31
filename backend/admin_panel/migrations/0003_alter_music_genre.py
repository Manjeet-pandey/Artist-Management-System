# Generated by Django 4.2.3 on 2023-07-29 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_panel', '0002_user_alter_artist_created_at_alter_artist_updated_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='music',
            name='genre',
            field=models.CharField(choices=[('rnb', 'R&B'), ('country', 'Country'), ('jazz', 'Jazz'), ('classic', 'Classic'), ('rock', 'Rock')], default='rnb', max_length=10),
        ),
    ]
