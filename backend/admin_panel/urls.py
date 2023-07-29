from django.urls import path
from .views import ArtistListView, ArtistDetailView, MusicApiView, MusicCreateView, UserView, UserList

urlpatterns = [
    path('artists/', ArtistListView.as_view(), name='artist-list'),
    path('artists/<int:pk>/', ArtistDetailView.as_view(), name='artist-detail'),
    path('artists/<int:artist_id>/create/',
         MusicCreateView.as_view(), name='create'),
    path('artists/<int:artist_id>/music/<int:music_id>/',
         MusicApiView.as_view(), name='music-detail'),

    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserView.as_view(), name='user-detail'),
]
