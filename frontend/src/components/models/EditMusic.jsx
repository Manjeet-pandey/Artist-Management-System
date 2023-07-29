import { useState } from "react";
import axios from "axios";

export const EditMusic = ({
  formData,
  setArtistData,
  artistId,
  setShowAdd,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(`/artists/${artistId}/music/${musicId}`, formData)
        .then((response) => {
          artistData.music.push(response.data);
          setArtistData(artistData);
        });
      setShowAdd(false);
      setFormData({
        artist_id: artistId,
        title: "",
        album_name: "",
        genre: "rnb",
      });
    } catch (error) {
      console.error("Error adding music:", error);
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
                    Add Music
                  </h3>
                  <div className="mt-2">
                    <form className="space-y-4">
                      <div className="flex items-center">
                        <label className="w-48">Title:</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="flex-1 border rounded py-2 px-3"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="w-48">Album Name</label>
                        <input
                          type="text"
                          name="album_name"
                          value={formData.album_name}
                          onChange={handleChange}
                          className="flex-1 border rounded py-2 px-3"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="w-48">Genre</label>
                        <select
                          name="genre"
                          value={formData.genre}
                          onChange={handleChange}
                          className="flex-1 border rounded py-2 px-3"
                        >
                          <option value="rnb">R&B</option>
                          <option value="classic">Classic</option>
                          <option value="country">Country</option>
                          <option value="rock">Rock</option>
                          <option value="jazz">Jazz</option>
                        </select>
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
                Add Music
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAdd(false);
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
