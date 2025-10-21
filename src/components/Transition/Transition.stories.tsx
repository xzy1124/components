import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react-webpack5';
import Transition, { TransitionProps } from './transition';
import '../Button/Button';

// 定义Meta配置
const meta: Meta = {
    title: 'Component/Transition',
    component: Transition,
    tags: ['autodocs'],
    argTypes: {
        animation: {
            control: {
                type: 'select',
                options: ['zoom-in-top', 'zoom-in-left', 'zoom-in-right', 'zoom-in-bottom'],
            },
            description: '动画效果类型',
            defaultValue: 'zoom-in-top',
            table: {
                type: { summary: 'zoom-in-top | zoom-in-left | zoom-in-right | zoom-in-bottom' },
                defaultValue: { summary: 'zoom-in-top' },
            },
        },
        timeout: {
            control: { type: 'number' },
            description: '动画持续时间（毫秒）',
            defaultValue: 400,
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '400' },
            },
        },
        wrapper: {
            control: { type: 'boolean' },
            description: '是否使用div包裹子元素',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        unmountOnExit: {
            control: { type: 'boolean' },
            description: '退出动画结束后是否卸载元素',
            defaultValue: true,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        appear: {
            control: { type: 'boolean' },
            description: '初始渲染时是否执行进入动画',
            defaultValue: true,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component: 'Transition组件是对react-transition-group的CSSTransition组件的封装，提供了更友好的API和预定义的动画效果。',
            },
            table: {
                type: 'category',
                category: '动画组件',
            },
        },
    },
};

export default meta;
type Story = StoryFn<TransitionProps>;

// 定义基础模板
const Template: Story = (args) => {
    const [show, setShow] = useState(true);

    return (
        <>
            <button
                onClick={() => setShow(!show)}
                style={{
                    padding: '8px 16px',
                    marginBottom: '20px',
                    cursor: 'pointer',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                {show ? '隐藏' : '显示'}
            </button>
            <Transition {...args} in={show}>
                <div
                    style={{
                        padding: '20px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        minHeight: '100px',
                        textAlign: 'center',
                        lineHeight: '100px'
                    }}
                >
                    动画内容
                </div>
            </Transition>
        </>
    );
};

// 基础动画示例
export const Default = Template.bind({});
Default.args = {
    animation: 'zoom-in-top',
    timeout: 400,
};
Default.parameters = {
    docs: {
        description: {
            story: '默认动画效果（从顶部缩放进入）',
        },
        source: {
            code: `const [show, setShow] = useState(true);

<>
  <button onClick={() => setShow(!show)}>显示/隐藏</button>
  <Transition animation="zoom-in-top" in={show}>
    <div>动画内容</div>
  </Transition>
</>`,
        },
    },
};

// 左上角缩放动画
export const ZoomInleft = Template.bind({});
ZoomInleft.args = {
    animation: 'zoom-in-left',
    timeout: 400,
};
ZoomInleft.parameters = {
    docs: {
        description: {
            story: '从左上角缩放进入的动画效果',
        },
        source: {
            code: `<Transition animation="zoom-in-left" in={show}>
  <div>动画内容</div>
</Transition>`,
        },
    },
};

// 右侧缩放动画
export const ZoomInRight = Template.bind({});
ZoomInRight.args = {
    animation: 'zoom-in-right',
    timeout: 400,
};
ZoomInRight.parameters = {
    docs: {
        description: {
            story: '从右侧缩放进入的动画效果',
        },
        source: {
            code: `<Transition animation="zoom-in-right" in={show}>
  <div>动画内容</div>
</Transition>`,
        },
    },
};

// 底部缩放动画
export const ZoomInBottom = Template.bind({});
ZoomInBottom.args = {
    animation: 'zoom-in-bottom',
    timeout: 400,
};
ZoomInBottom.parameters = {
    docs: {
        description: {
            story: '从底部缩放进入的动画效果',
        },
        source: {
            code: `<Transition animation="zoom-in-bottom" in={show}>
  <div>动画内容</div>
</Transition>`,
        },
    },
};

// 带wrapper的动画
export const WithWrapper = Template.bind({});
WithWrapper.args = {
    animation: 'zoom-in-top',
    timeout: 400,
    wrapper: true,
};
WithWrapper.parameters = {
    docs: {
        description: {
            story: '使用wrapper属性包裹子元素，适用于非单个ReactElement的场景',
        },
        source: {
            code: `<Transition animation="zoom-in-top" in={show} wrapper>
  <div>动画内容</div>
</Transition>`,
        },
    },
};

// 自定义动画时长
export const CustomTimeout = Template.bind({});
CustomTimeout.args = {
    animation: 'zoom-in-top',
    timeout: 1000, // 延长动画时间到1秒
};
CustomTimeout.parameters = {
    docs: {
        description: {
            story: '自定义动画持续时间',
        },
        source: {
            code: `<Transition animation="zoom-in-top" in={show} timeout={1000}>
  <div>动画内容</div>
</Transition>`,
        },
    },
};

// 不卸载元素
export const KeepMounted = Template.bind({});
KeepMounted.args = {
    animation: 'zoom-in-top',
    timeout: 400,
    unmountOnExit: false,
};
KeepMounted.parameters = {
    docs: {
        description: {
            story: '退出动画结束后不卸载元素',
        },
        source: {
            code: `<Transition animation="zoom-in-top" in={show} unmountOnExit={false}>
  <div>动画内容</div>
</Transition>`,
        },
    },
};

// 不显示初始动画
export const NoAppearAnimation = Template.bind({});
NoAppearAnimation.args = {
    animation: 'zoom-in-top',
    timeout: 400,
    appear: false,
};
NoAppearAnimation.parameters = {
    docs: {
        description: {
            story: '初始渲染时不执行进入动画',
        },
        source: {
            code: `<Transition animation="zoom-in-top" in={show} appear={false}>
  <div>动画内容</div>
</Transition>`,
        },
    },
};

// 嵌套内容动画
// 嵌套内容动画 - 使用args系统
export const NestedContent = Template.bind({});
NestedContent.args = {
    animation: 'zoom-in-top',
    timeout: 400,
    // 可以在这里设置默认值
    unmountOnExit: false
};
NestedContent.parameters = {
    docs: {
        description: {
            story: '包含多个子元素的动画示例',
        },
        source: {
            code: `<Transition animation="zoom-in-top" in={show} {...args}>
  <div>
    <h3>嵌套内容</h3>
    <p>这是一个包含多个子元素的示例</p>
    <div>
      <button>按钮1</button>
      <button>按钮2</button>
    </div>
  </div>
</Transition>`,
        },
    },
};

// 实际应用场景 - 模态框
export const ModalExample = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <button
                onClick={() => setShow(true)}
                style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    backgroundColor: '#1890ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                打开模态框
            </button>

            {/* 遮罩层 */}
            {show && (
                <div
                    onClick={() => setShow(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}
                >
                    {/* 阻止模态框内容点击事件冒泡到遮罩层 */}
                    <div onClick={e => e.stopPropagation()}>
                        <Transition animation="zoom-in-top" in={show}>
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    padding: '24px',
                                    borderRadius: '4px',
                                    width: '400px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                }}
                            >
                                <h2 style={{ margin: '0 0 16px 0' }}>模态框标题</h2>
                                <p style={{ margin: '0 0 20px 0' }}>这是一个模态框示例，展示Transition组件在实际应用中的使用方式。</p>
                                <div style={{ textAlign: 'right' }}>
                                    <button
                                        onClick={() => setShow(false)}
                                        style={{
                                            padding: '6px 16px',
                                            cursor: 'pointer',
                                            backgroundColor: '#1890ff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        关闭
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            )}
        </>
    );
};
ModalExample.parameters = {
    docs: {
        description: {
            story: '在模态框场景中的实际应用',
        },
    },
};