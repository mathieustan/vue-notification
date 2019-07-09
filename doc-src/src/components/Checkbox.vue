<template>
  <div
    :class="{
      'checkbox--checked': isActive,
      'checkbox--focused': isFocused,
    }"
    class="checkbox"
    >
    <div
      class="checkbox-container"
      @click="onClick">
      <input
        :id="`checkbox_${id}`"
        :value="value"
        type="checkbox"
        tabindex="0"
        @focus="updateFocus(true)"
        @blur="updateFocus(false)">
      <div class="checkbox-background">
        <svg
          xml:space="preserve"
          class="checkbox-checkmark"
          focusable="false"
          version="1.1"
          viewBox="0 0 24 24">
          <path
            class="checkbox-checkmark-path"
            d="M4.1,12.7 9,17.6 20.3,6.3"
            fill="none"
            stroke="white" />
        </svg>
        <div class="checkbox-mixedmark" />
      </div>
    </div>
    <label :for="`checkbox_${id}`">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'inputValue',
    event: 'change',
  },
  props: {
    id: { type: String, default: '0' },
    inputValue: { type: [Boolean, String], default: undefined },
    value: { type: [Boolean, String], default: undefined },
  },
  data: () => ({
    isFocused: false,
  }),
  computed: {
    isActive () {
      return this.inputValue === this.value;
    },
  },
  methods: {
    updateFocus (value) {
      this.isFocused = value;
    },
    onClick () {
      if (this.isActive) {
        this.$emit('change', undefined);
        return;
      }
      this.$emit('change', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import   '../styles/abstracts/functions',
            '../styles/abstracts/variables',
            '../styles/abstracts/mixins';

  .checkbox {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    height: 36px;
    min-height: 36px;
    cursor: pointer;

    @include mq(tablet) {
      height: 48px;
      min-height: 48px;
    }

    // Checked
    // -----------------------
    &--checked {
      color: color(other, blue);

      .checkbox-container {
        border-color: color(other, blue);

        .checkbox-background {
          opacity: 1;
          background-color: color(other, blue);

          .checkbox-checkmark {
            opacity: 1;
          }

          .checkbox-checkmark-path {
            stroke-dashoffset: 0;
            animation: 180ms linear 0s anim-path-unchecked-checked;
          }

          .checkbox-mixedmark {
            transform: scaleX(1) rotate(-45deg);
          }
        }
      }
    }
    // Focused
    // -----------------------
    &--focused {
      .checkbox-container {
        box-shadow: 0 2px 8px rgba(50, 50, 93, 0.2);
      }
    }

    // Default design
    // -----------------------
    &-container {
      display: inline-flex;
      flex: 0 0 auto;
      position: relative;
      width: 20px;
      min-width: 20px;
      height: 20px;
      border-radius: get-border-radius(1);
      border: 2px solid color(other, light-gray-blue);
      transition: .4s cubic-bezier(.25,.8,.25,1);
      transition-property: background-color, border-color;

      input {
        position: absolute;
        bottom: 0;
        left: 50%;
        height: 1px;
        width: 1px;
        border: 0;
        clip: rect(0 0 0 0);
        margin: -1px;
        padding: 0;
        outline: 0;
        -webkit-appearance: none;
        overflow: hidden;
      }
    }

    &-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      opacity: 0;

      display: inline-flex;
      justify-content: center;
      align-items: center;

      transition: background-color 90ms cubic-bezier(0,0,.2,.1),
        opacity 90ms cubic-bezier(0,0,.2,.1);
    }

    &-checkmark {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
    }

    &-checkmark-path {
      stroke-dashoffset: 22.91026;
      stroke-dasharray: 22.91026;
      stroke-width: 2.13333px;
      animation: 90ms linear 0s anim-path-checked-unchecked;
    }

    &-mixedmark {
      width: calc(100% - 6px);
      height: 2px;
      opacity: 0;
      transform: scaleX(0) rotate(0);
      border-radius: 2px;
      background-color: #fafafa;
    }

    label {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      height: 20px;
      font-size: 15px;
      padding: 0;
      cursor: inherit;
      margin-left: $gutter;
    }
  }
</style>
