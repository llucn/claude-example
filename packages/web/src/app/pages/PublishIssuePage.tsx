import { useState } from 'react';
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Typography,
} from 'antd';
import { apiClient } from '../auth/api-client';

const { Title } = Typography;
const { TextArea } = Input;

interface IssueFormValues {
  title: string;
  description: string;
  longitude: number;
  latitude: number;
  address?: string;
  deadline: unknown;
  recruitCount?: number;
  skillRequirement?: string;
}

export function PublishIssuePage() {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: IssueFormValues) => {
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        deadline: (values.deadline as { toISOString: () => string }).toISOString(),
      };
      await apiClient.post('/issues', payload);
      message.success('事件发布成功');
      form.resetFields();
    } catch {
      message.error('发布失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Title level={3}>发布事件</Title>
      <Card style={{ maxWidth: 700 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="事件名称"
            rules={[{ required: true, message: '请输入事件名称' }]}
          >
            <Input placeholder="请输入事件名称" maxLength={200} />
          </Form.Item>

          <Form.Item
            name="description"
            label="事件描述"
            rules={[{ required: true, message: '请输入事件描述' }]}
          >
            <TextArea rows={4} placeholder="请输入事件描述" />
          </Form.Item>

          <Form.Item label="位置" required>
            <Input.Group compact>
              <Form.Item
                name="longitude"
                noStyle
                rules={[{ required: true, message: '请输入经度' }]}
              >
                <InputNumber
                  style={{ width: '50%' }}
                  placeholder="经度"
                  min={-180}
                  max={180}
                  step={0.0000001}
                />
              </Form.Item>
              <Form.Item
                name="latitude"
                noStyle
                rules={[{ required: true, message: '请输入纬度' }]}
              >
                <InputNumber
                  style={{ width: '50%' }}
                  placeholder="纬度"
                  min={-90}
                  max={90}
                  step={0.0000001}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item name="address" label="地址">
            <Input placeholder="请输入地址描述（选填）" maxLength={500} />
          </Form.Item>

          <Form.Item
            name="deadline"
            label="截止时间"
            rules={[{ required: true, message: '请选择截止时间' }]}
          >
            <DatePicker
              showTime
              style={{ width: '100%' }}
              placeholder="选择截止时间"
            />
          </Form.Item>

          <Form.Item name="recruitCount" label="招募人数">
            <InputNumber min={1} placeholder="请输入招募人数（选填）" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="skillRequirement" label="技能要求">
            <TextArea rows={2} placeholder="请输入技能要求（选填）" maxLength={500} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              发布
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
