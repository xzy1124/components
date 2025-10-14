import React from "react";
import Alert, {AlertType} from "./Alert";
import {render, screen, fireEvent} from "@testing-library/react";
const defaultProps = {
    onClose: jest.fn()
}
test('our first react alert case', () => {
    render(<Alert
        title="Test Title"
        description="Test Description"
        type={AlertType.Success}
        onClose={defaultProps.onClose}
    />)
    // 使用更精确的查询方式
    const alertElement = screen.getByTitle('Test Title')
    const titleElement = screen.getByText('Test Title')

    // 修复：使用 queryByText 替代 getByText，因为 getByText 在找不到元素时会抛出错误
    const descriptionElement = screen.queryByText('Test Description')

    expect(alertElement).toBeTruthy()
    expect(alertElement).toBeInTheDocument()
    expect(titleElement).toBeInTheDocument()
    expect(descriptionElement).toBeInTheDocument()

})
describe('test Alert component', () => {
    it('should render the correct default alert', () => {
        render(<Alert 
            title="Default Alert"
            description="This is a default alert"
            onClose={defaultProps.onClose}
            type={AlertType.Default}
            closable={false}
        />)
        const alertElement = screen.getByTitle('Default Alert')
        expect(alertElement).toBeInTheDocument()
        expect(alertElement).toHaveClass('alert alert-default')
        expect(screen.queryByRole('button')).toBeNull() 
    })
    it('should render different types of alerts based on type prop', () => {
        // 测试 success 类型
        render(
            <Alert
                title="Success Alert"
                description="This is a success alert"
                onClose={defaultProps.onClose}
                type={AlertType.Success}
            />
        )
        let alertElement = screen.getByTitle('Success Alert')
        expect(alertElement).toHaveClass('alert alert-success')

        // 测试 warning 类型
        render(
            <Alert
                title="Warning Alert"
                description="This is a warning alert"
                onClose={defaultProps.onClose}
                type={AlertType.Warning}
            />
        )
        alertElement = screen.getByTitle('Warning Alert')
        expect(alertElement).toHaveClass('alert alert-warning')

        // 测试 danger 类型
        render(
            <Alert
                title="Danger Alert"
                description="This is a danger alert"
                onClose={defaultProps.onClose}
                type={AlertType.Danger}
            />
        )
        alertElement = screen.getByTitle('Danger Alert')
        expect(alertElement).toHaveClass('alert alert-danger')
    })
    it('should render with children content', () => {
        render(<Alert
            title="Children Alert"
            onClose={defaultProps.onClose}
            description="This is children"
            type={AlertType.Default}
        >
            <div>
                <p>Child 1</p>
                <p className="cc">Child 2</p>
            </div>
        </Alert>)
        const alertElement = screen.getByTitle('Children Alert')
        const childrenElement = screen.getByText('Child 1')
        expect(alertElement).toBeInTheDocument()
        expect(childrenElement).toBeInTheDocument()
        const childrenElement2 = screen.getByText('Child 2')
        expect(childrenElement2).toBeInTheDocument()
        expect(childrenElement2).toHaveClass('cc')
    })
    it('should show close button when closable is true', () => {
        render(
            <Alert
                title="Closable Alert"
                description="This alert can be closed"
                onClose={defaultProps.onClose}
                type={AlertType.Default}
                closable={true}
            />
        )

        const closeButton = screen.getByRole('button')
        expect(closeButton).toBeInTheDocument()
        expect(closeButton).toHaveClass('alert-close')
    })

    it('should call onClose function when close button is clicked', () => {
        render(
            <Alert
                title="Closable Alert"
                description="Click the close button"
                onClose={defaultProps.onClose}
                type={AlertType.Default}
                closable={true}
            />
        )

        const closeButton = screen.getByRole('button')
        fireEvent.click(closeButton)
        // 检查 onClose 函数是否被调用了一次
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('should not have close button when closable is false', () => {
        render(
            <Alert
                title="Non-closable Alert"
                description="This alert cannot be closed"
                onClose={defaultProps.onClose}
                type={AlertType.Default}
                closable={false}
            />
        )

        const closeButton = screen.queryByRole('button')
        expect(closeButton).toBeNull()
    })

    it('should render title and description correctly', () => {
        render(
            <Alert
                title="Complete Alert"
                description="This alert has both title and description"
                onClose={defaultProps.onClose}
                type={AlertType.Default}
            >
                And some children content
            </Alert>
        )

        expect(screen.getByText('Complete Alert')).toBeInTheDocument()
        expect(screen.getByText('Complete Alert')).toHaveClass('alert-title')

        expect(screen.getByText('This alert has both title and description')).toBeInTheDocument()
        expect(screen.getByText('This alert has both title and description')).toHaveClass('alert-description')

        expect(screen.getByText('And some children content')).toBeInTheDocument()
    })
})