import React from 'react';
import { StoryObj, Meta } from '@storybook/react-webpack5';
import Icon, { IconProps } from './icon';
import { library, IconProp } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// 初始化Font Awesome图标库
library.add(fas);

// 定义meta配置
const meta: Meta<IconProps> = {
    title: 'Component/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
        theme: {
            control: {
                type: 'select',
                options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
            },
            description: '图标主题颜色'
        },
        icon: {
            control: {
                type: 'text'
            },
            description: 'Font Awesome图标名称'
        },
        size: {
            control: {
                type: 'select',
                options: ['xs', 'sm', 'lg', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x']
            },
            description: '图标大小'
        }
    },
    parameters: {
        docs: {
            description: {
                component: '图标组件，基于Font Awesome实现，支持多种主题颜色和尺寸。'
            }
        }
    },
    args: {
        icon: 'check',
        size: '1x'
    }
};

export default meta;

type IconStory = StoryObj<IconProps>;

// 默认图标
export const Default: IconStory = {
    args: {
        icon: 'check',
        size: '2x'
    },
    parameters: {
        docs: {
            description: {
                story: '默认图标示例'
            }
        }
    }
};

// 主题颜色图标 - 主要颜色
export const Primary: IconStory = {
    args: {
        icon: 'star',
        theme: 'primary',
        size: '2x'
    },
    parameters: {
        docs: {
            description: {
                story: '主要颜色主题的图标'
            }
        }
    }
};

// 主题颜色图标 - 成功颜色
export const Success: IconStory = {
    args: {
        icon: 'check-circle',
        theme: 'success',
        size: '2x'
    }
};

// 主题颜色图标 - 警告颜色
export const Warning: IconStory = {
    args: {
        icon: 'exclamation-triangle',
        theme: 'warning',
        size: '2x'
    }
};

// 主题颜色图标 - 危险颜色
export const Danger: IconStory = {
    args: {
        icon: 'times-circle',
        theme: 'danger',
        size: '2x'
    }
};

// 不同尺寸的图标
export const DifferentSizes: IconStory = {
    render: (args: IconProps) => (
        // 还可以写行内样式
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Icon icon="home" size="xs" />
            <Icon icon="home" size="sm" />
            <Icon icon="home" size="1x" />
            <Icon icon="home" size="lg" />
            <Icon icon="home" size="2x" />
            <Icon icon="home" size="3x" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '不同尺寸的图标示例'
            }
        }
    }
};

// 常用图标集合
export const CommonIcons: IconStory = {
    render: (args: IconProps) => {
        // 定义常用图标映射，确保类型安全
        const iconMap: Record<string, IconProp> = {
            'user': 'user' as IconProp,
            'cog': 'cog' as IconProp,
            'search': 'search' as IconProp,
            'trash': 'trash' as IconProp,
            'edit': 'edit' as IconProp,
            'plus': 'plus' as IconProp,
            'minus': 'minus' as IconProp,
            'save': 'save' as IconProp,
            'lock': 'lock' as IconProp,
            'unlock': 'unlock' as IconProp
        };

        const icons = [
            { name: '用户', icon: 'user' },
            { name: '设置', icon: 'cog' },
            { name: '搜索', icon: 'search' },
            { name: '删除', icon: 'trash' },
            { name: '编辑', icon: 'edit' },
            { name: '添加', icon: 'plus' },
            { name: '减号', icon: 'minus' },
            { name: '保存', icon: 'save' },
            { name: '锁定', icon: 'lock' },
            { name: '解锁', icon: 'unlock' }
        ];

        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', textAlign: 'center' }}>
                {icons.map((item) => (
                    <div key={item.icon}>
                        <Icon icon={iconMap[item.icon]} size="2x" theme="primary" />
                        <div style={{ marginTop: '8px', fontSize: '12px' }}>{item.name}</div>
                    </div>
                ))}
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: '常用图标的集合展示'
            }
        }
    }
};