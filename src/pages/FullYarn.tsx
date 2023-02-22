import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../redux/yarn/asyncActions';

//TODO: finalize the card
export const FullYarn: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [yarn, setYarn] = useState<{
    images: string[];
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchYarn() {
      try {
        const { data } = await API.get(`collections/products/${id}`);
        setYarn(data);
      } catch (error) {
        navigate('/notFound');
      }
    }

    fetchYarn();
  }, []);

  if (!yarn) {
    return <>'Loading...'</>;
  }

  return (
    <div className="container">
      <img src={yarn.images[0]} alt="" />
      <h2>{yarn.title}</h2>
      <h4>{yarn.price} $</h4>
    </div>
  );
};
