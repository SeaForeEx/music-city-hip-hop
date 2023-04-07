/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
// hook that accesses URL and query parameters
import React, { useEffect, useState } from 'react';
// useState component state, useEffect side effects
import Head from 'next/head';
import { getArtist, getFans } from '../../api/userData';
// API function that retrieves users data
import UserCard from '../../components/UserCard';
// custom coponent that displays indiv users

export default function SearchBar() {
  const [searchArtists, setSearchArtists] = useState([]); // state variable to hold the filtered artists
  const [searchFans, setSearchFans] = useState([]); // state variable to hold the filtered fans

  const router = useRouter(); // hook to access the router object
  const { searchbar } = router.query; // getting the value of the searchbar from the router query

  const searchAllArtists = () => {
    getArtist().then((artists) => { // fetching all artist data
      const filteredArtists = artists.filter((artist) => artist.name.toLowerCase().includes(searchbar.toLowerCase())); // filtering the artists based on the searchbar value
      const sortedArtists = filteredArtists.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)); // sorting the filtered artists by name
      setSearchArtists(sortedArtists); // updating the state variable with the filtered and sorted artists
    });
  };

  const searchAllFans = () => {
    getFans().then((fans) => { // fetching all fan data
      const filteredFans = fans.filter((fan) => fan.name.toLowerCase().includes(searchbar.toLowerCase())); // filtering the fans based on the searchbar value
      const sortedFans = filteredFans.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)); // sorting the filtered fans by name
      setSearchFans(sortedFans); // updating the state variable with the filtered and sorted fans
    });
  };

  useEffect(() => {
    // performs side effect when searchBar value changes
    searchAllArtists(); // calling function to filter and sort artists based on searchbar value
    searchAllFans(); // calling function to filter and sort fans based on searchbar value
    // called to update searchUsers state with new filtered users
    return () => {
      setSearchArtists([]); // resetting the state variable for filtered artists
      setSearchFans([]); // resetting the state variable for filtered fans
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchbar]); // running the useEffect when searchbar value changes

  return (
    <>
      {/* Set the page title to "Search Results" using Next.js Head component */}
      <Head>
        <title>Search Results</title>
      </Head>
      <div className="d-flex flex-wrap">
        {/* mapping over filtered artists and rendering UserCard component for each */}
        {searchArtists.map((emcee) => <UserCard key={emcee.firebaseKey} userObj={emcee} onUpdate={searchAllArtists} />)}
        {/* mapping over filtered fans and rendering UserCard component for each */}
        {searchFans.map((audience) => <UserCard key={audience.firebaseKey} userObj={audience} onUpdate={searchAllFans} />)}
      </div>
    </>
  );
}
