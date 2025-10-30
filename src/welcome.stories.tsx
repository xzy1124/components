import React from 'react';

// 现代Storybook使用默认导出和命名导出的方式
// 不再需要storiesOf函数

export default {
    title: 'Welcome', // 这将显示在Storybook侧边栏中
    parameters: {
        // 禁用自动生成的info面板
        controls: {
            disable: true,
        },
        // 可以添加其他配置，如布局等
        layout: 'fullscreen',
    },
};

// 创建欢迎页面组件
const WelcomePage = () => (
    <div style={{
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        lineHeight: '1.6',
    }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ color: '#333', fontSize: '2.5rem', marginBottom: '20px' }}>
                欢迎使用 my-design 组件库
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
                my-design 是一套精心设计的React组件库，提供丰富的UI组件和交互体验
            </p>
        </div>

        <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '15px' }}>
                🚀 快速开始
            </h2>
            <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '1.2rem' }}>安装</h3>
                <pre style={{ backgroundColor: '#333', color: '#fff', padding: '15px', borderRadius: '4px', overflowX: 'auto' }}>
                    <code>npm install my-design --save</code>
                </pre>
            </div>

            <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '20px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '1.2rem' }}>引入样式</h3>
                <pre style={{ backgroundColor: '#333', color: '#fff', padding: '15px', borderRadius: '4px', overflowX: 'auto' }}>
                    <code>{`// 在你的入口文件中
import 'my-design/dist/index.css';`}</code>
                </pre>
            </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '15px' }}>
                💡 使用示例
            </h2>
            <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '20px' }}>
                <pre style={{ backgroundColor: '#333', color: '#fff', padding: '15px', borderRadius: '4px', overflowX: 'auto' }}>
                    <code>{`import React from 'react';
import { Button, Alert, Menu } from 'my-design';

function App() {
  return (
    <div>
      <Button type="primary">点击我</Button>
      <Alert message="提示信息" type="success" />
      {/* 更多组件使用 */}
    </div>
  );
}`}</code>
                </pre>
            </div>
        </section>

        <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '15px' }}>
                📚 文档导航
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#1e40af' }}>基础组件</h3>
                    <p>按钮、输入框、标签等基础UI元素</p>
                </div>
                <div style={{ backgroundColor: '#f0fff4', padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#065f46' }}>布局组件</h3>
                    <p>栅格、布局、间距等页面结构组件</p>
                </div>
                <div style={{ backgroundColor: '#fff7ed', padding: '20px', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0, color: '#9a3412' }}>反馈组件</h3>
                    <p>对话框、提示、通知等交互反馈</p>
                </div>
            </div>
        </section>

        <footer style={{ textAlign: 'center', color: '#888', marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <p>&copy; {new Date().getFullYear()} my-design 组件库</p>
        </footer>
    </div>
);

// 导出一个默认的story
// 这相当于原来的.add('welcome', ...)
export const Welcome = () => <WelcomePage />;