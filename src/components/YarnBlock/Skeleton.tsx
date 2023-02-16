import ContentLoader from 'react-content-loader';
import React from 'react';

export const Sceleton: React.FC = () => (
  <ContentLoader
    className="yarn-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="274" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="320" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="423" rx="10" ry="10" width="95" height="30" />
    <rect x="126" y="415" rx="25" ry="25" width="152" height="45" />
    <rect x="0" y="5" rx="0" ry="0" width="280" height="245" />
  </ContentLoader>
);
