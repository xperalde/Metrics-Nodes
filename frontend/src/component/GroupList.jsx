import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGroup } from '../features/SelectedSlice';

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
    <div>
      <h2>Группы</h2>
      {Object.values(grouped).map(group => {
        const worstStatusColor = getWorstStatus(group.nodes);
        const statusLabel = statusText[worstStatusColor] || 'UNKNOWN';

        return (
          <div
            key={group.group_id}
            onClick={() => dispatch(selectGroup(group.group_id))}
            style={{
              padding: '8px',
              marginBottom: '6px',
              border: selectedGroupId === group.group_id ? '2px solid black' : '1px solid #ccc',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: '#f2f2f2',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: worstStatusColor,
                }}
              />
              <div>{group.group_name}</div>
            </div>
            <div style={{ marginTop: '4px', fontSize: '0.9rem', color: '#777' }}>
              Статус: {statusLabel}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupList;
