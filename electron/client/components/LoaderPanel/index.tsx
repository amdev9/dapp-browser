import * as React from "react";
interface LoaderPanelProps {
  isOpen?: boolean,
  togglePanel?(openStatus: boolean): void
}
export class LoaderPanel extends React.Component<LoaderPanelProps> {
  render() {
    let { isOpen } = this.props;

    const props: any = {
      className: "",
      style: {
        position: "absolute",
        bottom: 0,
        display: isOpen ? "block": "none"
      },
    };
    return (

      <div {...props}>
        <h1>Loader panel</h1>
      </div>
    )
  }
}
