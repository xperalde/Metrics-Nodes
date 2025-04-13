import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectNode } from '../../features/SelectedSlice'
import './NodeList.css'
const NodeList = () => {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups.list);
  const selectedGroupId = useSelector(state => state.selected.groupId);
  const selectedNodeId = useSelector(state => state.selected.nodeId);
  const metrics = useSelector(state => state.metrics.data);

  const nodes = groups
    .filter(item => selectedGroupId === null || item.group_id === selectedGroupId)
    .reduce((acc, curr) => {
      if (!acc.find(n => n.node_id === curr.node_id)) acc.push(curr);
      return acc;
    }, []);

  const getWorstMetric = nodeId => {
    const nodeMetrics = metrics.filter(m => m.node_id === nodeId);
    const latest = nodeMetrics[nodeMetrics.length - 1];
    if (!latest) return { name: 'Нет данных', value: 0 };

    const { cpu_utilization, memory_utilization, disk_utilization } = latest;
    const metricsMap = [
      { name: 'CPU', value: cpu_utilization },
      { name: 'Memory', value: memory_utilization },
      { name: 'Disk', value: disk_utilization },
    ];
    return metricsMap.reduce((max, curr) => (curr.value > max.value ? curr : max));
  };

  return (
    <div className="node-list-container">
      <h2>Ноды</h2>
      {nodes.map(node => {
        const worst = getWorstMetric(node.node_id);
        const highlight = worst.value > 95 ? 'red' : worst.value > 85 ? 'orange' : 'inherit';

        return (
          <div
            key={node.node_id}
            onClick={() => dispatch(selectNode(node.node_id))}
            className={`node-item ${selectedNodeId === node.node_id ? 'selected' : ''}`}
          >
            <div className="node-info">
              <div className="status-indicator" style={{ backgroundColor: node.node_status_color || 'black' }} />
              <div>{node.node_name}</div>
            </div>
            <div className="node-worst-metric" style={{ color: highlight }}>
              {worst.name}: {worst.value ?? '—'}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NodeList;
