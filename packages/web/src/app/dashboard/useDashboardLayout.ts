import { useState, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

export type ColSpan = 6 | 12 | 24;

export interface CardDef {
  id: string;
  title: string;
  defaultSpan: ColSpan;
}

interface StoredLayout {
  order: string[];
  spans: Record<string, ColSpan>;
}

const STORAGE_KEY = 'dashboard-layout';
const SPAN_CYCLE: ColSpan[] = [6, 12, 24];

function loadLayout(defaults: CardDef[]): StoredLayout {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredLayout;
  } catch {}
  return {
    order: defaults.map((c) => c.id),
    spans: Object.fromEntries(defaults.map((c) => [c.id, c.defaultSpan])),
  };
}

function saveLayout(layout: StoredLayout) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
}

export function useDashboardLayout(defaults: CardDef[]) {
  const [layout, setLayout] = useState<StoredLayout>(() => loadLayout(defaults));

  const reorder = useCallback((activeId: string, overId: string) => {
    setLayout((prev) => {
      const oldIndex = prev.order.indexOf(activeId);
      const newIndex = prev.order.indexOf(overId);
      const next = { ...prev, order: arrayMove(prev.order, oldIndex, newIndex) };
      saveLayout(next);
      return next;
    });
  }, []);

  const cycleSpan = useCallback((id: string) => {
    setLayout((prev) => {
      const current = (prev.spans[id] ?? 12) as ColSpan;
      const idx = SPAN_CYCLE.indexOf(current);
      const nextSpan = SPAN_CYCLE[(idx + 1) % SPAN_CYCLE.length];
      const next = { ...prev, spans: { ...prev.spans, [id]: nextSpan } };
      saveLayout(next);
      return next;
    });
  }, []);

  return { layout, reorder, cycleSpan };
}
