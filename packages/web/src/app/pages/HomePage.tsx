import { Card, Descriptions, Typography } from 'antd';

const { Title } = Typography;

export function HomePage() {
  return (
    <div>
      <Title level={3}>系统信息</Title>
      <Card>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="系统名称">
            System Name
          </Descriptions.Item>
          <Descriptions.Item label="英文名称">
            English Name
          </Descriptions.Item>
          <Descriptions.Item label="组织">Organization Name</Descriptions.Item>
          <Descriptions.Item label="版本">1.0.0</Descriptions.Item>
          <Descriptions.Item label="技术栈">
            React + Vite + Ant Design + Spring Boot
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
