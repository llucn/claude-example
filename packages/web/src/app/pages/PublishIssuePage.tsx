import { useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
} from 'antd';
import { apiClient } from '../auth/api-client';
import { BaiduMapPicker } from '../components/BaiduMapPicker';

const { TextArea } = Input;

interface IssueFormValues {
  title: string;
  description: string;
  location: { longitude: number; latitude: number };
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
      const { location, ...rest } = values;
      const payload = {
        ...rest,
        longitude: location.longitude,
        latitude: location.latitude,
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
      <div className="page-header">
        <h1 className="page-title">发布事件</h1>
      </div>
      <div className="card" style={{ maxWidth: 700 }}>
        <div className="card-body">
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

            <Form.Item
              name="location"
              label="位置"
              rules={[{ required: true, message: '请在地图上选择位置' }]}
            >
              <BaiduMapPicker />
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
              <Input type="number" placeholder="请输入招募人数（选填）" style={{ width: '100%' }} />
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
        </div>
      </div>
    </div>
  );
}
