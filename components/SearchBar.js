import { useRouter } from 'next/router'; // provides access to Next.js router that navigates to different pages in the app
import React, { useState } from 'react'; // useState hook manages state of component
import Head from 'next/head';
import { Form, FormControl } from 'react-bootstrap'; // these components used to create search bar form

export default function SearchBar() {
  const [searchBar, setSearchBar] = useState('');
  // declares searchBar state variable using useState hook
  // initialized as an empty string ''
  // setSearchBar func updates value of searchBar in component's state

  const router = useRouter();
  // declares constant router initialized with value returned by useRouter hook
  // gives component access to Next.js router

  const handleChange = (e) => {
    setSearchBar(e.target.value.toLowerCase());
  };
  // defines handleChange function w/ e as argument
  // updates value of searchBar in component's state
  // by calling setSearchBar with lowercase value of e.target.value

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchBar !== '') router.push(`/searchbar/${searchBar}`);
    setSearchBar('');
  };
  // defines handleSubmit function that takes in event e as argument
  // e.preventDefault() prevents default form behavior
  // if() checks if value of searchBar is not an empty string
  // if condition is true, calls push method on router object to navigate to /searchbar/ URL followed by value of searchBar
  // setSearchBar('') sets value of searchBar in component's state to empty string

  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      <Form className="searchbar" onSubmit={handleSubmit}>
        <FormControl type="text" placeholder="Search Music City Hip-Hop" onChange={handleChange} value={searchBar} style={{ width: '700px' }} />
      </Form>
    </>
  );
  // return statement declares what will be rendered in UI
  // creates a Form component from react-bootstrap library
  // className is searchbar and onSubmit prop that is set to handleSubmit function

  // FormControl component is setup from react-bootstrap library
  // Used to render a text input
  // component has type prop set to text
}
