/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
// hook that accesses URL and query parameters
import React, { useEffect, useState } from 'react';
// useState component state, useEffect side effects
import { getUser } from '../../api/userData';
// API function that retrieves users data
import UserCard from '../../components/UserCard';
// custom coponent that displays indiv users

export default function SearchBar() {
  const [searchUsers, setSearchUsers] = useState([]);

  const router = useRouter();
  const { searchbar } = router.query;

  const searchAllUsers = () => {
    if (!searchbar) return;
    getUser().then((users) => {
      const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchbar.toLowerCase()));
      setSearchUsers(filteredUsers);
      console.warn(filteredUsers);
    });
  };

  useEffect(() => {
    // performs side effect when searchBar value changes
    searchAllUsers();
    // called to update searchUsers state with new filtered users
    return () => {
      setSearchUsers([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchbar]);

  return (
    <>
      <div>
        {searchUsers.map((emcee) => <UserCard key={emcee.firebaseKey} userObj={emcee} onUpdate={searchAllUsers} />)}
      </div>
    </>
  );
}
