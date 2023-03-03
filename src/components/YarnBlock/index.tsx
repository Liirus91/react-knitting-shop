import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartByIdSelector } from '../../redux/cart/selectors';
import { addItem } from '../../redux/cart/slice';

const colorsNames = [
  {
    id: '6oMKzYW',
    name: 'yellow',
  },
  { id: '6wGGzlw', name: 'red' },
];

type YarnBlockProps = {
  id: number;
  title: string;
  price: number;
  images: string[];
  colors: string[];
  weight: number;
};

export const YarnBlock: React.FC<YarnBlockProps> = ({
  id,
  title,
  price,
  images,
  colors,
  weight,
}) => {
  const dispatch = useDispatch();
  const [activeColor, setActiveColor] = useState<string>(colorsNames[0].name);
  const cartItem = useSelector(cartByIdSelector(id));
  const addedCount = cartItem ? cartItem.count : 0;

  const yarnColors = colors.map(
    (color) => colorsNames.find((x) => x.id === color) || colorsNames[0]
  );

  const currentColor =
    yarnColors.find((color) => color.name === activeColor) || yarnColors[0];

  const image = images[colors.indexOf(currentColor.id)] || images[0];

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      image,
      color: activeColor,
      weight,
      count: 0,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="yarn-block">
        <Link to={`/yarn/${id}`}>
          <img className="yarn-block__image" src={image} alt="yarn" />
          <h4 className="yarn-block__title">{title}</h4>
        </Link>
        <div className="yarn-block__selector">
          <ul>
            {yarnColors.map((color) => (
              <li
                key={color.id}
                onClick={() => setActiveColor(color.name)}
                className={activeColor === color.name ? 'active' : ''}
              >
                {color.name}
              </li>
            ))}
          </ul>
          <ul>
            <li className="active">{weight} g</li>
          </ul>
        </div>
        <div className="yarn-block__bottom">
          <div className="yarn-block__price">{price} $</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
