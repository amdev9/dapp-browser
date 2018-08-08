export interface DApp {
  // Dapp name
  name: string
  // Preview image (for card on marketplace)
  preview: string
  // icon (eg for tray)
  icon: string
  // Categories
  categories: string[]
}

export namespace DApp {
  // Make default instnanse of dapp
  export const make = () => ({
    preview: require("../../assets/app-images/thumb.png"),
    icon: require("../../assets/app-icons/exchange.svg"),
    categories: ["games", "tools"],
    name: "My Awesome Dapp",
  })
}
