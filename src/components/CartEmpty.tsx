import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Cart is empty <span>😕</span>
    </h2>
    <p>
      Most likely, you have not ordered yarn yet.
      <br />
      To order yarn, go to the main page.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link className="button button--black" to="/">
      <span>Go back</span>
    </Link>
  </div>
);

export default CartEmpty;
