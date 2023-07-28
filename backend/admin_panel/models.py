from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('O', 'Others'),
)

# Create your models here.


class Artist(models.Model):
    name = models.CharField(max_length=255)
    dob = models.DateField()
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, default='M')
    address = models.CharField(max_length=255)
    first_release_year = models.IntegerField(
        validators=[
            MinValueValidator(1000, message='Enter Valid Year'),
            MaxValueValidator(2999, message='Enter Valid Year')
        ]
    )
    no_of_albums_released = models.PositiveIntegerField()
    created_at = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, blank=False)

    def __str__(self):
        return self.name


class Music(models.Model):
    GENRE_CHOICES = {
        ('rnb', 'R&B'),
        ('classic', 'Classic'),
        ('Contry', 'Contry'),
        ('rock', 'Rock'),
        ('jazz', 'Jazz')
    }
    artist_id = models.ForeignKey(Artist, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    album_name = models.CharField(max_length=255)
    genre = models.CharField(
        max_length=10, choices=GENRE_CHOICES, default='rnb')
    created_at = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, blank=False)

    def __str__(self):
        return self.title
