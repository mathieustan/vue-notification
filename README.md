# vue-notification

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/45c680bc123449ef9c834b9af8b8d436)](https://www.codacy.com/app/mathieustan/vue-notification?utm_source=github.com&utm_medium=referral&utm_content=mathieustan/vue-notification&utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/45c680bc123449ef9c834b9af8b8d436)](https://www.codacy.com/app/mathieustan/vue-notification?utm_source=github.com&utm_medium=referral&utm_content=mathieustan/vue-notification&utm_campaign=Badge_Coverage)

> A Notification (snackbar) Vue component. Compatible with Vue 2.x

-   [Demo](#demo)
-   [Install](#install)
-   [Usage](#usage)
-   [Props](#available-props)

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

// With breakpoints options
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
