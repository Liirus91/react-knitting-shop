import React, { useState } from 'react';

export const Categories: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categoties: string[] = [
    'Все',
    'Акриловая',
    'Мохеровая',
    'Пуховая',
    'Шерстяная',
    'Плюшевая',
  ];

  const onClickCategory = (i: number) => {
    setActiveIndex(i);
  };

  return (
    <div className="categories">
      <ul>
        {categoties.map((category, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={activeIndex === i ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
