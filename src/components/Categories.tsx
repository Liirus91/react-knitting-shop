import React, { memo } from 'react';

type CategoriesProps = {
  value: string;
  onChangeCategory: (name: string) => void;
};

const categoties: string[] = [
  'All',
  'Acrylic',
  'Mohair',
  'Fluff',
  'Woolen',
  'Plush',
];

export const Categories: React.FC<CategoriesProps> = memo(
  ({ value, onChangeCategory }) => {
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
  }
);
