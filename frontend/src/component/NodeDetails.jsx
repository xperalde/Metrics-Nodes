import React from 'react';
import { useSelector } from 'react-redux';
import MetricChart from './MetricChart';

const NodeDetails = () => {
  const nodeId = useSelector(state => state.selected.nodeId);
  const groups = useSelector(state => state.groups.list);
  const metrics = useSelector(state => state.metrics.data);

  const node = groups.find(item => item.node_id === nodeId);
  const nodeMetrics = metrics.filter(m => m.node_id === nodeId);

  if (!node) return <div>Выберите ноду</div>;

  const latestMetric = nodeMetrics[nodeMetrics.length - 1] || {};

  const highlight = value =>
    value > 95 ? 'red' : value > 85 ? 'orange' : 'inherit';

  return (
    <div>
      <h2>{node.node_name}</h2>
      <div style={{ color: node.node_status_color }}>Статус: {node.node_status_description}</div>

      <h3>Метрики</h3>
      <ul>
        <li style={{ color: highlight(latestMetric.cpu_utilization) }}>
          CPU: {latestMetric.cpu_utilization ?? '—'}%
        </li>
        <li style={{ color: highlight(latestMetric.memory_utilization) }}>
          Память: {latestMetric.memory_utilization ?? '—'}%
        </li>
        <li style={{ color: highlight(latestMetric.disk_utilization) }}>
          Диск: {latestMetric.disk_utilization ?? '—'}%
        </li>
      </ul>

      <MetricChart metrics={nodeMetrics} />

      <h3>Интерфейс</h3>
      <div>{node.interface_name || '—'} — {node.interface_status_description || '—'}</div>

      <h3>Администратор</h3>
      <div>{node.admin_name} ({node.admin_email})</div>

      <h3>Приложение</h3>
      <div>{node.application_name}</div>
    </div>
  );
};

export default NodeDetails;
