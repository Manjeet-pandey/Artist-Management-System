const AddArtistForm = [
  {
    label: "Name:",
    type: "text",
    name: "name",
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
  {
    label: "First Release Year:",
    type: "number",
    name: "first_release_year",
  },
  {
    label: "Number of Albums Released:",
    type: "number",
    name: "no_of_albums_released",
  },
];

export default AddArtistForm;
