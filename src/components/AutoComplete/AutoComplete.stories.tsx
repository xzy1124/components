import { Meta, StoryObj } from '@storybook/react-webpack5';
import AutoComplete from './autoComplete';
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

// 定义GitHub用户类型
interface GitHubUser {
    value: string;
    login: string;
    avatar_url: string;
    html_url: string;
    score: number;
}

// 异步获取GitHub用户数据
const fetchGitHubUsers = async (query: string): Promise<DataSourceType<GitHubUser>[]> => {
    try {
        // 使用GitHub Search API搜索用户
        const response = await fetch(`https://api.github.com/search/users?q=${query}`);
        const data = await response.json();

        // 格式化数据为我们组件需要的格式
        return data.items.slice(0, 10).map((item: any) => ({
            value: item.login, // 这是显示在输入框中的值
            ...item, // 展开其他属性
        }));
    } catch (error) {
        console.error('获取GitHub用户数据失败:', error);
        return [];
    }
};

// 为Storybook定义组件元数据
const AutoCompleteMeta: Meta<typeof AutoComplete> = {
    title: 'Component/AutoComplete',
    component: AutoComplete,
    argTypes: {
        onSelect: {
            action: 'selected'
        },
    },
};

export default AutoCompleteMeta;

// 定义泛型版本的Story类型
interface AutoCompleteStory<T = {}> extends StoryObj<any> {
    args: {
        placeholder?: string;
        fetchSuggestions: (value: string) => DataSourceType<T>[] | Promise<DataSourceType<T>[]>;
        onSelect?: (item: DataSourceType<T>) => void;
        renderItem?: (item: DataSourceType<T>) => React.ReactElement;
        disabled?: boolean;
        size?: 'lg' | 'sm' | undefined;
        prepend?: string;
        append?: string;
    };
}

// 基础自动补全故事
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

// GitHub用户搜索故事 - 异步请求示例
export const GitHubUserSearch: AutoCompleteStory<GitHubUser> = {
    args: {
        placeholder: '搜索GitHub用户（例如: microsoft, google）',
        fetchSuggestions: fetchGitHubUsers,
        renderItem: (item: DataSourceType<GitHubUser>) => (
            <div style={{
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #eee',
                gap: '10px'
            }}>
                <img
                    src={item.avatar_url}
                    alt={item.login}
                    style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold' }}>{item.login}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        匹配度: {(item.score * 100).toFixed(2)}%
                    </div>
                </div>
            </div>
        ),
        onSelect: (item: DataSourceType<GitHubUser>) => {
            console.log('选择了GitHub用户:', item);
            // 实际项目中可以在这里处理用户选择后的逻辑
        }
    },
    parameters: {
        docs: {
            description: {
                story: '使用GitHub API进行异步搜索的示例'
            }
        }
    }
};