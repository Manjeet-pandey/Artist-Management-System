from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Artist, Music, User
from .serializers import ArtistSerializer, MusicSerializer, UserSerializer
from rest_framework import permissions
from tablib import Dataset
import csv
import io


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


@api_view(['GET'])
def export_artists_csv(request):
    artists = Artist.objects.all()
    artist_serializer = ArtistSerializer(artists, many=True)
    dataset = artist_serializer.data

    # Set the headers for the CSV file
    headers = ['name', 'address', 'dob', 'gender',
               'first_release_year', 'no_of_albums_released']

    # Create a new StringIO buffer to write CSV data
    csv_buffer = io.StringIO()

    # Use the CSV writer to write data to the buffer
    csv_writer = csv.writer(csv_buffer)
    csv_writer.writerow(headers)
    for artist in dataset:
        csv_writer.writerow([artist['name'],
                            artist['address'], artist['dob'], artist['gender'], artist['first_release_year'], artist['no_of_albums_released']])

    # Get the CSV data from the buffer
    csv_data = csv_buffer.getvalue()

    response = HttpResponse(csv_data, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="artists.csv"'
    return response


@api_view(['POST'])
def import_artists_csv(request):
    if request.method == 'POST' and request.FILES.get('csv_file'):
        csv_file = request.FILES['csv_file']

        try:
            # Read the CSV file
            decoded_file = csv_file.read().decode('utf-8')
            io_string = io.StringIO(decoded_file)

            # Create a CSV reader
            csv_reader = csv.reader(io_string)

            # Read the header row to get column names
            header = next(csv_reader)

            # Create or update artists in the database based on the CSV data
            for row in csv_reader:
                # Create a dictionary for the row data, using column names as keys
                artist_data = {
                    'name': row[header.index('name')],
                    # Replace 'birth_date' with the correct column name
                    'dob': row[header.index('dob')],
                    # Replace 'genre' with the correct column name
                    'gender': row[header.index('gender')],
                    # Replace 'address' with the correct column name
                    'address': row[header.index('address')],
                    # Convert to integer
                    'first_release_year': int(row[header.index('first_release_year')]),
                    # Convert to integer
                    'no_of_albums_released': int(row[header.index('no_of_albums_released')]),
                }

                artist_serializer = ArtistSerializer(data=artist_data)

                if artist_serializer.is_valid():
                    artist_serializer.save()
                else:
                    return Response(artist_serializer.errors, status=400)

            return Response({'message': 'Artists imported successfully.'}, status=200)

        except Exception as e:
            return Response({'error': str(e)}, status=400)

    return Response({'error': 'No CSV file provided.'}, status=400)


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

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):

    def put(self, request, pk):
        user = User.objects.get(pk=pk)
        if user is not None:
            serializer = UserSerializer(user, data=request.data)
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
