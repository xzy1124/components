import React from 'react';
import { StoryFn, Meta } from '@storybook/react-webpack5';
import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './subMenu';
import '../Icon/icon';

// 定义Meta配置
const meta: Meta = {
    title: 'Component/Menu', // 修改为复数形式，符合常见命名规范
    component: Menu,
    tags: ['autodocs'], // 添加autodocs标签自动生成文档
    argTypes: {
        mode: {
            control: {
                type: 'radio',
                options: ['horizontal', 'vertical'],
            },
            description: '菜单的显示模式，水平或垂直',
            table: {
                type: { summary: 'horizontal | vertical' },
                defaultValue: { summary: 'vertical' },
            },
        },
        index: {
            description: '当前选中菜单项的索引',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '0' },
            },
        },
        className: {
            description: '自定义类名',
            table: {
                type: { summary: 'string' },
            },
        },
        style: {
            description: '自定义样式',
            table: {
                type: { summary: 'React.CSSProperties' },
                defaultValue: { summary: '{}' },
            },
        },
        defaultOpenSubMenus: {
            control: {
                type: 'object',
            },
            description: '垂直模式下默认展开的子菜单索引数组',
            table: {
                type: { summary: 'string[]' },
                defaultValue: { summary: '[]' },
            },
        },
        onSelect: {
            action: 'selected',
            description: '选择菜单项时的回调函数',
            table: {
                type: { summary: '(selectedIndex: string) => void' },
            },
        },
        children: {
            description: '菜单项，应该是MenuItem或SubMenu组件',
            table: {
                type: { summary: 'React.ReactNode' },
            },
        },
    },
    args: {},
    // 添加组件级别文档
    parameters: {
        docs: {
            description: {
                component: 'Menu组件是一个功能丰富的导航菜单组件，支持水平和垂直两种显示模式，可以包含子菜单和多级嵌套菜单。',
            },
            // 添加使用示例代码
            source: {
                type: 'code',
            },
            // 添加组件属性表格
            table: {
                type: 'category',
                category: '导航组件',
            },
        },
    },
};

export default meta;
type Story = StoryFn<MenuProps>;

// 定义基础模板
const Template: Story = (args) => {
    return (
        <Menu {...args}>
            <MenuItem>首页</MenuItem>
            <MenuItem>产品</MenuItem>
            <MenuItem disabled>服务</MenuItem>
            <MenuItem>关于我们</MenuItem>
        </Menu>
    );
};

// 基础菜单示例
export const Default = Template.bind({});
Default.args = {
    mode: 'horizontal',
};
Default.parameters = {
    docs: {
        description: {
            story: '默认水平菜单，展示基础菜单项和禁用状态',
        },
        // 添加故事级别的源码展示
        source: {
            code: `<Menu mode="horizontal">
  <MenuItem>首页</MenuItem>
  <MenuItem>产品</MenuItem>
  <MenuItem disabled>服务</MenuItem>
  <MenuItem>关于我们</MenuItem>
</Menu>`,
        },
    },
};

// 垂直菜单示例
export const Vertical = Template.bind({});
Vertical.args = {
    mode: 'vertical',
    style: {
        width: '200px',
    },
};
Vertical.parameters = {
    docs: {
        description: {
            story: '垂直菜单，可设置宽度',
        },
        source: {
            code: `<Menu mode="vertical" style={{ width: '200px' }}>
  <MenuItem>首页</MenuItem>
  <MenuItem>产品</MenuItem>
  <MenuItem>服务</MenuItem>
  <MenuItem>关于我们</MenuItem>
</Menu>`,
        },
    },
};

// 带默认选中项的菜单
export const WithSelectedItem = () => {
    const [selectedIndex, setSelectedIndex] = React.useState('1');

    const handleSelect = (index: string) => {
        setSelectedIndex(index);
    };

    return (
        <Menu mode="horizontal" onSelect={handleSelect} index={selectedIndex}>
            <MenuItem>首页</MenuItem>
            <MenuItem>产品</MenuItem>
            <MenuItem>服务</MenuItem>
            <MenuItem>关于我们</MenuItem>
        </Menu>
    );
};
WithSelectedItem.parameters = {
    docs: {
        description: {
            story: '带有默认选中项和选择回调的菜单，可实现状态管理',
        },
        source: {
            code: `const [selectedIndex, setSelectedIndex] = React.useState('1');

const handleSelect = (index: string) => {
  setSelectedIndex(index);
};

<Menu mode="horizontal" onSelect={handleSelect} index={selectedIndex}>
  <MenuItem>首页</MenuItem>
  <MenuItem>产品</MenuItem>
  <MenuItem>服务</MenuItem>
  <MenuItem>关于我们</MenuItem>
</Menu>`,
        },
    },
};

// 带下拉子菜单的菜单
export const WithSubMenu = () => {
    return (
        <Menu mode="horizontal">
            <MenuItem>首页</MenuItem>
            <SubMenu title="产品">
                <MenuItem>产品列表</MenuItem>
                <MenuItem>产品详情</MenuItem>
                <MenuItem>新品上市</MenuItem>
            </SubMenu>
            <SubMenu title="服务">
                <MenuItem>技术支持</MenuItem>
                <MenuItem>售后服务</MenuItem>
                <MenuItem>服务条款</MenuItem>
            </SubMenu>
            <MenuItem>关于我们</MenuItem>
        </Menu>
    );
};
WithSubMenu.parameters = {
    docs: {
        description: {
            story: '带有下拉子菜单的水平菜单，支持多级导航结构',
        },
        source: {
            code: `<Menu mode="horizontal">
  <MenuItem>首页</MenuItem>
  <SubMenu title="产品">
    <MenuItem>产品列表</MenuItem>
    <MenuItem>产品详情</MenuItem>
    <MenuItem>新品上市</MenuItem>
  </SubMenu>
  <SubMenu title="服务">
    <MenuItem>技术支持</MenuItem>
    <MenuItem>售后服务</MenuItem>
    <MenuItem>服务条款</MenuItem>
  </SubMenu>
  <MenuItem>关于我们</MenuItem>
</Menu>`,
        },
    },
};

// 垂直带默认展开子菜单的菜单
export const VerticalWithDefaultOpenSubMenu = () => {
    return (
        <Menu
            mode="vertical"
            defaultOpenSubMenus={['1']}
            style={{ width: '200px' }}
        >
            <MenuItem>首页</MenuItem>
            <SubMenu title="产品">
                <MenuItem>产品列表</MenuItem>
                <MenuItem>产品详情</MenuItem>
                <MenuItem>新品上市</MenuItem>
            </SubMenu>
            <SubMenu title="服务">
                <MenuItem>技术支持</MenuItem>
                <MenuItem>售后服务</MenuItem>
                <MenuItem>服务条款</MenuItem>
            </SubMenu>
            <MenuItem>关于我们</MenuItem>
        </Menu>
    );
};
VerticalWithDefaultOpenSubMenu.parameters = {
    docs: {
        description: {
            story: '垂直菜单，带有默认展开的子菜单，适用于侧边栏导航',
        },
        source: {
            code: `<Menu
  mode="vertical"
  defaultOpenSubMenus={['1']}
  style={{ width: '200px' }}
>
  <MenuItem>首页</MenuItem>
  <SubMenu title="产品">
    <MenuItem>产品列表</MenuItem>
    <MenuItem>产品详情</MenuItem>
    <MenuItem>新品上市</MenuItem>
  </SubMenu>
  <SubMenu title="服务">
    <MenuItem>技术支持</MenuItem>
    <MenuItem>售后服务</MenuItem>
    <MenuItem>服务条款</MenuItem>
  </SubMenu>
  <MenuItem>关于我们</MenuItem>
</Menu>`,
        },
    },
};

// 复杂嵌套菜单示例
export const NestedSubMenu = () => {
    return (
        <Menu
            mode="vertical"
            style={{ width: '200px' }}
        >
            <MenuItem>首页</MenuItem>
            <SubMenu title="产品">
                <MenuItem>产品列表</MenuItem>
                <SubMenu title="分类">
                    <MenuItem>手机</MenuItem>
                    <MenuItem>电脑</MenuItem>
                    <MenuItem>配件</MenuItem>
                </SubMenu>
                <MenuItem>新品上市</MenuItem>
            </SubMenu>
            <SubMenu title="服务">
                <MenuItem>技术支持</MenuItem>
                <MenuItem>售后服务</MenuItem>
                <MenuItem>服务条款</MenuItem>
            </SubMenu>
            <MenuItem>关于我们</MenuItem>
        </Menu>
    );
};
NestedSubMenu.parameters = {
    docs: {
        description: {
            story: '复杂嵌套菜单示例，展示多级子菜单结构',
        },
        source: {
            code: `<Menu
  mode="vertical"
  style={{ width: '200px' }}
>
  <MenuItem>首页</MenuItem>
  <SubMenu title="产品">
    <MenuItem>产品列表</MenuItem>
    <SubMenu title="分类">
      <MenuItem>手机</MenuItem>
      <MenuItem>电脑</MenuItem>
      <MenuItem>配件</MenuItem>
    </SubMenu>
    <MenuItem>新品上市</MenuItem>
  </SubMenu>
  <SubMenu title="服务">
    <MenuItem>技术支持</MenuItem>
    <MenuItem>售后服务</MenuItem>
    <MenuItem>服务条款</MenuItem>
  </SubMenu>
  <MenuItem>关于我们</MenuItem>
</Menu>`,
        },
    },
};