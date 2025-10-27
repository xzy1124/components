import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { Upload } from './upload';
import { UploadFile } from './upload';
import uploadList from './uploadList';
import Icon from '../Icon/icon';

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
        beforeUpload: {
            description: '上传前的钩子函数，返回false可以阻止上传；如果返回Promise，等待其resolve后再上传',
            table: {
                type: { summary: '(file: File) => boolean | Promise<File>' },
            },
        },
        onChange: {
            action: 'uploadChange',
            description: '上传完成后调用的回调函数，用于通知父组件上传结果',
            table: {
                type: { summary: '(file: File) => void' },
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

// 默认文件列表数据 - 包含各种状态的文件
const defaultFileListData: UploadFile[] = [
    {
        uid: '1',
        name: 'document.pdf',
        status: 'success',
        percent: 100,
        size: 2097152, // 2MB
    },
    {
        uid: '2',
        name: 'image.jpg',
        status: 'error',
        percent: 0,
        size: 1048576, // 1MB
        error: '上传失败，请重试',
    },
    {
        uid: '3',
        name: 'video.mp4',
        status: 'uploading',
        percent: 65,
        size: 10485760, // 10MB
    },
    {
        uid: '4',
        name: 'presentation.pptx',
        status: 'ready',
        percent: 0,
        size: 5242880, // 5MB
    },
    {
        uid: '5',
        name: 'archive.zip',
        status: 'success',
        percent: 100,
        size: 20971520, // 20MB
    },
];
// 基本上传故事
export const Default: Story = {
    args: {
        // 可以在这里覆盖默认参数
        defaultFileList: defaultFileListData,
        action: 'https://jsonplaceholder.typicode.com/posts',
            // 这里是新增的http请求数据
        name: 'my-file',
        header: {
            'XZY-Authorization': 'Bearer ziyan-token',
        },
        data: {
            'username': 'xvziyan',
        },
        withCredentials: true,
        accept: '.jpg, .png',
        multiple: true,
        drag: true,
    },
    parameters: {
        docs: {
            description: {
                story: '基本的文件上传组件，点击按钮选择文件后自动上传',
            },
        },
    },
    render: (args) => {
        return (
            <>
                <Upload {...args} >
                    <Icon icon="upload" size="5x" theme="secondary" />
                    <br />
                    <p>Drag file over to upload</p>
                </Upload>
            </>
        )
    }
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
// 添加文件大小验证的上传故事
export const WithFileSizeValidation: Story = {
    args: {
        action: 'https://jsonplaceholder.typicode.com/posts',
        // 实现成功
        onSuccess:fn(),
        // 实现失败
        onError:fn(),
        // 实现上传大小校验
        beforeUpload: (file: File) => {
            const maxSize = 50 * 1024
            if (file.size > maxSize) {
                alert('文件大小超过50KB，无法上传')
                return false
            }
            return true
        }
    },
    parameters: {
        docs: {
            description: {
                story: '使用beforeUpload，是直接在这里定义实现函数的，进行大小验证'
            }
        }
    }
}
// 添加异步处理的上传故事
export const WithAsyncBeforeUpload: Story = {
    args: {
        action: 'https://jsonplaceholder.typicode.com/posts',
        onSuccess:fn(),
        onError:fn(),
        // 实现校验结果返回是异步对象的时候，可以在then中上传之前重命名文件
        beforeUpload: (file: File) => {
            const newFile = new File([file], 'ziyan_name.jpg', {type: file.type})
            // 直接让promise使用resolve方法去处理，返回新的文件对象
            return Promise.resolve(newFile)
        }
    },
    parameters: {
        docs: {
            description: {
                story: '使用beforeUpload，返回异步对象可以在then中处理，比如重命名文件'
            }
        }
    }
}
// 测试onChange回调，也就是上传完成后我们父组件能知道，我们能拿到文件名称打印出来看看
export const WithOnChangeTracking: Story = {
    args:{
        action: 'https://jsonplaceholder.typicode.com/posts',
        onChange: fn((file) => {
            console.log('上传完成:', file.name, file.size);
        })
    },
    render: (args) => (
        <>
        {/* 这里渲染一个Upload组件 */}
            <Upload {...args} />
            <div style={{ marginTop: '20px' }}>
                <h4>查看Actions面板或控制台，观察onChange调用情况</h4>
            </div>
        </>
    ),   
}
// 带组件的模板拖拽故事
export const WithDraggerTemplate: Story = {
    args: {
        action: 'https://jsonplaceholder.typicode.com/posts',
        onChange: fn(),
        onRemove: fn(),
        name: 'fileName',
        drag: true,
    },
    render: (args) => (
        <>
        {/* 这里渲染一个Upload组件 */}
            <Upload {...args} >
                <Icon icon="upload" size="5x" theme="secondary" />
                <br />
                <p>Drag file over to upload</p>
            </Upload>

        </>
    ),   
}