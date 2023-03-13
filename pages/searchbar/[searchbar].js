/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
// hook that accesses URL and query parameters
import React, { useEffect, useState } from 'react';
// useState component state, useEffect side effects
import { getArtist, getFans } from '../../api/userData';
// API function that retrieves users data
import UserCard from '../../components/UserCard';
// custom coponent that displays indiv users

export default function SearchBar() {
  const [searchArtists, setSearchArtists] = useState([]);
  const [searchFans, setSearchFans] = useState([]);

  const router = useRouter();
  const { searchbar } = router.query;

  const searchAllArtists = () => {
    getArtist().then((artists) => {
      const filteredArtists = artists.filter((artist) => artist.name.toLowerCase().includes(searchbar.toLowerCase()));
      const sortedArtists = filteredArtists.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
      setSearchArtists(sortedArtists);
    });
  };

  const searchAllFans = () => {
    getFans().then((fans) => {
      const filteredFans = fans.filter((fan) => fan.name.toLowerCase().includes(searchbar.toLowerCase()));
      const sortedFans = filteredFans.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
      setSearchFans(sortedFans);
    });
  };

  useEffect(() => {
    // performs side effect when searchBar value changes
    searchAllArtists();
    searchAllFans();
    // called to update searchUsers state with new filtered users
    return () => {
      setSearchArtists([]);
      setSearchFans([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchbar]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {searchArtists.map((emcee) => <UserCard key={emcee.firebaseKey} userObj={emcee} onUpdate={searchAllArtists} />)}
        {searchFans.map((audience) => <UserCard key={audience.firebaseKey} userObj={audience} onUpdate={searchAllFans} />)}
      </div>
    </>
  );
}
