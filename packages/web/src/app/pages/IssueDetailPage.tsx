import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Descriptions, Typography, message } from 'antd';
import { fetchIssueById, type Issue } from '../auth/api-client';
import { BaiduMapView } from '../components/BaiduMapView';

const { Title } = Typography;

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

  if (!loading && notFound) {
    return (
      <div>
        <Title level={3}>事件不存在</Title>
        <Button onClick={() => navigate('/issues')}>返回列表</Button>
      </div>
    );
  }

  return (
    <div>
      <Title level={3}>事件详情</Title>
      <Descriptions bordered loading={loading} column={1}>
        <Descriptions.Item label="ID">{issue?.id}</Descriptions.Item>
        <Descriptions.Item label="事件名称">{issue?.title}</Descriptions.Item>
        <Descriptions.Item label="事件描述">{issue?.description}</Descriptions.Item>
        <Descriptions.Item label="地址">{issue?.address ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="截止时间">
          {issue?.deadline ? new Date(issue.deadline).toLocaleString() : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="招募人数">{issue?.recruitCount ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="技能要求">{issue?.skillRequirement ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="发布者">{issue?.createdBy}</Descriptions.Item>
        <Descriptions.Item label="发布时间">
          {issue?.createdAt ? new Date(issue.createdAt).toLocaleString() : '-'}
        </Descriptions.Item>
      </Descriptions>
      {issue && (
        <div style={{ marginTop: 24 }}>
          <BaiduMapView longitude={issue.longitude} latitude={issue.latitude} />
        </div>
      )}
      <Button style={{ marginTop: 16 }} onClick={() => navigate('/issues')}>
        返回列表
      </Button>
    </div>
  );
}
