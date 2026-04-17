import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { fetchIssues, type Issue } from '../auth/api-client';

const columns: ColumnsType<Issue> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (id: number) => <Link to={`/issues/${id}`}>{id}</Link>,
    width: 80,
  },
  {
    title: '事件名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    render: (v?: string) => v ?? '-',
  },
  {
    title: '发布者',
    dataIndex: 'createdBy',
    key: 'createdBy',
  },
  {
    title: '发布时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (v: string) => new Date(v).toLocaleString(),
  },
];

export function IssueListPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues()
      .then(setIssues)
      .catch(() => message.error('加载事件列表失败'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">查看事件</h1>
      </div>
      <div className="card">
        <Table
          columns={columns}
          dataSource={issues}
          rowKey="id"
          loading={loading}
          style={{ background: 'transparent' }}
        />
      </div>
    </div>
  );
}
