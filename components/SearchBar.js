import { useRouter } from 'next/router'; // provides access to Next.js router that navigates to different pages in the app
import React, { useState } from 'react'; // useState hook manages state of component
import { Form, FormControl } from 'react-bootstrap'; // these components used to create search bar form

// SearchBar component definition
export default function SearchBar() {
  // Initialize searchBar state to empty string
  const [searchBar, setSearchBar] = useState('');

  // Get the router instance from Next.js
  const router = useRouter();

  // Event handler for when the user types in the search bar
  const handleChange = (e) => {
    // Update the searchBar state to the input value in lowercase
    setSearchBar(e.target.value.toLowerCase());
  };

  // Event handler for when the user submits the search bar form
  const handleSubmit = (e) => {
    // Prevent the form from submitting normally
    e.preventDefault();
    // If the searchBar is not empty, navigate to the search results page
    if (searchBar !== '') {
      // Use Next.js router to navigate to the search results page with the searchBar value as the query parameter
      router.push(`/searchbar/${searchBar}`);
    }
    // Reset the searchBar state to an empty string
    setSearchBar('');
  };

  // Return the JSX for the SearchBar component
  return (
    <>
      {/* Render the search bar form */}
      <Form className="searchbar" onSubmit={handleSubmit}>
        {/* Render the input field for the search bar */}
        <FormControl type="text" placeholder="Search Music City Hip-Hop" onChange={handleChange} value={searchBar} style={{ width: '300px' }} />
      </Form>
    </>
  );
}
