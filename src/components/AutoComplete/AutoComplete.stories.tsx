import { Meta, StoryObj } from '@storybook/react-webpack5';
import AutoComplete, { AutoCompleteProps } from './autoComplete';
import { DataSourceType } from './autoComplete';
// 定义城市数据类型
interface City {
    value: string;
    code: string;
    population: number;
}
const cityData: DataSourceType<City>[] = [
        { value: '北京', code: 'BJ', population: 2154 },
        { value: '上海', code: 'SH', population: 2424 },
        { value: '广州', code: 'GZ', population: 1530 },
        { value: '深圳', code: 'SZ', population: 1303 },
        { value: '杭州', code: 'HZ', population: 949 },
        { value: '南京', code: 'NJ', population: 844 },
        { value: '成都', code: 'CD', population: 1633 },
        { value: '武汉', code: 'WH', population: 1108 },
    ];

// 示例数据 - 编程语言对象数组
interface ProgrammingLanguage {
    value: string;
    popularity: number;
    type: string;
}

const languageData: DataSourceType<ProgrammingLanguage>[] = [
    { value: 'JavaScript', popularity: 95, type: 'Frontend' },
    { value: 'TypeScript', popularity: 80, type: 'Frontend' },
    { value: 'Python', popularity: 85, type: 'Backend' },
    { value: 'Java', popularity: 75, type: 'Backend' },
    { value: 'C++', popularity: 65, type: 'System' },
    { value: 'Go', popularity: 55, type: 'Backend' },
];


// 为Storybook定义组件元数据
const AutoCompleteMeta: Meta<AutoCompleteProps> = {
    title: 'Component/AutoComplete',
    component: AutoComplete,
    argTypes: {
        onSelect: {
            action: 'selected'
        },
        disabled: {
            control: 'boolean',
            description: '是否禁用自动补全'
        }
    },
};

export default AutoCompleteMeta;

// 重要: 这是关键修改，让故事类型也支持泛型
interface AutoCompleteStory<T = {}> extends StoryObj<any> {
    args: {
        placeholder?: string;
        fetchSuggestions: (value: string) => DataSourceType<T>[];
        onSelect?: (item: DataSourceType<T>) => void;
        renderItem?: (item: DataSourceType<T>) => React.ReactElement;
        disabled?: boolean;
        size?: 'lg' | 'sm' | undefined;
        prepend?: string;
        append?: string;
    };
}

// 基础自动补全故事
// 这里指定泛型参数为City类型

export const Default: AutoCompleteStory<City> = {
    args: {
        placeholder: '请输入城市名称',
        fetchSuggestions: (value: string) => {
            return cityData.filter(city =>
                city.value.includes(value)
            );
        },
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
// 自定义渲染项故事
// 这里指定泛型参数为ProgrammingLanguage类型
export const CustomRenderItems: AutoCompleteStory<ProgrammingLanguage> = {
    args: {
        placeholder: '请输入编程语言',
        fetchSuggestions: (value: string) => {
            return languageData.filter(lang =>
                lang.value.includes(value)
            );
        },
        renderItem: (item) => (
            <div>
                <strong>{item.value}</strong>
                <span> (人气: {item.popularity}%, 类型: {item.type})</span>
            </div>
        )
    }
}