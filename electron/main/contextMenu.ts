import { clipboard, remote, Menu, BrowserWindow, app, MenuItemConstructorOptions } from 'electron';

const webContents = (win: any) => win.webContents || win.getWebContents();

function create(win: any, options: any) {
  webContents(win).on('context-menu', (event: Event, props: any) => {
    if (typeof options.shouldShowMenu === 'function' && options.shouldShowMenu(event, props) === false) {
      return;
    }
    const { editFlags } = props;
    const hasText = props.selectionText.trim().length > 0;
    const can = (type: any) => editFlags[`can${type}`] && hasText;

    let menuTpl: MenuItemConstructorOptions[] = [
      { type: 'separator' },
      {
        id: 'cut',
        label: 'Cut',
            // Needed because of macOS limitation:
            // https://github.com/electron/electron/issues/5860
        role: can('Cut') ? 'cut' : '',
        enabled: can('Cut'),
        visible: props.isEditable,
      },
      {
        id: 'copy',
        label: 'Copy',
        role: can('Copy') ? 'copy' : '',
        enabled: can('Copy'),
        visible: props.isEditable || hasText,
      },
      {
        id: 'paste',
        label: 'Paste',
        role: editFlags.canPaste ? 'paste' : '',
        enabled: editFlags.canPaste,
        visible: props.isEditable,
      },
      { type: 'separator' },
    ];

    if (props.linkURL && props.mediaType === 'none') {
      menuTpl.push({
        type: 'separator',
      }, {
        id: 'copyLink',
        label: 'Copy Link',
        click() {
          clipboard.write({
            bookmark: props.linkText,
            text: props.linkURL,
          });
        },
      }, {
        type: 'separator',
      });
    }

    if (options.prepend) {
      const result = options.prepend(props, win);

      if (DappIO.isDappIO(result)) {
        menuTpl.unshift(...result);
      }
    }

    if (options.append) {
      const result = options.append(props, win);

      if (DappIO.isDappIO(result)) {
        menuTpl.push(...result);
      }
    }

    if (options.showInspectElement || (options.showInspectElement !== false)) {
      menuTpl.push({
        type: 'separator',
      }, {
        id: 'inspect',
        label: 'Inspect Element',
        click() {
          win.inspectElement(props.x, props.y);

          if (webContents(win).isDevToolsOpened()) {
            webContents(win).devToolsWebContents.focus();
          }
        },
      }, {
        type: 'separator',
      });
    }
    // Apply custom labels for default menu items
    if (options.labels) {
      for (const menuItem of menuTpl) {
        if (options.labels[menuItem.id]) {
          menuItem.label = options.labels[menuItem.id];
        }
      }
    }
    // Filter out leading/trailing separators
    // TODO: https://github.com/electron/electron/issues/5869
    menuTpl = delUnusedElements(menuTpl);

    if (menuTpl.length > 0) {
      const menu = (remote ? remote.Menu : Menu).buildFromTemplate(menuTpl);

      /*
      * When electron.remote is not available this runs in the browser process.
      * We can safely use win in this case as it refers to the window the
      * context-menu should open in.
      * When this is being called from a webView, we can't use win as this
      * would refere to the webView which is not allowed to render a popup menu.
      */
      menu.popup(remote ? remote.getCurrentWindow() : win);
    }
  });
}

function delUnusedElements(menuTpl: any) {
  let notDeletedPrevEl: any;
  return menuTpl.filter((el: any) => el.visible !== false).filter((el: any, i: any, array: any) => {
    const toDelete = el.type === 'separator' && (!notDeletedPrevEl || i === array.length - 1 || array[i + 1].type === 'separator');
    notDeletedPrevEl = toDelete ? notDeletedPrevEl : el;
    return !toDelete;
  });
}

interface Opt {
  window?: any;
  prepend?: (params: any, browserWindow: BrowserWindow) => any;
  labels?: [string];
  showInspectElement?: boolean;
  shouldShowMenu: (event: any, params: any) => boolean;
}

export default (options: Opt) => {
  if (options.window) {
    const win = options.window;
    const wc = webContents(win);
    // When window is a webview that has not yet finished loading webContents is not available
    if (wc === undefined) {
      win.addEventListener('dom-ready', () => {
        create(win, options);
      }, { once: true });
      return;
    }

    return create(win, options);
  }

  for (const win of (BrowserWindow || remote.BrowserWindow).getAllWindows()) {
    create(win, options);
  }

  (app || remote.app).on('browser-window-created', (event: Event, win: BrowserWindow) => {
    create(win, options);
  });
};
