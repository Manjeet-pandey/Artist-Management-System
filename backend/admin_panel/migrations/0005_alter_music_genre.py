# Generated by Django 4.2.3 on 2023-07-30 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_panel', '0004_alter_music_genre'),
    ]

    operations = [
        migrations.AlterField(
            model_name='music',
            name='genre',
            field=models.CharField(choices=[('rock', 'Rock'), ('country', 'Country'), ('classic', 'Classic'), ('rnb', 'R&B'), ('jazz', 'Jazz')], default='rnb', max_length=10),
        ),
    ]
