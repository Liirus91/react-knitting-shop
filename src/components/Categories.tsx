import React, { memo } from 'react';
import { categories } from '../constants';

type CategoriesProps = {
  value: string;
  onChangeCategory: (name: string) => void;
};

export const Categories: React.FC<CategoriesProps> = memo(
  ({ value, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li
              key={i}
              onClick={() => onChangeCategory(categoryName)}
              className={categories.indexOf(value) === i ? 'active' : ''}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
