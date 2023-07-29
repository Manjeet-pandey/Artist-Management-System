import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddArtist } from "./models/AddArtist";
import { LuEdit2 } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { EditArtist } from "./models/EditArtist";

const ArtistsPage = () => {
  const [artistsData, setArtistsData] = useState([]);
  const navigator = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [artistId, setArtistId] = useState(null);

  const [newArtistData, setNewArtistData] = useState({
    name: "",
    dob: "",
    gender: "M",
    address: "",
    first_release_year: "",
    no_of_albums_released: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/artists/", {
          withCredentials: true,
        });
        console.log(response);
        setArtistsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (artistId) => {
    navigator(`/dashboard/artists/${artistId}`);
  };
  const handleAddArtist = () => {
    setShowForm(true);
  };

  const handleDeleteArtist = async (artistId) => {
    try {
      await axios.delete(`/artists/${artistId}/`).then((response) => {
        setArtistsData((prevData) =>
          prevData.filter((artist) => artist.id !== artistId)
        );
      });

      console.log("Artist deleted successfully");

      setArtistsData((prevData) =>
        prevData.filter((artist) => artist.id !== artistId)
      );
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  const handleEditArtist = async (artistId) => {
    setArtistId(artistId);
    const artistToEdit = artistsData.find((artist) => artist.id === artistId);
    setNewArtistData(artistToEdit);
    setShowEditForm(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl flex-0 font-bold mb-4">Artists Page</h1>
        {showForm ? (
          <AddArtist
            setArtistsData={setArtistsData}
            setShowForm={setShowForm}
          />
        ) : (
          <button
            onClick={handleAddArtist}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Artist
          </button>
        )}
      </div>
      {showEditForm && (
        <EditArtist
          artistId={artistId}
          newArtistData={newArtistData}
          setArtistsData={setArtistsData}
          setNewArtistData={setNewArtistData}
          setShowEditForm={setShowEditForm}
        />
      )}

      <table className="w-full bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">DOB</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">First Release Year</th>
            <th className="px-4 py-2">No. of Albums Released</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {artistsData.map((artist) => (
            <tr key={artist.id} className="hover:bg-gray-50 border-b">
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleClick(artist.id)}
              >
                {artist.name}
              </td>
              <td className="px-4 py-2">{artist.dob}</td>
              <td className="px-4 py-2">{artist.gender}</td>
              <td className="px-4 py-2">{artist.address}</td>
              <td className="px-4 py-2">{artist.first_release_year}</td>
              <td className="px-4 py-2">{artist.no_of_albums_released}</td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 font-semibold mr-2"
                  onClick={() => handleEditArtist(artist.id)}
                >
                  <LuEdit2 />
                </button>
                <button
                  className="text-red-500 font-semibold"
                  onClick={() => handleDeleteArtist(artist.id)}
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

export default ArtistsPage;
