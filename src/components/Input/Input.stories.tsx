import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react-webpack5'
import Input, { InputProps } from './input'
import Icon from '../Icon/icon'

// 为Storybook定义组件元数据
const InputMeta: Meta<InputProps> = {
    title: 'Component/Input',
    component: Input,
    argTypes: {
        disabled: {
            control: 'boolean',
            description: '是否禁用输入框'
        },
        size: {
            control: {
                type: 'select',
                options: ['lg', 'sm', undefined]
            },
            description: '输入框尺寸'
        },
        icon: {
            control: 'text',
            description: '输入框内的图标'
        },
        prepend: {
            control: 'text',
            description: '输入框前置内容'
        },
        append: {
            control: 'text',
            description: '输入框后置内容'
        },
        placeholder: {
            control: 'text',
            description: '占位文本'
        }
    },
    parameters: {
        docs: {
            description: {
                component: '表单输入组件，支持图标、前后置内容、不同尺寸和禁用状态'
            }
        }
    }
}

export default InputMeta

// 使用StoryObj类型替代原来的Story类型
type InputStory = StoryObj<InputProps>

// 基础输入框故事
export const Default: InputStory = {
    args: {
        placeholder: '请输入内容'
    },
    parameters: {
        docs: {
            description: {
                story: '基本的输入框，带有占位符文本'
            }
        }
    }
}

// 不同尺寸的输入框故事
export const SizeVariants: InputStory = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input size="lg" placeholder="大号输入框" />
            <Input placeholder="默认尺寸输入框" />
            <Input size="sm" placeholder="小号输入框" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '展示不同尺寸的输入框'
            }
        }
    }
}

// 禁用状态的输入框故事
export const Disabled: InputStory = {
    args: {
        placeholder: '禁用的输入框',
        disabled: true
    },
    parameters: {
        docs: {
            description: {
                story: '禁用状态的输入框'
            }
        }
    }
}

// 带图标的输入框故事
export const WithIcon: InputStory = {
    args: {
        placeholder: '带图标的输入框',
        icon: 'search'
    },
    parameters: {
        docs: {
            description: {
                story: '带有前缀图标的输入框'
            }
        }
    }
}

// 带前置内容的输入框故事
export const WithPrepend: InputStory = {
    // 这里渲染ui组件一定要把我们想要交互的args传进来,不传控制不了哦
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input prepend="https://" placeholder="请输入网址" {...args} />
            <Input prepend={<Icon icon="user" />} placeholder="用户名" {...args} />
        </div>
    ),
    args: {
        disabled: false,
    },
    parameters: {
        docs: {
            description: {
                story: '带有前置文本或组件的输入框'
            }
        }
    }
}

// 带后置内容的输入框故事
export const WithAppend: InputStory = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input append=".com" placeholder="请输入域名" {...args} />
            <Input append=".cn" placeholder="请输入中文域名" {...args} />
        </div>
    ),
    args: {
        disabled: false,
        icon: "times",

        // append: "我做主"
        prepend: "我的组件",

        placeholder: "",
        append: "ssss"
    },
    parameters: {
        docs: {
            description: {
                story: '带有后置文本的输入框'
            }
        }
    }
}

// 组合使用的输入框故事
export const Combined: InputStory = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Input
                size="lg"
                icon="search"
                placeholder="搜索内容"
            />
            <Input
                prepend="@"
                append=".com"
                placeholder="邮箱账号"
            />
            <Input
                size="sm"
                disabled
                prepend="https://"
                append=".org"
                placeholder="禁用的组合输入框"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '组合使用多个属性的输入框'
            }
        }
    }
}

// 带状态管理的输入框故事
export const ControlledInput: InputStory = {
    render: () => {
        const [value, setValue] = useState('')

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="带状态管理的输入框"
                />
                <div style={{ fontSize: '14px', color: '#666' }}>
                    当前输入值: {value || '空'}
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: '带有状态管理的受控输入框组件'
            }
        }
    }
}