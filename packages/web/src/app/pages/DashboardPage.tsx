import { DashboardGrid } from '../dashboard/DashboardGrid';
import { SystemInfoCard } from '../dashboard/cards/SystemInfoCard';
import { IssueCountCard } from '../dashboard/cards/IssueCountCard';
import { useDashboardLayout, type CardDef } from '../dashboard/useDashboardLayout';
import '../dashboard/dashboard.css';

const CARD_DEFS: CardDef[] = [
  { id: 'system-info', title: '系统信息', defaultSpan: 12 },
  { id: 'issue-count', title: '事件数量', defaultSpan: 12 },
];

const CARD_CONTENT: Record<string, React.ReactNode> = {
  'system-info': <SystemInfoCard />,
  'issue-count': <IssueCountCard />,
};

export function DashboardPage() {
  const { layout, reorder, cycleSpan } = useDashboardLayout(CARD_DEFS);

  const cards = CARD_DEFS.map((def) => ({
    id: def.id,
    title: def.title,
    content: CARD_CONTENT[def.id],
  }));

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>
      <DashboardGrid
        cards={cards}
        order={layout.order}
        spans={layout.spans}
        onReorder={reorder}
        onResizeCard={cycleSpan}
      />
    </div>
  );
}
