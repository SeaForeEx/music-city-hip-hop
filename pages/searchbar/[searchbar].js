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
  const { searchBar } = router.query;

  const searchAllUsers = () => {
    // retrieves all users using getUser API
    getUser().then((users) => {
      const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchBar));
      // filters messages based on searchBar value

      setSearchUsers(filteredUsers);
    });
  };

  useEffect(() => {
    // performs side effect when searchBar value changes
    searchAllUsers();
    // called to update searchMessages state with new filtered messages
    return () => {
      setSearchUsers([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBar]);

  return (
    <>
      <div>
        {searchUsers.map((emcee) => <UserCard key={emcee.firebaseKey} userObj={emcee} onUpdate={searchAllUsers} />)}
      </div>
    </>
  );
}
