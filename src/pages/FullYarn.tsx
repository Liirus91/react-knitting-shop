import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { API } from '../redux/yarn/asyncActions';
import { Yarn } from '../redux/yarn/types';

const FullYarn: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [yarn, setYarn] = useState<Yarn>();

  useEffect(() => {
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
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="full-yarn-block">
        <div className="full-yarn-block-wrapper">
          <img src={yarn.images[0]} alt="" />
          <div className="full-yarn-block">
            <h2>{yarn.title}</h2>
            <h4>Price: {yarn.price}$</h4>
            <h4>Category: {yarn.category}</h4>
            <h4>Weight: {yarn.weight}g</h4>
            <h4>Rating: {yarn.rating}</h4>
          </div>
        </div>
        <Link className="button button--black" to="/">
          <span>Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default FullYarn;
