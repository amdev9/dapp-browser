import * as React from "react"

interface SettingsPanelProps {
  items?: { [index: string]: SettingsPanelProps; },
  isOpen?: boolean,
  toggleStatusBar?: () => void,
  peersBarIsOpen?: boolean
}

export class SettingsPanel extends React.Component<SettingsPanelProps> {
  public render() {
    let { isOpen } = this.props;

    const props: any = {
      style: {
        display: isOpen ? "block": "none",
        width: "100%"
      },
    };

    return (
      <div className="settingsbar" {...props}>
        Hello it's me
      </div>
    )
  }
}
