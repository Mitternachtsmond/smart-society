import React from "react";
import { useFormik } from "formik";

function SearchBar({search}) {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      console.log(values);
      search(values.search);
    },
  });
  return (
    <form className="border rounded flex mt-5" onSubmit={formik.handleSubmit}>
      <input
        type="text"
        className="w-full px-4 py-2"
        placeholder="Search..."
        name="search"
        onChange={formik.handleChange}
        value={formik.values.search}
      />
      <button type="submit" className="px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;
