from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password

# Create your models here.


class CustomUser(AbstractUser):
    date_of_birth = models.DateField(null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    address = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(
        auto_now_add=True, auto_now=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, blank=False)

    def save(self, *args, **kwargs):

        if self.password:
            self.password = make_password(self.password)
        super(CustomUser, self).save(*args, **kwargs)
