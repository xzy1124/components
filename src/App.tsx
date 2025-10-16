import Button, {ButtonType, ButtonSize} from './components/Button/Button'
import Alert, {AlertType} from './components/Alert/Alert'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import {useState} from 'react'
import SubMenu from './components/Menu/subMenu'
function App() {
const [visible, setVisible] = useState({
  //使用对象键值对，每个键对应一个AlertType，值为是否可见
  [AlertType.Success]: true,
  [AlertType.Default]: true,
  [AlertType.Warning]: true,
  [AlertType.Danger]: true,
})
// type是参数prams,后面AlertType是它的类型
  // 是React中useState hook的函数式更新方式。
  // 当新的状态值依赖于前一个状态值时，应该使用这种方式。
const onHandleState = (type:AlertType) => {
  setVisible (prev => ({
    ...prev,
    [type]: false
  }))
}
  return (
    <div className="App">
      <header className="App-header">
        {/*渲染Menu组件 */}
        <Menu index={'0'} onSelect={(index) => alert(index)} mode="horizontal">
          <MenuItem>
            选项1
          </MenuItem>
          {/* 看看原来报错不 */}
          {/* <div>我也假装是Menu的子组件</div> */}
          <MenuItem disabled={true}>
            选项2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdown1
            </MenuItem>
            <MenuItem>
              dropdown2
            </MenuItem>
            <MenuItem>
              dropdown3
            </MenuItem>
          </SubMenu>
          <MenuItem>
            选项3
          </MenuItem>
        </Menu>
        <Menu index={'0'} onSelect={(index) => alert(index)} mode="vertical" defaultOpenSubMenus={['2']}>
          <MenuItem>
            选项1
          </MenuItem>
          <MenuItem disabled={true}>
            选项2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdown1
            </MenuItem>
            <MenuItem>
              dropdown2
            </MenuItem>
            <MenuItem>
              dropdown3
            </MenuItem>
          </SubMenu>
          <MenuItem>
            选项3
          </MenuItem>
        </Menu>
        {/* 渲染Button组件 */}
        <Button disabled={true}>禁用</Button>
        <Button btnType={ButtonType.Default}>默认Default</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>主要primary</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>危险danger</Button>
        <Button btnType={ButtonType.Secondary} size={ButtonSize.Large}>次要secondary</Button>
        <Button btnType={ButtonType.Success} size={ButtonSize.Large}>成功success</Button>
        <Button btnType={ButtonType.Warning} size={ButtonSize.Small}>警告warning</Button>
        <Button btnType={ButtonType.Info} size={ButtonSize.Small}>信息info</Button>
        <Button btnType={ButtonType.Light} size={ButtonSize.Small}>亮light</Button>
        <Button btnType={ButtonType.Dark} size={ButtonSize.Small}>暗dark</Button>
        <Button btnType={ButtonType.Link} href="https://reactjs.org">link button</Button>
        <Button btnType={ButtonType.Link} disabled={true}>disabled link</Button>
        <Button btnType={ButtonType.Primary} className='custom' onClick={(e) => {e.preventDefault(); alert(123)}}>原生Button</Button>
        <Button btnType={ButtonType.Link} target='_blank' href="https://reactjs.org">原生link</Button>
      </header>
      {/* 这个组件的状态是visible，它是一个对象，每个键对应一个AlertType，值为是否可见 */}
      {visible[AlertType.Success] && (
        <Alert
          type={AlertType.Success}
          title='成功'
          description='这是一个成功的提示'
          // 点击关闭按钮时，调用onHandleState函数，将该AlertType的可见性设为false,其他的属性保持不变
          onClose={() => onHandleState(AlertType.Success)}
          // 我觉得也可以直接设置onClose的逻辑
          closable={true}  // 显示关闭按钮
          >
            
          成功
        </Alert>
      )}

      {visible[AlertType.Default] && (
        <Alert
          type={AlertType.Default}
          title='信息'
          description='这是一个信息的提示'
          onClose={() => onHandleState(AlertType.Default)}
          closable={true}  // 显示关闭按钮
          >
          信息
        </Alert>
      )}

      {visible[AlertType.Warning] && (
        <Alert
          type={AlertType.Warning}
          title='警告'
          description='这是一个警告的提示'
          onClose={() => onHandleState(AlertType.Warning)}
          closable={false}  // 显示关闭按钮
          >
          警告
        </Alert>
      )}

      {visible[AlertType.Danger] && (
        <Alert
          type={AlertType.Danger}
          title='危险'
          description='这是一个危险的提示'
          onClose={() => onHandleState(AlertType.Danger)}>
          危险
        </Alert>
      )}
    </div>
  );
}

export default App;
