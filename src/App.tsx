// 使用了React.ChangeEvent等React的类型，是需要显式导入React的
import React, {useState} from 'react'
import Button, {ButtonType, ButtonSize} from './components/Button/Button'
import Alert, {AlertType} from './components/Alert/Alert'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import Icon from './components/Icon/icon'
import Input from './components/Input/input'
import axios from 'axios'
import SubMenu from './components/Menu/subMenu'
import Upload from './components/Upload/upload'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Transition from './components/Transition/transition'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)


function App() {
const [visible, setVisible] = useState({
  //使用对象键值对，每个键对应一个AlertType，值为是否可见
  success: true,
  default: true,
  warning: true,
  danger: true,
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
// 添加点击状态确定是否展示动画
const [show, setShow] = useState(false)
// 为输入框添加状态管理
const [inputValue, setInputValue] = useState('')
// 处理输入变化
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value)
}
// 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 拿到files属性的第一个文件，因为是数组，所以要取第一个
    const file = e.target.files?.[0]
    if(file){
      console.log('上传的文件:', file)
      const formData = new FormData()
      // 把数据发送到formData里面
      formData.append('file', file)
      axios.post("https://jsonplaceholder.typicode.com/cc", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res =>{
        console.log('上传成功', res)
      })
    }
  }
  return (
    <div className="App">
      <header className="App-header">
  {/* 渲染基础的上传功能 */}
  <input type="file" name='myFile' onChange={handleFileChange}/>
  {/* 渲染我们的Upload组件 */}
        <Upload action="https://jsonplaceholder.typicode.com/posts" />
  {/* 渲染我们的Input组件 */}
        {/* 1.基础输入框 */}
        <Input  placeholder='请输入'/>
        {/* 2.带有尺寸的输入框 */}
        <Input size='lg' placeholder='请输入-lg'/>
        <Input size='sm' placeholder='请输入-sm'/>
        {/* 3.禁用状态的输入框 */}
        <Input disabled={true} placeholder='禁用状态'/>
        {/* 4.带有图标的输入框 */}
        <Input icon="search" placeholder='搜索'/>
        {/* 5.带有前后缀的输入框 */}
        <Input prepend="$" append=".00" placeholder='金额'/> 
        {/* 6.受控的输入框 */}
        <Input value={inputValue} onChange={handleInputChange} placeholder='受控也就是带状态管理的输入框'/>
        {/* 7.带有前置内容的输入框 */}
        <Input prepend="https://" placeholder='请输入一个网址'/>
        {/* 8.带有前置组件的输入框 */}
        <Input prepend={<Icon icon="user"/> } placeholder='请输入用户名'/>
        {/* 9.带有后置内容的输入框 */}
        <Input append=".com" placeholder='请输入邮箱地址'/>
        {/* 10.带有后置组件的输入框 */}
        <Input append={<Icon icon="arrow-up"/> } placeholder='请输入密码'/>
        {/* 11.组合使用 */}
        <Input size="lg" icon="home" prepend="家庭:" placeholder='家庭地址'/>

  {/* 渲染FontAwesomeIcon组件 */}
        {/* <FontAwesomeIcon icon={faCoffee} size='5x'/> */}
  {/* 渲染我们二次封装的我们自己的Icon组件 */}
        <Icon theme="primary" icon="arrow-down" size='5x'/>
  {/* 使用我们的Transition */}
        <Button size='lg' btnType='primary' onClick={() => setShow(!show)}>Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation={'zoom-in-top'}
        >
          <div>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
            <p>Edit <code>src/App.tsx</code> and save to reload</p>
          </div>
        </Transition>
  {/* 再来一个动画Button的测试 */}
        <Transition
          in={show}
          timeout={300}
          animation={'zoom-in-top'}
          wrapper={true}
        >
          <Button size='lg'>Toggle</Button>
        </Transition>
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
        <Button btnType={'default'}>默认Default</Button>
        <Button btnType={'primary'} size={'lg'}>主要primary</Button>
        <Button btnType={'danger'} size={'lg'}>危险danger</Button>
        {/* <Button btnType={ButtonType.Secondary} size={ButtonSize.Large}>次要secondary</Button>
        <Button btnType={ButtonType.Success} size={ButtonSize.Large}>成功success</Button>
        <Button btnType={ButtonType.Warning} size={ButtonSize.Small}>警告warning</Button>
        <Button btnType={ButtonType.Info} size={ButtonSize.Small}>信息info</Button>
        <Button btnType={ButtonType.Light} size={ButtonSize.Small}>亮light</Button>
        <Button btnType={ButtonType.Dark} size={ButtonSize.Small}>暗dark</Button> */}
        <Button btnType={'link'} href="https://reactjs.org">link button</Button>
        <Button btnType={'link'} disabled={true}>disabled link</Button>
        <Button btnType={'primary'} className='custom' onClick={(e) => {e.preventDefault(); alert(123)}}>原生Button</Button>
        <Button btnType={'link'} target='_blank' href="https://reactjs.org">原生link</Button>
      </header>
      {/* 这个组件的状态是visible，它是一个对象，每个键对应一个AlertType，值为是否可见 */}
      {/* 把Alert组件用Transition包裹起来，实现动画效果 */}
      <Transition
        in={visible['success']}
        timeout={400}
        animation={'zoom-in-top'}
      >
          <Alert
            type={'success'}
            title='成功'
            description='这是一个成功的提示'
            // 点击关闭按钮时，调用onHandleState函数，将该AlertType的可见性设为false,其他的属性保持不变
          onClose={() => onHandleState('success')}
            // 我觉得也可以直接设置onClose的逻辑
            closable={true}  // 显示关闭按钮
          >

            成功
          </Alert>
      </Transition>
      
      {/* visible就是后面Alert渲染的前提，两者之间是&&连接符，所以visiable(false)的时候后面组件直接没了，都来不及动画 */}
      {visible['default'] && (
        <Alert
          type={'default'}
          title='默认'
          description='这是一个默认的提示'
          onClose={() => onHandleState('default')}
          closable={true}  // 显示关闭按钮
          >
          默认
        </Alert>
      )}
      {visible['warning'] && (
        <Alert
          type={'warning'}
          title='警告'
          description='这是一个警告的提示'
          onClose={() => onHandleState('warning')}
          closable={true}  // 显示关闭按钮
        >
          警告
        </Alert>
      )}

      {visible['danger'] && (
        <Alert
          type={'danger'}
          title='危险'
          description='这是一个危险的提示'
          onClose={() => onHandleState('danger')}
          closable={true}  // 显示关闭按钮
        >
          危险
        </Alert>
      )}
    </div>
  );
}

export default App;
