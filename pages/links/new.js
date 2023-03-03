import React from 'react';
import Head from 'next/head';
import LinkForm from '../../components/forms/LinkForm';

export default function AddLink() {
  return (
    <>
      <Head>
        <title>Add a Link</title>
      </Head>
      <LinkForm />
    </>
  );
}
