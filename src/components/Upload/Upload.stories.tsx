import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { Upload } from './upload';

// 定义Meta数据
export default {
    title: 'Component/Upload',
    component: Upload,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Upload组件提供文件上传功能，支持进度跟踪、成功回调和错误处理',
            },
        },
    },
    argTypes: {
        action: {
            control: 'text',
            description: '文件上传的目标URL',
            table: {
                type: { summary: 'string' },
            },
        },
        onProgress: {
            action: 'uploadProgress',
            description: '上传进度变化时的回调函数',
            table: {
                type: { summary: '(percent: number, file: File) => void' },
            },
        },
        onSuccess: {
            action: 'uploadSuccess',
            description: '上传成功时的回调函数',
            table: {
                type: { summary: '(data: any, file: File) => void' },
            },
        },
        onError: {
            action: 'uploadError',
            description: '上传失败时的回调函数',
            table: {
                type: { summary: '(err: any, file: File) => void' },
            },
        },
    },
    args: {
        // 默认使用模拟API
        action: 'https://jsonplaceholder.typicode.com/posts',
        // 使用storybook的fn()来捕获和展示回调函数调用
        onProgress: fn(),
        onSuccess: fn(),
        onError: fn(),
    },
} as Meta<typeof Upload>;

// 定义Story类型
type Story = StoryObj<typeof Upload>;

// 基本上传故事
export const Default: Story = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: '基本的文件上传组件，点击按钮选择文件后自动上传',
            },
        },
    },
};

// 带进度跟踪的上传故事
export const WithProgressTracking: Story = {
    args: {
        // 可以在这里覆盖默认参数
    },
    parameters: {
        docs: {
            description: {
                story: '带有进度跟踪功能的上传组件，上传过程中会触发onProgress回调',
            },
        },
        // Mock上传进度，方便在Storybook中查看进度效果
        // 注意：这只是在Storybook中模拟进度，实际使用时需要后端配合
        mockProgress: true,
    },
};

// 错误处理故事
export const ErrorHandling: Story = {
    args: {
        // 使用一个不存在的URL来模拟上传失败
        action: 'https://this-is-a-non-existent-url-for-testing-error-handling.com',
    },
    parameters: {
        docs: {
            description: {
                story: '测试上传失败时的错误处理，使用不存在的URL模拟网络错误',
            },
        },
    },
};

// 自定义目标URL的上传故事
export const CustomUploadUrl: Story = {
    args: {
        action: 'https://your-custom-upload-endpoint.com/upload',
    },
    parameters: {
        docs: {
            description: {
                story: '使用自定义的上传目标URL',
            },
        },
    },
};

// 带自定义回调函数的上传故事
export const WithCustomCallbacks: Story = {
    args: {
        action: 'https://jsonplaceholder.typicode.com/posts',
        onProgress: (percent, file) => {
            // 这是显示在控制台的，不是actions面板
            console.log(`上传进度: ${percent}%`, file.name);
        },
        onSuccess: (data, file) => {
            console.log('上传成功:', data, '文件:', file.name);
        },
        onError: (err, file) => {
            console.error('上传失败:', err, '文件:', file.name);
        },
    },
    parameters: {
        docs: {
            description: {
                story: '使用自定义的回调函数处理上传事件',
            },
        },
    },
};