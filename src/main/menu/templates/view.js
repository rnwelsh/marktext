import * as actions from '../actions/view'

export default function (keybindings) {
  const viewMenu = {
    label: '&View',
    submenu: [{
      label: 'Command Palette...',
      accelerator: keybindings.getAccelerator('view.command-palette'),
      click (menuItem, focusedWindow) {
        actions.showCommandPalette(focusedWindow)
      }
    }, {
      type: 'separator'
    }, {
      id: 'sourceCodeModeMenuItem',
      label: 'Source Code Mode',
      accelerator: keybindings.getAccelerator('view.source-code-mode'),
      type: 'checkbox',
      checked: false,
      click (item, focusedWindow) {
        actions.toggleSourceCodeMode(focusedWindow)
      }
    }, {
      id: 'typewriterModeMenuItem',
      label: 'Typewriter Mode',
      accelerator: keybindings.getAccelerator('view.typewriter-mode'),
      type: 'checkbox',
      checked: false,
      click (item, focusedWindow) {
        actions.toggleTypewriterMode(focusedWindow)
      }
    }, {
      id: 'focusModeMenuItem',
      label: 'Focus Mode',
      accelerator: keybindings.getAccelerator('view.focus-mode'),
      type: 'checkbox',
      checked: false,
      click (item, focusedWindow) {
        actions.toggleFocusMode(focusedWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: 'Show Sidebar',
      id: 'sideBarMenuItem',
      accelerator: keybindings.getAccelerator('view.toggle-sidebar'),
      type: 'checkbox',
      checked: false,
      click (item, focusedWindow) {
        actions.toggleSidebar(focusedWindow)
      }
    }, {
      label: 'Show Tab Bar',
      id: 'tabBarMenuItem',
      accelerator: keybindings.getAccelerator('view.toggle-tabbar'),
      type: 'checkbox',
      checked: false,
      click (item, focusedWindow) {
        actions.toggleTabBar(focusedWindow)
      }
    }, {
      label: 'Toggle Table of Contents',
      id: 'tocMenuItem',
      accelerator: keybindings.getAccelerator('view.toggle-toc'),
      click (_, focusedWindow) {
        actions.showTableOfContents(focusedWindow)
      }
    }, {
      label: 'Reload Images',
      accelerator: keybindings.getAccelerator('view.reload-images'),
      click (item, focusedWindow) {
        actions.reloadImageCache(focusedWindow)
      }
    }, 
    // ] } if (global.MARKTEXT_DEBUG) { viewMenu.submenu.push({});
    {
      id: 'separatorDevTools',
      type: 'separator',
      enabled: false,
      visible: false

    },
    {
      label: 'Show Developer Tools',
      id: 'showDevTools',
      accelerator: keybindings.getAccelerator('view.toggle-dev-tools'),
      click (item, win) {
        actions.debugToggleDevTools(win)
      },
      enabled: false,
      visible: false
      
    },
    {
      label: 'Reload window',
      id: 'reloadWindow',
      accelerator: keybindings.getAccelerator('view.dev-reload'),
      click (item, focusedWindow) {
        actions.debugReloadWindow(focusedWindow)
      },
      enabled: false,
      visible: false
    }]
  }
  return viewMenu
}
// export function toggleEnableDevtools(enabled) {
//   if (enabled) {
//     viewMenu.submenu.push({
//       id: 'separatorDevTools',
//       type: 'separator'
//     })
//     viewMenu.submenu.push({
//       label: 'Show Developer Tools',
//       id: 'showDevTools',
//       accelerator: keybindings.getAccelerator('view.toggle-dev-tools'),
//       click (item, win) {
//         actions.debugToggleDevTools(win)
//       }
//     })
//     viewMenu.submenu.push({
//       label: 'Reload window',
//       id: 'reloadWindow',
//       accelerator: keybindings.getAccelerator('view.dev-reload'),
//       click (item, focusedWindow) {
//         actions.debugReloadWindow(focusedWindow)
//       }
//     })
//     return;
//   }
  
// }
