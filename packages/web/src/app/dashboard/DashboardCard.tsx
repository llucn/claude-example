import type { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HolderOutlined, ColumnWidthOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import type { ColSpan } from './useDashboardLayout';

const spanLabels: Record<ColSpan, string> = {
  6: '1/4',
  12: '1/2',
  24: '全宽',
};

interface DashboardCardProps {
  id: string;
  title: string;
  colSpan: ColSpan;
  onResizeClick: () => void;
  children: ReactNode;
}

export function DashboardCard({ id, title, colSpan, onResizeClick, children }: DashboardCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    height: '100%',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <span className="dashboard-card-drag-handle" {...attributes} {...listeners}>
            <HolderOutlined />
          </span>
          <span className="dashboard-card-title">{title}</span>
          <Tooltip title={`当前：${spanLabels[colSpan]}，点击切换宽度`}>
            <span className="dashboard-card-resize-handle" onClick={onResizeClick}>
              <ColumnWidthOutlined />
              <span className="dashboard-card-span-badge">{spanLabels[colSpan]}</span>
            </span>
          </Tooltip>
        </div>
        <div className="dashboard-card-body">{children}</div>
      </div>
    </div>
  );
}
