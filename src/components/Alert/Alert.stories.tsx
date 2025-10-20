import type {Meta, StoryObj} from '@storybook/react-webpack5'
import Alert from './Alert'
import { useState } from 'react'
const meta = {
    title: 'Component/Alert',
    component: Alert,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
导入示例：

\`\`\`tsx
import Alert from './components/Alert/Alert'
\`\`\`
                `
            }
        }
    },
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['success', 'default', 'warning', 'danger'],
            },
            description: '警告框的类型',
        },
        title: {
            control: 'text',
            description: '警告框的标题',
        },
        description: {
            control: 'text',
            description: '警告框的描述',
        },
        closable: {
            control: 'boolean',
            description: '是否显示关闭图标',
        },
        onClose: {
            action: 'onClose',
            description: '关闭警告框时触发的回调函数',
        }
    },
    args: {
        // 设置一些默认值
        title: '提示标题子言言',
        description: '这是子言自己写的故事',
        onClose: () => {},
        closable: true,
        type: 'danger'
    }
} satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
    args: {
        title: '默认',
        description: '这是一个默认的提示',
        type: 'default',
    }
};
export const Success: Story = {
    args: {
        title: '成功',
        description: '已经成功了',
        type: 'success',
    }
};

// 警告提示
export const Warning: Story = {
    args: {
        title: '警告提示',
        description: '请注意操作风险',
        type: 'warning',
    },
};

// 危险提示
export const Danger: Story = {
    args: {
        title: '错误提示',
        description: '操作失败，请重试',
        type: 'danger',
    },
};
// 不带标题的提示
export const NoTitle: Story = {
    args: {
        description: '这是一个没有标题的提示信息',
        type: 'default',
    },
    parameters: {
        docs: {
            description: {
                story: '不带标题的警告框',
            },
        },
    },
};

// 不可关闭的提示
export const NotClosable: Story = {
    args: {
        title: '不可关闭的提示',
        description: '这个提示无法关闭',
        closable: false,
        type: 'default',
    },
    parameters: {
        docs: {
            description: {
                story: '不可关闭的警告框',
            },
        },
    },
};
// 使用children内容的提示
export const WithChildren: Story = {
    args: {
        title: '带自定义内容的提示',
        type: 'success',
        description: 'enen'
    },
    render: (args) => (
        <Alert {...args}>
            <div>
                <p>这是通过children传入的自定义内容</p>
                <ul>
                    <li>可以包含任意React元素</li>
                    <li>支持复杂的布局结构</li>
                </ul>
            </div>
        </Alert>
    ),
    parameters: {
        docs: {
            description: {
                story: '使用children属性自定义内容的警告框',
            },
        },
    },
};
// 展示所有类型的提示
export const AllTypes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <Alert
                title="成功提示"
                description="操作已成功完成"
                type="success"
                closable={true}
                onClose={() => { }}
            />
            <Alert
                title="默认提示"
                description="这是一个默认的提示信息"
                type="default"
                closable={true}
                onClose={() => { }}
            />
            <Alert
                title="警告提示"
                description="请注意操作风险"
                type="warning"
                closable={true}
                onClose={() => { }}
            />
            <Alert
                title="错误提示"
                description="操作失败，请重试"
                type="danger"
                closable={true}
                onClose={() => { }}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '同时展示所有类型的警告框',
            },
        },
    },
};
export const ClosableAlert: Story = {
    parameters: {
        docs: {
            description: {
                story: '点击关闭按钮后组件会消失的警告框',
            },
        },
    },
    render: (args) => {
        const [visible, setVisible] = useState(true);

        // 实现真正的onClose函数，更新状态使组件消失
        const handleClose = () => {
            // 调用原始的onClose action记录事件
            args.onClose();
            // 更新状态，使组件从DOM中移除
            setVisible(false);
        };

        // 根据visible状态条件渲染Alert组件
        return visible ? (
            <Alert {...args} onClose={handleClose} />
        ) : (
            <div style={{ padding: '20px', color: '#666' }}>
                警告框已关闭
            </div>
        );
    },
};