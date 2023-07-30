const UserFormFields = [
  {
    label: "First Name:",
    type: "text",
    name: "first_name",
  },
  {
    label: "Last Name:",
    type: "text",
    name: "last_name",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
  },
  {
    label: "Phone",
    type: "number",
    name: "phone",
  },

  {
    label: "DOB:",
    type: "date",
    name: "dob",
  },
  {
    label: "Gender:",
    type: "select",
    name: "gender",
    options: [
      { value: "M", label: "Male" },
      { value: "F", label: "Female" },
      { value: "O", label: "Others" },
    ],
  },
  {
    label: "Address:",
    type: "text",
    name: "address",
  },
];

export default UserFormFields;
