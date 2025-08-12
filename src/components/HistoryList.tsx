import React from 'react';
import { Card, List, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useWeatherStore } from '../stores/useWeatherStore';

const { Title, Text } = Typography;

export const HistoryList: React.FC = () => {
  const { history } = useWeatherStore();
  console.log('history : ', history)
  if (!history.length) return null;
  return (
    <Card className="mt-6 max-w-3xl mx-auto" size="small">
      <div className="flex items-center justify-between">
        <Title level={5} className="m-0">Recent searches</Title>
        <Text type="secondary"><ClockCircleOutlined /> &nbsp;Last {history.length}</Text>
      </div>
      <List size="small" dataSource={history} renderItem={(item) => <List.Item>{item}</List.Item>} />
    </Card>
  );
};