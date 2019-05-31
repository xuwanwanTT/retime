import React from 'react';
import './homepage.css';
import OverWork from './module/OverWork';
import OverOneDay from './module/OverOneDay';

export default () => (
  <div className={'homepage'}>
    <OverWork />
    <OverOneDay />
  </div>
);
