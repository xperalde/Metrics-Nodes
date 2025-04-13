import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import GroupList from './component/GroupList/GroupList'
import NodeDetails from './component/NodeDetail/NodeDetails'
import NodeList from './component/NodeList/NodeList'
import { getGroups } from './features/GroupsSlice'
import { getMetrics } from './features/MetricsSlice'
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
    dispatch(getMetrics());

    const interval = setInterval(() => {
      dispatch(getGroups());
      dispatch(getMetrics());
      console.log('Изменения получены');
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="app-container">
      <p className="app-title">Dashboard Рыжков Данила</p>
      <div className="main-layout">
        <div className="sidebar"><GroupList /></div>
        <div className="node-list"><NodeList /></div>
        <div className="node-details"><NodeDetails /></div>
      </div>
    </div>
  );
};

export default App;
