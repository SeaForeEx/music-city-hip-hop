import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleEvent } from '../../../api/eventData';
import EventForm from '../../../components/forms/EventForm';

export default function EditEvent() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { editEventFirebaseKey } = router.query;

  useEffect(() => {
    getSingleEvent(editEventFirebaseKey).then(setEditItem);
  }, [editEventFirebaseKey]);

  return (<EventForm obj={editItem} />);
}
