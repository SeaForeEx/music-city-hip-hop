import React from 'react';
import Head from 'next/head';
import UserForm from '../../components/forms/UserForm';

export default function AddMember() {
  return (
    <>
      <Head>
        <title>Join MCHH!</title>
      </Head>
      <UserForm />
    </>
  );
}
