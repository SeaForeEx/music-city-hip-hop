import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserByFBKey } from '../../../api/userData';
import UserForm from '../../../components/forms/UserForm';

export default function EditUser() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { editUserFirebaseKey } = router.query;

  useEffect(() => {
    getUserByFBKey(editUserFirebaseKey).then(setEditItem);
  }, [editUserFirebaseKey]);

  return (<UserForm obj={editItem} />);
}
