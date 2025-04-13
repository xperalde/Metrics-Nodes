SELECT 
    g.id AS group_id,
    g.caption AS group_name,

    n.id AS node_id,
    n.caption AS node_name,

    ns.color AS node_status_color,
    ns.description AS node_status_description,

    i.id AS interface_id,
    i.caption AS interface_name,

    istatus.color AS interface_status_color,
    istatus.description AS interface_status_description,

    a.id AS application_id,
    a.caption AS application_name,

    u.id AS admin_id,
    u.firstname || ' ' || u.lastname AS admin_name,
    u.email AS admin_email

FROM groups g

-- Связываем таблицы: группы с нодами
LEFT JOIN groups_nodes gn ON gn.group_id = g.id
LEFT JOIN nodes n ON n.id = gn.node_id

-- Статус ноды
LEFT JOIN statuses ns ON ns.id = n.status

-- Информация о интерфейсах
LEFT JOIN interfaces i ON i.id = n.interface
LEFT JOIN statuses istatus ON istatus.id = i.status  -- Статус интерфейса

-- Приложения для ноды
LEFT JOIN nodes_applications na ON na.node_id = n.id
LEFT JOIN applications a ON a.id = na.application_id

-- Информация об администраторах
LEFT JOIN users u ON u.id = n.admin

ORDER BY g.id, n.id, i.id, a.id;