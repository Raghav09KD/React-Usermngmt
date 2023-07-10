import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

function Navigation() {
  return (
    <div style={styles.container}>
      <Title level={3} style={styles.heading}>Admin Panel</Title>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'left',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '10px',
  },
  heading: {
    margin: 0,
  },
};

export default Navigation;
