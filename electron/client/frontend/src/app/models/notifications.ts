export interface NotifyItem {
  message: string
  icon: string
  app: string
  created: Date
}

export namespace NotifyItem {
  export const make = (): NotifyItem => ({
    created: new Date(),
    message: "",
    icon: "",
    app: "",
  })
}
