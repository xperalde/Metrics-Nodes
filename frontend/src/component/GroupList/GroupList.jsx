import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectGroup } from '../../features/SelectedSlice'
import './GroupList.css'
const statusPriority = {
  black: 6,
  darkred: 5,
  red: 4,
  yellow: 3,
  lightgreen: 2,
  grey: 1,
  null: 0,
  undefined: 0,
};

const statusText = {
  black: 'UNREACHABLE',
  grey: 'SHUTDOWN',
  lightgreen: 'UP',
  yellow: 'WARNING',
  red: 'CRITICAL',
  darkred: 'DOWN',
};

const GroupList = () => {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groups.list);
  const selectedGroupId = useSelector(state => state.selected.groupId);

  const grouped = groups.reduce((acc, item) => {
    const existing = acc[item.group_id] || {
      group_name: item.group_name,
      group_id: item.group_id,
      nodes: [],
    };
    existing.nodes.push(item);
    acc[item.group_id] = existing;
    return acc;
  }, {});

  const getWorstStatus = (nodes) => {
    return nodes.reduce((acc, node) => {
      const color = node.node_status_color;
      const priority = statusPriority[color] ?? 0;
      return priority > acc.priority ? { color, priority } : acc;
    }, { color: 'grey', priority: 0 }).color;
  };

  return (
    <div className="group-list">
      <h2 className="group-list-title">Группы</h2>
      {Object.values(grouped).map(group => {
        const worstStatusColor = getWorstStatus(group.nodes);
        const statusLabel = statusText[worstStatusColor] || 'UNKNOWN';

        return (
          <div
            key={group.group_id}
            onClick={() => dispatch(selectGroup(group.group_id))}
            className={`group-item ${selectedGroupId === group.group_id ? 'selected' : ''}`}
          >
            <div className="group-info">
              <div className="status-indicator" style={{ backgroundColor: worstStatusColor }} />
              <div className="group-text">
                <div className="group-name">{group.group_name}</div>
                <div className="group-status">Статус: {statusLabel}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupList;
