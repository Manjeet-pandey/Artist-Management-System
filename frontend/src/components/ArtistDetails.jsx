import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LuEdit2 } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { AddMusic } from "./models/music/AddMusic";
import { EditMusic } from "./models/music/EditMusic";
import { ToastContainer } from "react-toastify";
const genreMapping = {
  rnb: "R&B",
  classic: "Classic",
  country: "Country",
  rock: "Rock",
  jazz: "Jazz",
};

const ArtistDetailsPage = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { artistId } = useParams();
  const [musicId, setMusicId] = useState(null);
  const [artistData, setArtistData] = useState(null);
  const [formData, setFormData] = useState({
    artist_id: artistId,
    title: "",
    album_name: "",
    genre: "rnb",
  });

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const response = await axios.get(`/artists/${artistId}/`, {
          withCredentials: true,
        });
        setArtistData(response.data);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  if (!artistData) {
    return <div>Loading...</div>;
  }

  const { artist, music } = artistData;

  const handleAddMusic = () => {
    setShowAdd(true);
  };
  const handleEditMusic = (songId) => {
    setMusicId(songId);
    const musicToEdit = music.find((music) => music.id === songId);
    setFormData(musicToEdit);
    setShowEdit(true);
  };
  const handleDeleteMusic = async (musicId) => {
    try {
      await axios
        .delete(`/artists/${artistId}/music/${musicId}`)
        .then((response) => {
          const updatedMusic = music.filter((song) => song.id !== musicId);
          setArtistData((prevData) => ({ ...prevData, music: updatedMusic }));
        });

      console.log("Music deleted successfully");
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl flex-0 font-bold mb-4">
          Music By : {artist.name}
        </h1>
        {showAdd ? (
          <AddMusic
            artistData={artistData}
            setArtistData={setArtistData}
            artistId={artist.id}
            setShowAdd={setShowAdd}
          />
        ) : (
          <button
            onClick={handleAddMusic}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Music
          </button>
        )}
      </div>
      {showEdit && (
        <EditMusic
          formData={formData}
          musicId={musicId}
          setFormData={setFormData}
          artistData={artistData}
          setArtistData={setArtistData}
          artistId={artistId}
          setShowEdit={setShowEdit}
        />
      )}

      <table className="w-full bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Album Name</th>
            <th className="px-4 py-2">Genre</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {music.map((song) => (
            <tr key={song.id} className="hover:bg-gray-50 border-b">
              <td className="px-4 py-2">{song.title}</td>
              <td className="px-4 py-2">{song.album_name}</td>
              <td className="px-4 py-2">
                {genreMapping[song.genre] || song.genre}
              </td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 font-semibold mr-2"
                  onClick={() => handleEditMusic(song.id)}
                >
                  <LuEdit2 />
                </button>
                <button
                  className="text-red-500 font-semibold"
                  onClick={() => handleDeleteMusic(song.id)}
                >
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistDetailsPage;
