import type { Meta, StoryObj } from '@storybook/react-webpack5'
import React from 'react'
import Button from './Button'
import { within, userEvent } from '@storybook/testing-library'

const meta = {
    title: 'Component/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
导入示例：

\`\`\`tsx
import Button from './components/Button/Button'
\`\`\`
                `
            }
        }
    },
    argTypes: {
        btnType: {
            control: { type: 'select', options: ['primary', 'default', 'danger', 'link'] },
            description: '按钮的类型',
        },
        size: {
            control: { type: 'select', options: ['sm', 'lg'] },
            description: '按钮的大小',
        },
        disabled: {
            control: 'boolean',
            description: '按钮是否禁用',
        },
        onClick: {
            action: 'clicked',
            description: '按钮点击事件',
        },
    },
    args: {
        children: 'Button',
        btnType: 'primary',
        size: 'sm',
        disabled: false,
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const ButtonStory: Story = {
    args: {},
}

// ...existing code...
export const Primary: Story = {
    args: { btnType: "default", size: 'lg' },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        // 故意查不存在的文本以触发“未找到”
        const btn = canvas.queryByText('Nonexistent Button')
        console.log('query result:', btn)
        if (!btn) {
            // 在浏览器控制台打印并抛错，Interactions 面板会显示失败
            console.error('Button not found')
            throw new Error('Button not found')
        }
        await userEvent.click(btn)
    },
}

export const Default: Story = {
    args: { btnType: 'default' },
}

export const Danger: Story = {
    args: { btnType: 'danger' },
}

export const Link: Story = {
    args: { btnType: 'link' },
}

export const DifferentSizes: Story = {
    parameters: {
        docs: {
            description: {
                story: '展示不同大小的按钮',
            },
        },
    },
    render: (args) => (
        <>
            <Button {...args} size="sm">Small Button</Button>
            <Button {...args} size="lg">Large Button</Button>
        </>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const small = await canvas.getByText('Small Button')
        const large = await canvas.getByText('Large Button')
        if (!small) throw new Error('Small Button not found')
        if (!large) throw new Error('Large Button not found')
        await userEvent.click(small)
        await userEvent.click(large)
    },
}

export const Disabled: Story = {
    args: { disabled: true },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const btn = await canvas.getByText('Button')
        if (!btn) throw new Error('Button not found')
        // 检查是否被禁用
        if (!(btn as HTMLButtonElement).disabled) throw new Error('Button should be disabled')
        await userEvent.click(btn)
    },
}