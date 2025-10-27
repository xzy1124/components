import Menu, {MenuProps} from "./Menu"
import MenuItem, {MenuItemProps} from "./MenuItem"
import subMenu, {SubMenuProps} from "./subMenu"

export type IMenuComponent = React.FC<MenuProps> & {
    item: React.FC<MenuItemProps>
    subMenu: React.FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponent
TransMenu.item = MenuItem
TransMenu.subMenu = subMenu
export default TransMenu