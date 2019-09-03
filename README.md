# vue-notification

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/45c680bc123449ef9c834b9af8b8d436)](https://www.codacy.com/app/mathieustan/vue-notification?utm_source=github.com&utm_medium=referral&utm_content=mathieustan/vue-notification&utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/45c680bc123449ef9c834b9af8b8d436)](https://www.codacy.com/app/mathieustan/vue-notification?utm_source=github.com&utm_medium=referral&utm_content=mathieustan/vue-notification&utm_campaign=Badge_Coverage)

> A Notification (snackbar) Vue component. Compatible with Vue 2.x

-   [Demo](#demo)
-   [Install](#install)
-   [Usage](#usage)
-   [Props](#available-props)
-   [Theme](#theme)

## Demo

To view a demo online: <https://vue-notification.netlify.com/>

## Install

```bash
npm install @mathieustan/vue-notification --save
```

or

```bash
yarn add @mathieustan/vue-notification
```

```javascript
import VueNotification from '@mathieustan/vue-notification';
Vue.use(VueNotification);

// Or with options (like breakpoints)
Vue.use(VueNotification, {
  breakpoints: {
    0: {
      bottom: true,
    },
    480: {
      top: true,
      right: true,
    },
  },
});
```

## Usage

```javascript
<script>
export default {
  // ...
  methods: {
    showNotification () {
      this.$notify('Hello, I am a notification');
    },
  },
  //...
};
```

## Available props

| Prop          | Type     | Default | Description                                                                   |
| ------------- | -------- | ------- | ----------------------------------------------------------------------------- |
| message       | String   | ''      | Message to show on notification                                               |
| type          | String   |         | Show notification with specific type (info, success, warning, error, offline) |
| top           | Boolean  | false   | Allow to position notification 'top'                                          |
| bottom        | Boolean  | true    | Allow to position notification 'bottom'                                       |
| left          | Boolean  | false   | Allow to position notification 'left'                                         |
| right         | Boolean  | false   | Allow to position notification 'right'                                        |
| offset        | Number   | 0       | Add extra offset to notification (from top)                                   |
| closeDelay    | Number   | 4500    | Delay before closing notification (in ms)                                     |
| multiLine     | Boolean  | false   | Makes the notification higher (mobile) (extra padding)                        |
| actionText    | String   | ''      | Will add a button with this text after message                                |
| onActionClick | Function |         | Action when button will be clicked                                            |
| showClose     | Boolean  | false   | Will add a close button                                                       |
| hideIcon      | Boolean  | false   | Allow to hide icon for types (success,info,...)                               |
| fullWidth     | Boolean  | false   | Force notification to full width                                              |
| theme         | Object   | false   | Update default theme (More informations here [Theme](#theme))                 |

## Theme

:rocket: It's now possible to surcharge default theme colors & box-shadow.
Theme object looks like this :point_down:

```javascript
{
  colors: {
    success: '#4f88ff',
    successDarken: '#2d71fe',
    info: '#5d6a89',
    infoDarken: '#535f7b',
    warning: '#f8a623',
    warningDarken: '#f69a07',
    error: '#ff4577',
    errorDarken: '#ff245f',
    offline: '#ff4577',
    offlineDarken: '#ff245f',
  },
  boxShadow: `0px 3px 5px -1px rgba(0,0,0,0.2),
    0px 6px 10px 0px rgba(0,0,0,0.14),
    0px 1px 18px 0px rgba(0,0,0,0.12)`,
}
```

**Examples : There are two ways to update theme.**

1.  Options when init VueNotification

```javascript
import VueNotification from '@mathieustan/vue-notification';
Vue.use(VueNotification, {
  theme: {
    // darken colors are used for background on icon
    colors: {
      success: '#54d861',
      darkenSuccess: '#2d8e36',
      info: '#5d6a89',
      darkenInfo: '#535f7b',
      warning: '#f8a623',
      darkenWarning: '#f69a07',
      error: '#ff4577',
      darkenError: '#ff245f',
      offline: '#ff4577',
      darkenOffline: '#ff245f',
    },
    boxShadow: '10px 5px 5px red',
  },
});
```

2.  Theme properties when calling $notify

```javascript
<script>
export default {
  // ...
  methods: {
    showNotification () {
      this.$notify({
        message: 'Hello Wolrd',
        theme: {
          colors: {
            success: '#54d861',
            darkenSuccess: '#2d8e36',
            info: '#5d6a89',
            darkenInfo: '#535f7b',
            warning: '#f8a623',
            darkenWarning: '#f69a07',
            error: '#ff4577',
            darkenError: '#ff245f',
            offline: '#ff4577',
            darkenOffline: '#ff245f',
          },
          boxShadow: '10px 5px 5px red',
        },
      });
    },
  },
  //...
};
```
