import { Meta, StoryObj } from '@storybook/react-webpack5';
import AutoComplete, { AutoCompleteProps } from './autoComplete';

// 示例fetchSuggestions函数 - 城市列表
const cityFetchSuggestions = (value: string): string[] => {
    const cities = [
        '北京', '上海', '广州', '深圳', '杭州',
        '南京', '成都', '武汉', '西安', '重庆',
        '天津', '苏州', '长沙', '青岛', '郑州'
    ];

    if (!value) return [];

    return cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
    );
};

// 示例fetchSuggestions函数 - 编程语言
const languageFetchSuggestions = (value: string): string[] => {
    const languages = [
        'JavaScript', 'TypeScript', 'Python', 'Java', 'C++',
        'C#', 'Go', 'Rust', 'Swift', 'Kotlin',
        'PHP', 'Ruby', 'SQL', 'HTML', 'CSS'
    ];

    if (!value) return [];

    return languages.filter(lang =>
        lang.toLowerCase().includes(value.toLowerCase())
    );
};

// 异步示例fetchSuggestions函数
const asyncFetchSuggestions = (value: string): string[] => {
    // 注意：在实际Storybook中，我们返回模拟数据，而不是真实异步请求
    // 实际项目中这里应该是异步函数，但为了Storybook演示我们使用同步模拟
    const fruits = [
        'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
        'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'
    ];

    if (!value) return [];

    return fruits.filter(fruit =>
        fruit.toLowerCase().includes(value.toLowerCase())
    );
};

// 为Storybook定义组件元数据
const AutoCompleteMeta: Meta<AutoCompleteProps> = {
    title: 'Component/AutoComplete',
    component: AutoComplete,
    argTypes: {
        fetchSuggestions: {
            description: '获取建议列表的函数',
            type: { name: 'function', required: true }
        },
        onSelect: {
            description: '选择建议项时的回调函数',
            action: 'selected'
        },
        placeholder: {
            control: 'text',
            description: '占位文本'
        },
        disabled: {
            control: 'boolean',
            description: '是否禁用'
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
    },
    parameters: {
        docs: {
            description: {
                component: '自动补全输入组件，根据输入提供建议列表'
            }
        }
    }
};

export default AutoCompleteMeta;

// 使用StoryObj类型
type AutoCompleteStory = StoryObj<AutoCompleteProps>;

// 基础自动补全故事
export const Default: AutoCompleteStory = {
    args: {
        placeholder: '请输入城市名称',
        fetchSuggestions: cityFetchSuggestions,
        disabled: false,
        size: "lg",
        prepend: "我定义了",
        append: "就能使用"
    },
    parameters: {
        docs: {
            description: {
                story: '基本的自动补全组件，输入时显示城市建议'
            }
        }
    }
};