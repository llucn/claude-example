import { Statistic } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

export function IssueCountCard() {
  return (
    <div className="issue-count-grid">
      <div className="issue-count-item">
        <Statistic
          title={
            <span>
              <ClockCircleOutlined style={{ marginRight: 6 }} />
              进行中
            </span>
          }
          value={5}
          valueStyle={{ color: '#1677ff', fontSize: 36, fontWeight: 700 }}
        />
      </div>
      <div className="issue-count-item">
        <Statistic
          title={
            <span>
              <CheckCircleOutlined style={{ marginRight: 6 }} />
              已完成
            </span>
          }
          value={42}
          valueStyle={{ color: '#52c41a', fontSize: 36, fontWeight: 700 }}
        />
      </div>
    </div>
  );
}
