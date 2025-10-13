import Button, {ButtonType, ButtonSize} from './components/Button/Button'
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Button disabled={true}>默认default</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>主要primary</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>危险danger</Button>
        <Button btnType={ButtonType.Secondary} size={ButtonSize.Large}>次要secondary</Button>
        <Button btnType={ButtonType.Success} size={ButtonSize.Large}>成功success</Button>
        <Button btnType={ButtonType.Warning} size={ButtonSize.Small}>警告warning</Button>
        <Button btnType={ButtonType.Info} size={ButtonSize.Small}>信息info</Button>
        <Button btnType={ButtonType.Light} size={ButtonSize.Small}>亮light</Button>
        <Button btnType={ButtonType.Dark} size={ButtonSize.Small}>暗dark</Button>
        <Button btnType={ButtonType.Link} href="https://reactjs.org">link button</Button>

      </header>
    </div>
  );
}

export default App;
