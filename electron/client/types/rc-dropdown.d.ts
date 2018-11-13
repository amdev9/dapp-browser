declare module "rc-dropdown" {
  export type Trigger = "click" | "hover"
  export interface DropdownProps extends React.Props<any> {
    overlayClassName?: string
    prefixCls?: string
    transitionName?: string
    animation?: string
    onVisibleChange?: (visible: boolean) => void,
    trigger?: Trigger[]
    visible?: boolean
    defaultVisible?: boolean
    overlay?: JSX.Element
    onOverlayClick?: () => void
    placement?: string
    minOverlayWidthMatchTrigger?: boolean
  }

  export default class Dropdown extends React.Component<DropdownProps> { }
}