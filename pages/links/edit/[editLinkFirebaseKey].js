import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleLink } from '../../../api/linkData';
import LinkForm from '../../../components/forms/LinkForm';

export default function EditLink() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { editLinkFirebaseKey } = router.query;

  useEffect(() => {
    getSingleLink(editLinkFirebaseKey)
      .then((item) => {
        const newItem = { ...item, date: new Date(item.date) };
        setEditItem(newItem);
      });
  }, [editLinkFirebaseKey]);

  return (<LinkForm obj={editItem} />);
}
