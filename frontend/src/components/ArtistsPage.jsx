import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddArtist } from "./models/artist/AddArtist";
import { LuEdit2 } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { EditArtist } from "./models/artist/EditArtist";
import { useMessageContext } from "../context/MessageContext";
import Pagination from "./Pagination/Pagination";

const ArtistsPage = () => {
  const [artistsData, setArtistsData] = useState([]);
  const navigator = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [artistId, setArtistId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fileRef = useRef(null);
  const { message, setMessage } = useMessageContext();
  const [newArtistData, setNewArtistData] = useState({
    name: "",
    dob: "",
    gender: "M",
    address: "",
    first_release_year: "",
    no_of_albums_released: "",
  });
  const handleExport = () => {
    axios
      .get("/artists/export-artists/", { responseType: "blob" })
      .then((response) => {
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: "text/csv" });

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link and click it to trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.download = "artists.csv";
        link.click();

        // Release the URL and remove the link
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error exporting data:", error);
      });
  };
  const handleImport = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("csv_file", file);

    axios
      .post("/artists/import-artists/", formData)
      .then((response) => {
        console.log("Import successful:", response.data.message);
        // You can show a success message or perform other actions here
      })
      .catch((error) => {
        console.error("Error importing data:", error);
        // You can show an error message or perform other error handling here
      });
  };

  useEffect(() => {
    fetchData();
    setMessage("");
  }, []);
  const fetchData = async (pageNumber = 1) => {
    try {
      const response = await axios.get(`/artists/?page=${pageNumber}`, {
        withCredentials: true,
      });
      setArtistsData(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber === currentPage) {
      return;
    }
    fetchData(pageNumber);
  };

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
      setMessage("");
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
        <h1 className="text-2xl flex-0 font-bold mb-4">
          Artists Page{message && <span>{message}</span>}
        </h1>
        <div className="flex flex-row gap-10">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Export
          </button>
          <input
            type="file"
            accept=".csv"
            ref={fileRef}
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={() => {
              fileRef.current.click();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Import
          </button>

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
      <div className="pagination-buttons">
        <Pagination
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ArtistsPage;
