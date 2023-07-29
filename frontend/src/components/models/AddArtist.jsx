import { useState } from "react";
import axios from "axios";

export const AddArtist = ({ setArtistsData, setShowForm }) => {
  const [newArtistData, setNewArtistData] = useState({
    name: "",
    dob: "",
    gender: "M",
    address: "",
    first_release_year: "",
    no_of_albums_released: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArtistData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/artists/", newArtistData).then((response) => {
        setArtistsData((prevData) => [...prevData, response.data]);
      });

      console.log("Artist added successfully!");
      setShowForm(false);

      setNewArtistData({
        name: "",
        dob: "",
        gender: "M",
        address: "",
        first_release_year: "",
        no_of_albums_released: "",
      });
    } catch (error) {
      console.error("Error adding artist:", error);
    }
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Add Artist
                  </h3>
                  <div className="mt-2">
                    <form className="space-y-4">
                      <div className="flex items-center">
                        <label className="w-48">Name:</label>
                        <input
                          type="text"
                          name="name"
                          value={newArtistData.name}
                          onChange={handleChange}
                          className="flex-1 border rounded py-2 px-3"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="w-48">DOB:</label>
                        <input
                          type="date"
                          name="dob"
                          value={newArtistData.dob}
                          onChange={handleChange}
                          className="flex-1 border rounded py-2 px-3"
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="w-48">Gender:</label>
                        <select
                          name="gender"
                          value={newArtistData.gender}
                          onChange={handleChange}
                          className="flex-1 border rounded py-2 px-3"
                        >
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="O">Others</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <label className="w-48">Address:</label>
                        <input
                          type="text"
                          name="address"
                          value={newArtistData.address}
                          onChange={handleChange}
                          className="flex-1 border rounded py-2 px-3"
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="w-48">First Release Year:</label>
                        <input
                          type="number"
                          name="first_release_year"
                          value={newArtistData.first_release_year}
                          onChange={handleChange}
                          className="flex-1 border rounded py-2 px-3"
                        />
                      </div>

                      <div className="flex items-center">
                        <label className="w-48">
                          Number of Albums Released:
                        </label>
                        <input
                          type="number"
                          name="no_of_albums_released"
                          value={newArtistData.no_of_albums_released}
                          onChange={handleChange}
                          className="flex-1 border rounded py-2 px-3"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Add Artist
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
