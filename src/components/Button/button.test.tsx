import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button, {ButtonType, ButtonSize, ButtonProps} from './Button'
const defaultProps = {
    // 模拟用户点击行为需使用jest提供的mock functions工具，用于追踪函数调用次数及参数。
    onClick: jest.fn()
}
const testProps : ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'klass'
}
const disableProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}


test('our first react test case', () => {
    render(<Button>Nice</Button>)
    const element = screen.queryByText('Nice')
    expect(element).toBeTruthy()
    expect(element).toBeInTheDocument()
})
// 分类
describe('test Button component', () => {
    it('should render the correct default button', () => {
        render(<Button {...defaultProps}>Default</Button>)
        const element = screen.getByText('Default') as HTMLButtonElement
        expect(element).toBeTruthy()
        expect(element).toBeInTheDocument()
        // getByText 会返回一个元素，如果元素不存在，会抛出错误
        // queryByText 会返回一个元素，如果元素不存在，会返回 null
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        // 模拟用户点击行为
        fireEvent.click(element)
        // 验证 onClick 函数是否被调用了一次
        expect(defaultProps.onClick).toHaveBeenCalledWith(expect.anything())
    })
    it('should render the correct component based on different props', () => {
        render(<Button {...testProps}>props</Button>)
        const element = screen.getByText('props')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg klass')
    })
    it('should render a link when btnType equails link and href is provided', () => {
        render(<Button btnType={'link'} href="dummyurl">Link</Button>)
        const element = screen.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('should render disabled button when disabled set to true', () => {
        render(<Button {...disableProps}>Disabled</Button>)
        // 使用类型断言，将查询到的元素断言为 HTMLButtonElement 类型
        // 本来是html类型，不是button类型，所以需要断言为button类型
        const element = screen.getByText('Disabled') as HTMLButtonElement
        expect(element.disabled).toBeTruthy()
        // 在点击事件中，disabled 按钮不会触发点击事件
        fireEvent.click(element)
        expect(disableProps.onClick).not.toHaveBeenCalled()
    })
})