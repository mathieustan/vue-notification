<template>
  <transition name="notification-transition">
    <div
      v-if="isActive"
      :style="positionStyle"
      :class="[this.type && `notification--${this.type}`, this.classes]"
      v-on="$listeners"
      ref="notification"
      class="notification">
      <div
        :style="{ 'backgroundColor': color }"
        class="notification__wrapper">
        <div class="notification__content">
          <span class="notification__message">
            <span v-if="type && ICONS[type] && !hideIcon" class="notification__icon">
              <svg :viewBox="ICONS[type].viewBox" role="img" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" :d="ICONS[type].path" />
              </svg>
            </span>
            <p>{{ message }} </p>
          </span>
          <button
            v-if="actionText"
            class="notification__action"
            type="button"
            @click="onActionClick">
            {{ actionText }}
          </button>
          <button
            v-if="showClose"
            class="notification__close"
            type="button"
            @click="close">
            <svg :viewBox="ICONS.close.viewBox" role="img" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" :d="ICONS.close.path" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import positionable from '../../mixins/positionable';
import toggleable from '../../mixins/toggleable';
import colorable from '../../mixins/colorable';

import { Z_INDEX_LIST } from '../../constants';

const ICONS = {
  /* eslint-disable */
  success: {
    path: 'M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z',
    viewBox: '0 0 512 512',
  },
  info: {
    path: 'M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z',
    viewBox: '0 0 192 512',
  },
  warning: {
    path: 'M248.747 204.705l6.588 112c.373 6.343 5.626 11.295 11.979 11.295h41.37a12 12 0 0 0 11.979-11.295l6.588-112c.405-6.893-5.075-12.705-11.979-12.705h-54.547c-6.903 0-12.383 5.812-11.978 12.705zM330 384c0 23.196-18.804 42-42 42s-42-18.804-42-42 18.804-42 42-42 42 18.804 42 42zm-.423-360.015c-18.433-31.951-64.687-32.009-83.154 0L6.477 440.013C-11.945 471.946 11.118 512 48.054 512H527.94c36.865 0 60.035-39.993 41.577-71.987L329.577 23.985zM53.191 455.002L282.803 57.008c2.309-4.002 8.085-4.002 10.394 0l229.612 397.993c2.308 4-.579 8.998-5.197 8.998H58.388c-4.617.001-7.504-4.997-5.197-8.997z',
    viewBox: '0 0 576 512',
  },
  error: {
    path: 'M248.747 204.705l6.588 112c.373 6.343 5.626 11.295 11.979 11.295h41.37a12 12 0 0 0 11.979-11.295l6.588-112c.405-6.893-5.075-12.705-11.979-12.705h-54.547c-6.903 0-12.383 5.812-11.978 12.705zM330 384c0 23.196-18.804 42-42 42s-42-18.804-42-42 18.804-42 42-42 42 18.804 42 42zm-.423-360.015c-18.433-31.951-64.687-32.009-83.154 0L6.477 440.013C-11.945 471.946 11.118 512 48.054 512H527.94c36.865 0 60.035-39.993 41.577-71.987L329.577 23.985zM53.191 455.002L282.803 57.008c2.309-4.002 8.085-4.002 10.394 0l229.612 397.993c2.308 4-.579 8.998-5.197 8.998H58.388c-4.617.001-7.504-4.997-5.197-8.997z',
    viewBox: '0 0 576 512',
  },
  close: {
    path: 'M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z',
    viewBox: '0 0 320 512'
  },
  /* eslint-enable */
};

export default {
  name: 'NotificationItem',
  mixins: [positionable, toggleable, colorable],
  props: {
    // Can be : success / info / warning / error
    type: { type: String },
    hideIcon: { type: Boolean, default: false },
    // Text to show on notification
    message: { type: String, default: String },
    // A position name like (top-left) only used to categorize notification emplacement
    position: { type: String, default: String },
    // Makes the notification higher (mobile)
    multiLine: { type: Boolean, default: false },
    // Offset to show notification
    verticalOffset: { type: Number, default: 16 },
    // Delay before closing notification
    closeDelay: { type: Number, default: 4500 },
    // Action button
    actionText: { type: String, default: undefined },
    onActionClick: { type: Function, default: undefined },
    // show a close button
    showClose: { type: Boolean, default: false },
    // zindex
    zIndex: { type: Number, default: Z_INDEX_LIST.notification },
  },
  data: () => ({
    ICONS,
    activeTimeout: -1,
  }),
  computed: {
    classes () {
      return {
        'notification--active': this.isActive,
        'notification--multi-line': this.multiLine,
        'notification--absolute': this.absolute,
        'notification--bottom': this.bottom || !this.top,
        'notification--left': this.left,
        'notification--right': this.right,
        'notification--top': this.top,
      };
    },
    verticalProperty () {
      return /^top/.test(this.position) ? 'top' : 'bottom';
    },
    positionStyle () {
      return {
        zIndex: this.zIndex,
        [this.verticalProperty]: `${this.verticalOffset}px`,
      };
    },
  },
  beforeDestroy () {
    if (!this.$refs.notification) return;
    this.$refs.notification.parentNode.removeChild(this.$refs.notification);
  },
  watch: {
    isActive: {
      async handler () {
        await this.$nextTick();
        this.setTimeout();
      },
      immediate: true,
    },
  },
  methods: {
    setTimeout () {
      clearTimeout(this.activeTimeout);
      if (!this.isActive || !this.closeDelay) return;
      this.activeTimeout = setTimeout(() => {
        this.isActive = false;
      }, this.closeDelay);
    },
    close () {
      this.isActive = false;
    },
  },
};
</script>

<style>
  *, ::before, ::after {
    box-sizing: border-box;
  }
</style>

<style lang="scss" scoped>
  @import   '../../styles/abstracts/functions',
            '../../styles/abstracts/variables',
            '../../styles/abstracts/mixins';

  .notification {
    position: fixed;
    display: flex;
    align-items: center;
    left: 0;
    right: 0;
    font-size: 14px;
    color: white;
    pointer-events: none;
    transition: all .4s get-easing(swing);
    transition-property: transform, top, bottom, opacity;

    &--absolute {
      position: absolute;
    }

    &--top {
      top: 0;
    }

    &--bottom {
      bottom: 0;
    }

    &--left,
    &--right {
      @include mq(phone) {
        margin: 0 ($gutter*3);

        &.notification--top {
          transform: translateY($gutter*3);
        }
        &.notification--bottom {
          transform: translateY(0 - ($gutter*3));
        }
      }
    }

    &__wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      background-color: black;
      pointer-events: auto;
      box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
        0px 6px 10px 0px rgba(0,0,0,0.14),
        0px 1px 18px 0px rgba(0,0,0,0.12);

      .notification--success & {
        background-color: color(other, blue);
      }
      .notification--info & {
        background-color: color(other, dark-gray);
      }
      .notification--warning & {
        background-color: color(other, orange);
      }
      .notification--error & {
        background-color: color(other, pink);
      }

      @include mq(phone) {
        width: auto;
        max-width: 568px;
        min-width: 288px;
        margin: 0 auto;
        border-radius: get-border-radius(1);

        .notification--left & {
          margin-left: 0
        }
        .notification--right & {
          margin-right: 0
        }
      }
    }

    &__content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 48px;
      padding: ($gutter*2) ($gutter*3);
      overflow: hidden;
    }

    &--multi-line &__content {
      height: 80px;
      padding: 24px;
    }

    &__message {
      position: relative;
      display: flex;
      align-items: center;
      flex-grow: 1;

      p {
        font-stretch: normal;
        letter-spacing: .23px;
        line-height: inherit;
        font-weight: 400;
        margin: 0;
      }
    }

    &__close {
      svg {
        position: relative;
        height: 20px;
        width: 20px;
      }
    }

    button {
      @include reset-button();
      position: relative;
      display: inline-flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      border-radius: get-border-radius(1);
      cursor: pointer;

      padding: $gutter;
      margin: 0 0 0 $gutter*2;
      height: auto;
      color: white;
      font-size: 14px;
      font-weight: 500;
      outline: 0;
      text-decoration: none;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
      user-select: none;

      &:hover {
        background-color: transparentize(black, .9);
      }

      &:first-of-type {
        margin: 0 0 0 $gutter*3;
      }

      &.notification__close {
        border-radius: 50%;
      }
      &.notification__action {
        background-color: transparentize(black, .9);
        &:hover {
          background-color: transparentize(black, .7);
        }
      }
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: get-border-radius(1);
      width: 26px;
      height: 26px;
      margin-right: ($gutter*2);

      .notification--success & {
        background-color: darken(color(other, blue), 10%);
      }
      .notification--info & {
        background-color: darken(color(other, dark-gray), 5%);
      }
      .notification--warning & {
        background-color: darken(color(other, orange), 10%);
      }
      .notification--error & {
        background-color: darken(color(other, pink), 10%);
      }

      svg {
        position: relative;
        width: 16px;
        height: 16px;
      }
    }
  }

  .notification-transition {
    &-enter-active,
    &-leave-active {
      transition: transform .4s get-easing(swing);

      .notification__content {
        transition: opacity .3s linear .1s;
      }
    }

    &-enter {
      .notification__content {
        opacity: 0;
      }
    }

    &-enter-to,
    &-leave {
      .notification__content {
        opacity: 1;
      }
    }

    &-enter,
    &-leave-to {
      &.notification.notification--top {
        // Extra 8px to hide the bottom shadow
        transform: translateY(calc(-100% - 8px));

        @include mq(phone) {
          &.notification--right {
            transform: translateY($gutter*3) translateX(calc(100% + 8px));
          }
          &.notification--left {
            transform: translateY($gutter*3) translateX(calc(-100% - 8px));
          }
        }
      }
      &.notification.notification--bottom {
        transform: translateY(100%);

        @include mq(phone) {
          &.notification--right {
            transform: translateY(0 - ($gutter*3)) translateX(calc(100% + 8px));
          }
          &.notification--left {
            transform: translateY(0 - ($gutter*3)) translateX(calc(-100% - 8px));
          }
        }
      }
    }
  }
</style>
