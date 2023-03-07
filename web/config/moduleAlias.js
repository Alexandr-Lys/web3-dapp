const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
  react: path.resolve(root, 'node_modules', 'react'),
  'react-router-dom': path.resolve(root, 'node_modules', 'react-router-dom'),
  'react-router': path.resolve(root, 'node_modules', 'react-router'),
  antd: path.resolve(root, 'node_modules', 'antd'),
  // '@ant-design/icons': path.resolve(root, 'node_modules', '@ant-design/icons'),
};
