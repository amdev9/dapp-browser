# Manifest
Предлагаемая конечная версия схемы манифеста

```typescript
interface Author {
  email: string;
  name: string;
}

interface Description {
  // Массив строк с ключевыми словами для поиска
  keywords: string[];
  // Главная страница проекта
  homepage: string;
  // Полное описание проекта в html или markdown
  content: string;
  // Лицензионное соглашение по которому распространяется Dapp
  // Возможно добавить или текст соглашения целиком или аббревиатуру существующих
  license: string;
}

enum Permission {
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

interface Security {
  // Массив с перечислением запрашиваемых dapp разрешений
  permissions: Permission[];
}

interface Bundle {
  assets: string; // Path to folder with app assets eg images, fonts, etc..
  script: string; // Path eg build.js
  entry: string;  // Path eg index.html
  icons: string;  // Path to icons folder with [1x, 2x, 3x]
}

// Название сервиса который этот Dapp гарантирует предсоставить
type ServiceName = string;
// Набор названий сервисов который предоставляет и имплементирует этот Dapp 
type Services = ServiceName[];

interface Dependecies {
  // Ключ - строка название Dapp в зависимости
  [dapp: string]: DependencyInfo;
}

// Название запрашиваемого сервиса из Dapp
type DependencyService = string;

// Изначальное значение - строка, является версией
// Значения по умолчанию:
// optional - false
// services - все сервисы DApp
type DependencyInfo = string | {
  // Указывает Обязательность уровень приоритета использование: обязательная зависимость или нет. 
  optional: boolean;
  // Версия зависимости с относительной версией по принципу gem
  // https://guides.rubygems.org/patterns/#declaring_dependencies
  version: string;
  services: DependencyService;
};

// Library это ipfs адрес, с которго будет прогружен js файл, для инъекции в сборку.
type Library = string;

interface Manifest {
  buildCode: number;
  title: string;

  description: Description;
  author: Author;

  dependencies: Dependecies;
  libraries: Library[];

  services: Services;
  security: Security;
  bundle: Bundle;
}
```

*Manifest Пример*
``` js
{
  "buildCode": 1,
  "title": "MyAwesomeApp",
  
  "author": {
    "email": "dev@example.com",
    "name": "Awesome Name",
  },

  "description": {
    "content": "Is description of my awesome dapp!",
    "keywords": ["awesome", "blockchain", "keywords"],
    "homepage": "http://github.com/user/awesome_app",
  },
  
  "security": {
    "permissions": ["storage", "logger", "ipfs"],
  },

  "bundle": {
    "entry"  : "index.html",
    "script" : "bundle.js",
    "assets" : "assets/",
    "icons"  : "icons/"
  },

  "services": [
    "getCats",
    "watchCats"
  ],

  "dependencies": {
    "relative_dapp": "~1.0",
    "second_dapp": "1.0.1",

    "optional_dapp": {
      "optional": true,
      "version": "2.0"
    },

    "services_dapp": {
      "optional": false,
      // List of whitelisted services for dapp
      "services": [ "watchCats", "getHistory" ]
    }
  },

  "libraries": [
    "/ipfs/QmWZtn3ahqqpGBBRZqPdthcWz2n1rxc1UuiDoWXrgrHKzZ",
    "/ipfs/QmWZtn3ahqqpGBBRZqPdthcsdfsdfsdFDSGsgfdsgdfgDFd"
  ]
}
```

permissions, library, dependencies. в чем разница?.
