import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuEdit2 } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import { EditUser } from "../components/models/user/EditUser";
import { AddUser } from "./models/user/AddUser";

const genderMapping = {
  M: "Male",
  F: "Female",
  O: "Others",
};

const UsersPage = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newUserData, setNewUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "M",
    address: "",
  });
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

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}/`).then((response) => {
        setUserData((prevData) =>
          prevData.filter((user) => user.id !== userId)
        );
      });

      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  const handleEditUser = async (userId) => {
    setSelectedUserId(userId);
    const userToEdit = userData.find((user) => user.id === userId);
    setNewUserData(userToEdit);
    setShowEditForm(true);
  };

  const handleAddUser = () => {
    setShowAddForm(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl flex-0 font-bold mb-4">User Page</h1>

        {showAddForm ? (
          <AddUser setUsersData={setUserData} setShowAddForm={setShowAddForm} />
        ) : (
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add User
          </button>
        )}
      </div>

      {showEditForm && (
        <EditUser
          newUserData={newUserData}
          setNewUserData={setNewUserData}
          setUserData={setUserData}
          setShowEditForm={setShowEditForm}
          userId={selectedUserId}
        />
      )}
      <table className="w-full bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Date Of Birth</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 border-b">
              <td className="px-4 py-2 cursor-pointer">{user.first_name}</td>
              <td className="px-4 py-2 cursor-pointer">{user.last_name}</td>
              <td className="px-4 py-2 cursor-pointer">{user.email}</td>
              <td className="px-4 py-2 cursor-pointer">{user.phone}</td>
              <td className="px-4 py-2">{user.dob}</td>
              <td className="px-4 py-2">
                {genderMapping[user.gender] || user.gender}
              </td>
              <td className="px-4 py-2">{user.address}</td>

              <td className="px-4 py-2">
                <button
                  className="text-blue-500 font-semibold mr-2"
                  onClick={() => handleEditUser(user.id)}
                >
                  <LuEdit2 />
                </button>
                <button
                  className="text-red-500 font-semibold"
                  onClick={() => handleDeleteUser(user.id)}
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
