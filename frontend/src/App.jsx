import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import GroupList from './component/GroupList'
import NodeDetails from './component/NodeDetails'
import NodeList from './component/NodeList'
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
    <div className="app">
      <h1>Мониторинг</h1>
      <div className="app" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <div style={{ width: '20%' }}><GroupList /></div>
      <div style={{ width: '30%' }}><NodeList /></div>
      <div style={{ width: '50%' }}><NodeDetails /></div>
      </div>
    </div>
  );
};

export default App;
