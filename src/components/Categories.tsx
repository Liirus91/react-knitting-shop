import React from 'react';

export const Categories: React.FC = () => {
  return (
    <div className="categories">
      <ul>
        <li className="active">Вся</li>
        <li>Акриловая</li>
        <li>Мохеровая</li>
        <li>Пуховая</li>
        <li>Шерстяная</li>
        <li>Плюшевая</li>
      </ul>
    </div>
  );
};
