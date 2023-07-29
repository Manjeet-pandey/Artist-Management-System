from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Artist, Music, User
from .serializers import ArtistSerializer, MusicSerializer, UserSerializer
from rest_framework import permissions


class ArtistListView(APIView):

    def get(self, request):
        artists = Artist.objects.all()
        serializer = ArtistSerializer(artists, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ArtistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ArtistDetailView(APIView):
    def get_object(self, pk):
        try:
            return Artist.objects.get(pk=pk)
        except Artist.DoesNotExist:
            return None

    def get(self, request, pk):
        artist = self.get_object(pk)
        if artist is not None:
            music = Music.objects.filter(artist_id=artist)
            artist_serializer = ArtistSerializer(artist)
            music_serializer = MusicSerializer(music, many=True)
            response_data = {
                'artist': artist_serializer.data,
                'music': music_serializer.data,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        artist = self.get_object(pk)
        if artist is not None:
            serializer = ArtistSerializer(
                artist, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        artist = self.get_object(pk)
        if artist is not None:
            artist.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)


class MusicCreateView(APIView):
    def post(self, request, artist_id):
        try:
            artist = Artist.objects.get(pk=artist_id)
        except Artist.DoesNotExist:
            return Response({'detail': 'Artist not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = MusicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MusicApiView(APIView):

    def get_object(self, artist_id, music_id):
        try:
            return Music.objects.get(artist_id=artist_id, id=music_id)
        except Music.DoesNotExist:
            return None

    def get(self, request, artist_id, music_id):
        music = self.get_object(artist_id, music_id)
        if music is not None:
            serializer = MusicSerializer(music)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'Music not found.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, artist_id, music_id):
        music = self.get_object(artist_id, music_id)
        if music is not None:
            serializer = MusicSerializer(music, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Music not found.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, artist_id, music_id):
        music = self.get_object(artist_id, music_id)
        if music is not None:
            music.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': 'Music not found.'}, status=status.HTTP_404_NOT_FOUND)


class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = User.objects.get(pk=pk)
        if user is not None:
            serializer = MusicSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        user = User.objects.get(pk=pk)
        if user is not None:
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
