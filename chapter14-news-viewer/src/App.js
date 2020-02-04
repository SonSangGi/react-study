import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import NewsPage from './page/NewsPage';
const App = () => {
  const [category, setCategory] = useState('all');

  const onSelect = useCallback(category => setCategory(category), []);

  return <Route path="/:category?" component={NewsPage} />;
};

export default App;
