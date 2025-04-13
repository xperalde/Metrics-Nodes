import React from 'react'
import { useSelector } from 'react-redux'
import MetricChart from '../MetricChart'
import './NodeDetails.css'
const NodeDetails = () => {
  const nodeId = useSelector(state => state.selected.nodeId);
  const groups = useSelector(state => state.groups.list);
  const metrics = useSelector(state => state.metrics.data);

  const node = groups.find(item => item.node_id === nodeId);
  const nodeMetrics = metrics.filter(m => m.node_id === nodeId);

  if (!node) return <h2>Выберите ноду</h2>;

  const latestMetric = nodeMetrics[nodeMetrics.length - 1] || {};

  const highlight = value =>
    value > 95 ? 'red' : value > 85 ? 'orange' : 'inherit';

  return (
    <div className="node-details-container">
      <h2>{node.node_name}</h2>
      <p className="node-status" style={{ color: node.node_status_color }}>
        Статус: {node.node_status_description}
      </p>

      <section className="metrics-section">
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
      </section>

      <MetricChart metrics={nodeMetrics} />

      <section>
        <h3>Интерфейс</h3>
        <p>{node.interface_name || '—'} — {node.interface_status_description || '—'}</p>
      </section>

      <section>
        <h3>Администратор</h3>
        <p>{node.admin_name} ({node.admin_email})</p>
      </section>

      <section>
        <h3>Приложение</h3>
        <p>{node.application_name}</p>
      </section>
    </div>
  );
};

export default NodeDetails;