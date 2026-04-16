import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import { fetchIssueById, type Issue } from '../auth/api-client';
import { BaiduMapView } from '../components/BaiduMapView';

export function IssueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchIssueById(id)
      .then(setIssue)
      .catch((err) => {
        if (err?.response?.status === 404) {
          setNotFound(true);
        } else {
          message.error('加载事件详情失败');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">事件不存在</h1>
        </div>
        <Button onClick={() => navigate('/issues')}>返回列表</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">事件详情</h1>
        <Button onClick={() => navigate('/issues')}>返回列表</Button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="meta-grid">
            <div className="meta-item">
              <span className="meta-label">ID</span>
              <span className="meta-value">{issue?.id}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">事件名称</span>
              <span className="meta-value">{issue?.title}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">事件描述</span>
              <span className="meta-value">{issue?.description}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">地址</span>
              <span className="meta-value">{issue?.address ?? '-'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">截止时间</span>
              <span className="meta-value">
                {issue?.deadline ? new Date(issue.deadline).toLocaleString() : '-'}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">招募人数</span>
              <span className="meta-value">{issue?.recruitCount ?? '-'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">技能要求</span>
              <span className="meta-value">{issue?.skillRequirement ?? '-'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">发布者</span>
              <span className="meta-value">{issue?.createdBy}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">发布时间</span>
              <span className="meta-value">
                {issue?.createdAt ? new Date(issue.createdAt).toLocaleString() : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {issue && (
        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-head">
            <span className="card-head-title">位置</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <BaiduMapView longitude={issue.longitude} latitude={issue.latitude} />
          </div>
        </div>
      )}
    </div>
  );
}
