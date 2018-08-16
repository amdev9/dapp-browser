declare module "react-ionicons" {
  export interface IconProps {
    className?: string;
    fontSize?: string;
    color?: string;
    icon: string;
  }
  export class Ionicon extends React.Component<IconProps, {}> {
  }
}