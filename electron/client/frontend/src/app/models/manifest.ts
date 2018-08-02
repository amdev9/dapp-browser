export interface Manifest {
  buildCode: number
  title: string

  description: Manifest.Description
  author: Manifest.Author

  dependencies: Manifest.Dependecies
  libraries: Manifest.Library[]

  services: Manifest.Services
  security: Manifest.Security
  bundle: Manifest.Bundle
}

export namespace Manifest {
  export interface Author {
    email: string
    name: string
  }

  export interface Description {
    // Массив строк с ключевыми словами для поиска
    keywords: string[]
    // Главная страница проекта
    homepage: string
    // Полное описание проекта в html или markdown
    content: string
    // Лицензионное соглашение по которому распространяется Dapp
    // Возможно добавить или текст соглашения целиком или аббревиатуру существующих
    license: string
  }

  export enum Permission {
    Notification,
    Activity,
    Platform,
    Keychain,
    Storage,
    Assets,
    Logger,
    Tray,
    IPFS,
    P2P,
  }

  export interface Security {
    // Массив с перечислением запрашиваемых dapp разрешений
    permissions: Permission[]
  }

  export interface Bundle {
    assets: string // Path to folder with app assets eg images, fonts, etc..
    script: string // Path eg build.js
    entry: string  // Path eg index.html
    icons: string  // Path to icons folder with [1x, 2x, 3x]
  }

  // Название сервиса который этот Dapp гарантирует предсоставить
  export type ServiceName = string
  // Набор названий сервисов который предоставляет и имплементирует этот Dapp 
  export type Services = ServiceName[]

  export interface Dependecies {
    // Ключ - строка название Dapp в зависимости
    [dapp: string]: DependencyInfo
  }

  // Название запрашиваемого сервиса из Dapp
  export type DependencyService = string

  // Изначальное значение - строка, является версией
  // Значения по умолчанию:
  // optional - false
  // services - все сервисы DApp
  export type DependencyInfo = string | {
    // Указывает Обязательность уровень приоритета использование: обязательная зависимость или нет. 
    optional: boolean,
    // Версия зависимости с относительной версией по принципу gem
    // https://guides.rubygems.org/patterns/#declaring_dependencies
    version: string,
    // Запрашиваемые сервисы
    services: DependencyService,
  }

  // Library это ipfs адрес, с которго будет прогружен js файл, для инъекции в сборку.
  export type Library = string
}
