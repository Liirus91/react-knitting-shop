import React from 'react';

export const Categories: React.FC<any> = ({ value, onChangeCategory }) => {
  const categoties: string[] = [
    'All',
    'Acrylic',
    'Mohair',
    'Fluff',
    'Woolen',
    'Plush',
  ];

  return (
    <div className="categories">
      <ul>
        {categoties.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(categoryName)}
            className={categoties.indexOf(value) === i ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
