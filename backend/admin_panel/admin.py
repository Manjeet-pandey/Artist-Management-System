from django.contrib import admin
from .models import Artist, Music, User

# Register your models here.
admin.site.register(Artist)
admin.site.register(Music)
admin.site.register(User)
