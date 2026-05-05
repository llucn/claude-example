import type { ReactNode } from 'react';
import { Row, Col } from 'antd';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { DashboardCard } from './DashboardCard';
import type { ColSpan } from './useDashboardLayout';

export interface CardConfig {
  id: string;
  title: string;
  content: ReactNode;
}

interface DashboardGridProps {
  cards: CardConfig[];
  order: string[];
  spans: Record<string, ColSpan>;
  onReorder: (activeId: string, overId: string) => void;
  onResizeCard: (id: string) => void;
}

export function DashboardGrid({ cards, order, spans, onReorder, onResizeCard }: DashboardGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const cardMap = Object.fromEntries(cards.map((c) => [c.id, c]));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorder(String(active.id), String(over.id));
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={order} strategy={rectSortingStrategy}>
        <Row gutter={[16, 16]}>
          {order.map((id) => {
            const card = cardMap[id];
            if (!card) return null;
            const span = (spans[id] ?? 12) as ColSpan;
            return (
              <Col key={id} span={span}>
                <DashboardCard
                  id={id}
                  title={card.title}
                  colSpan={span}
                  onResizeClick={() => onResizeCard(id)}
                >
                  {card.content}
                </DashboardCard>
              </Col>
            );
          })}
        </Row>
      </SortableContext>
    </DndContext>
  );
}
