import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuEdit2 } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";

const genderMapping = {
  M: "Male",
  F: "Female",
  O: "Others",
};

const UsersPage = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/users/", {
          withCredentials: true,
        });
        console.log(response);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl flex-0 font-bold mb-4">User Page</h1>

        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Add User
        </button>
      </div>

      <table className="w-full bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Date Of Birth</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 border-b">
              <td
                className="px-4 py-2 cursor-pointer"
                // onClick={() => handleClick(artist.id)}
              >
                {user.first_name}
              </td>
              <td
                className="px-4 py-2 cursor-pointer"
                // onClick={() => handleClick(artist.id)}
              >
                {user.last_name}
              </td>
              <td className="px-4 py-2">{user.dob}</td>
              <td className="px-4 py-2">
                {genderMapping[user.gender] || user.gender}
              </td>
              <td className="px-4 py-2">{user.address}</td>
              {/* <td className="px-4 py-2">{artist.first_release_year}</td> */}
              {/* <td className="px-4 py-2">{artist.no_of_albums_released}</td> */}
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 font-semibold mr-2"
                  // onClick={() => handleEditArtist(artist.id)}
                >
                  <LuEdit2 />
                </button>
                <button
                  className="text-red-500 font-semibold"
                  // onClick={() => handleDeleteArtist(artist.id)}
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

export default UsersPage;
