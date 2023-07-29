
from rest_framework import serializers
from .models import Artist, Music, User


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
       # fields = '__all__'
        exclude = ('password',)
