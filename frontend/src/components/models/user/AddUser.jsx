import { useState } from "react";
import axios from "axios";
import UserFormFields from "../../FormFields/userForm";

export const AddUser = ({ setUsersData, setShowAddForm }) => {
  const [newUserData, setNewUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: "M",
    address: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, phone, password, dob, address } =
      newUserData;
    const validationErrors = {};
    if (!first_name.trim()) {
      validationErrors.first_name = "First name field is required.";
    }
    if (!last_name.trim()) {
      validationErrors.last_name = "Last name field is required.";
    }
    if (!password.trim()) {
      validationErrors.password = "Password field is required.";
    } else if (password.length < 6) {
      validationErrors.password =
        "Password must be at least 6 characters long.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/.test(password)) {
      validationErrors.password =
        "Password must contain at least one lowercase letter, one uppercase letter, and one number.";
    }
    if (!email.trim()) {
      validationErrors.email = "Email field is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email address.";
    }

    // Validate phone
    if (!phone.trim()) {
      validationErrors.phone = "Phone field is required.";
    } else if (!/^\d+$/.test(phone)) {
      validationErrors.phone = "Phone must contain only numeric characters.";
    } else if (phone.length !== 10) {
      validationErrors.phone = "Phone must be exactly 10 digits.";
    }

    if (!dob) {
      validationErrors.dob = "Date of Birth field is required.";
    }

    if (!address.trim()) {
      validationErrors.address = "Address field is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log(validationErrors);
      return;
    }
    try {
      await axios.post("/users/", newUserData).then((response) => {
        setUsersData((prevData) => [...prevData, response.data]);
      });

      console.log("User added successfully!");
      setShowAddForm(false);

      setNewUserData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
        gender: "M",
        address: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
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
                    Add User
                  </h3>
                  <div className="mt-2">
                    <form className="space-y-4">
                      {UserFormFields.map((field) => (
                        <div key={field.name}>
                          <div className="flex items-center">
                            <label className="w-48">{field.label}</label>
                            {field.type === "select" ? (
                              <select
                                name={field.name}
                                value={newUserData[field.name]}
                                onChange={handleChange}
                                className="flex-1 border rounded py-2 px-3"
                              >
                                {field.options.map((option) => (
                                  <option
                                    value={option.value}
                                    key={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={field.type}
                                name={field.name}
                                value={newUserData[field.name]}
                                onChange={handleChange}
                                className="flex-1 border rounded py-2 px-3"
                              />
                            )}
                          </div>
                          {errors[field.name] && (
                            <div className="flex items-center">
                              <span className="w-48"></span>
                              <span className="text-red-500 text-xs">
                                {errors[field.name]}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
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
                Add User
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
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
