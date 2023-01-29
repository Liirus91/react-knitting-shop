import React from 'react';
import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { Sort } from './components/Sort';
import { YarnBlock } from './components/YarnBlock';
import yarns from './assets/yarns.json';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Вся пряжа</h2>
          <div className="content__items">
            {yarns.map((yarn) => (
              <YarnBlock key={yarn.id} {...yarn} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
