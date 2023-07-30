const musicFormFields = [
  {
    label: "Title:",
    type: "text",
    name: "title",
  },
  {
    label: "Album Name",
    type: "text",
    name: "album_name",
  },

  {
    label: "Genre:",
    type: "select",
    name: "genre",
    options: [
      { value: "rnb", label: "R&B" },
      { value: "country", label: "Country" },
      { value: "jazz", label: "Jazz" },
      { value: "classic", label: "Classic" },
      { value: "rock", label: "Rock" },
    ],
  },
];

export default musicFormFields;
