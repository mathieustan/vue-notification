<template>
  <!-- eslint-disable max-len -->
  <!-- eslint-disable vue/valid-v-for -->
  <div id="app">
    <div class="header">
      <h1>Vue Notification</h1>
    </div>

    <div class="content">
      <div class="content-inner">
        <div class="title">
          <h2> About </h2>
        </div>
        <p>
          Notifications for Vue.js, made with love,
          with nice transition and clean design.
        </p>

        <div class="title">
          <h2> Install </h2>
        </div>
        <p> 1. Install component with npm </p>
        <CodeWrapper type="bash"><span class="token function">npm install </span>@mathieustan/vue-notification --save</CodeWrapper>

        <p> 2. Load component in your project </p>
        <CodeWrapper type="javascript">
<span class="token keyword">import</span> VueNotification <span class="token keyword">from</span><span class="token string"> '@mathieustan/vue-notification'</span>;

<span class="token keyword">Vue</span><span class="token function">.use(</span>VueNotification<span class="token function">)</span>;
        </CodeWrapper>

        <p> 3. Use in a component </p>
        <CodeWrapper type="javascript">
<span class="token keyword">export default </span> {
  <span class="token function">methods</span> : {
    notify (message) {
      this.$notify(message);
    },
  <span>},</span>
}
        </CodeWrapper>

        <div class="title">
          <h2> Examples (props) </h2>
        </div>

        <Wrapper background-color="white" class="column justify-center align-center">
          <template v-slot:description>
            <h3> Default </h3>
            <p><small> Default use of notification </small></p>
          </template>

          <template v-slot:inputs>
            <form>
              <div class="input-group">
                <div class="input-form">
                  <label for="message"> message </label>
                  <input type="text" id="message" name="message" v-model="message">
                </div>
                <div class="input-form">
                  <label for="closeDelay"> closeDelay (ms)</label>
                  <input type="number" id="closeDelay" name="closeDelay" v-model="closeDelay">
                </div>
              </div>

              <div class="input-group">
                <div class="input-form">
                  <Checkbox id="vertical" v-model="vertical" value="top"> Top </Checkbox>
                </div>
                <div class="input-form">
                  <Checkbox id="vertical" v-model="vertical" value="bottom"> Bottom </Checkbox>
                </div>
                <div class="input-form">
                  <Checkbox id="horizontal" v-model="horizontal" value="left"> Left </Checkbox>
                </div>
                <div class="input-form">
                  <Checkbox id="horizontal" v-model="horizontal" value="right"> Right </Checkbox>
                </div>
              </div>
            </form>
          </template>

          <template v-slot:example>
            <button type="button" @click="showNotification"> Show notification </button>
          </template>

          <template v-slot:code>
            <CodeWrapper type="javascript">
  <span class="token operator">&lt;</span>script<span class="token operator">></span>
    ...
    methods<span class="token ponctuation">:</span> {
      showNotification <span class="token ponctuation">()</span> {
        <span class="token keyword">this</span><span class="token ponctuation">.</span>$gnotify({
          <span class="token attr-name">message</span>: "{{message}}"
          <span class="token attr-name">top</span>: {{vertical === 'top'}}
          <span class="token attr-name">bottom</span>: {{vertical === 'bottom'}}
          <span class="token attr-name">left</span>: {{horizontal === 'left'}}
          <span class="token attr-name">right</span>: {{horizontal === 'right'}}
          <span class="token attr-name">closeDelay</span>: {{closeDelay}}
        });
      },
    }
    ...
  <span class="token operator">&lt;/</span>script<span class="token operator">></span>
  </CodeWrapper>
          </template>
      </Wrapper>

      <Wrapper background-color="white" class="column justify-center align-center">
          <template v-slot:description>
            <h3> Types </h3>
            <p><small> Show notification with specific type (info, success, warning, error)</small></p>
          </template>

          <template v-slot:example>
            <button
              type="button"
              @click="showNotification({ type: 'success' })">
              Success notification
            </button>
            <button
              type="button"
              @click="showNotification({ type: 'info' })">
              Info notification
            </button>
            <button
              type="button"
              @click="showNotification({ type: 'warning' })">
              Warning notification
            </button>
            <button
              type="button"
              @click="showNotification({ type: 'error' })">
              Error notification
            </button>
          </template>

          <template v-slot:code>
            <CodeWrapper type="javascript">
  <span class="token operator">&lt;</span>script<span class="token operator">></span>
    ...
    methods<span class="token ponctuation">:</span> {
      showNotification <span class="token ponctuation">()</span> {
        <span class="token keyword">this</span><span class="token ponctuation">.</span>$gnotify.success(<span class="token string">"{{message}}"</span>);
        // OR
        <span class="token keyword">this</span><span class="token ponctuation">.</span>$gnotify.info(<span class="token string">"{{message}}"</span>);
        // OR
        <span class="token keyword">this</span><span class="token ponctuation">.</span>$gnotify.warning(<span class="token string">"{{message}}"</span>);
        // OR
        <span class="token keyword">this</span><span class="token ponctuation">.</span>$gnotify.error(<span class="token string">"{{message}}"</span>);
        // OR
      },
    }
    ...
  <span class="token operator">&lt;/</span>script<span class="token operator">></span>
  </CodeWrapper>
          </template>
      </Wrapper>

      <Wrapper background-color="white" class="column justify-center align-center">
          <template v-slot:description>
            <h3> Hide Icon </h3>
            <p><small> Allow to hide icon from types (success/info/warning/error) </small></p>
          </template>

          <template v-slot:example>
            <button
              type="button"
              @click="showNotification({ type: 'success', hideIcon: true })">
              Success notification (no Icon)
            </button>
            <button
              type="button"
              @click="showNotification({ type: 'info', hideIcon: true })">
              Info notification (no Icon)
            </button>
            <button
              type="button"
              @click="showNotification({ type: 'warning', hideIcon: true })">
              Warning notification (no Icon)
            </button>
            <button
              type="button"
              @click="showNotification({ type: 'error', hideIcon: true })">
              Error notification (no Icon)
            </button>
          </template>

          <template v-slot:code>
            <CodeWrapper type="javascript">
  <span class="token operator">&lt;</span>script<span class="token operator">></span>
    ...
    methods<span class="token ponctuation">:</span> {
      showNotification <span class="token ponctuation">()</span> {
        <span class="token keyword">this</span><span class="token ponctuation">.</span>$gnotify({
          <span class="token attr-name">type</span>: "success"
          <span class="token attr-name">message</span>: "{{message}}"
          <span class="token attr-name">hideIcon</span>: true,
        });
      },
    }
    ...
  <span class="token operator">&lt;/</span>script<span class="token operator">></span>
  </CodeWrapper>
          </template>
      </Wrapper>

      <Wrapper background-color="white" class="column justify-center align-center">
          <template v-slot:description>
            <h3> MultiLine </h3>
            <p><small> Makes the notification higher (mobile) (extra padding) </small></p>
          </template>

          <template v-slot:inputs>
            <form>
              <div class="input-group">
                <div class="input-form">
                  <label for="message"> message </label>
                  <input type="text" id="message" name="message" v-model="message">
                </div>
              </div>
            </form>
          </template>

          <template v-slot:example>
            <button type="button" @click="showNotification({ multiLine: true })"> Show notification </button>
          </template>

          <template v-slot:code>
            <CodeWrapper type="javascript">
  <span class="token operator">&lt;</span>script<span class="token operator">></span>
    ...
    methods<span class="token ponctuation">:</span> {
      showNotification <span class="token ponctuation">()</span> {
        <span class="token keyword">this</span><span class="token ponctuation">.</span>$gnotify({
          <span class="token attr-name">message</span>: "{{message}}"
          <span class="token attr-name">multiLine</span>: true,
        });
      },
    }
    ...
  <span class="token operator">&lt;/</span>script<span class="token operator">></span>
  </CodeWrapper>
          </template>
      </Wrapper>

      <Wrapper background-color="white" class="column justify-center align-center">
          <template v-slot:description>
            <h3> Offset </h3>
            <p><small> Add a vertical offset to notification placement </small></p>
          </template>

          <template v-slot:inputs>
            <form>
              <div class="input-group">
                <div class="input-form">
                  <label for="offset"> offset</label>
                  <input type="number" id="offset" name="offset" v-model="offset">
                </div>
              </div>
            </form>
          </template>

          <template v-slot:example>
            <button type="button" @click="showNotification({ offset })"> Show notification </button>
          </template>

          <template v-slot:code>
            <CodeWrapper type="javascript">
  <span class="token operator">&lt;</span>script<span class="token operator">></span>
    ...
    methods<span class="token ponctuation">:</span> {
      showNotification <span class="token ponctuation">()</span> {
        <span class="token keyword">this</span><span class="token ponctuation">.</span>$gnotify({
          <span class="token attr-name">message</span>: "{{message}}"
          <span class="token attr-name">offset</span>: {{offset}},
        });
      },
    }
    ...
  <span class="token operator">&lt;/</span>script<span class="token operator">></span>
  </CodeWrapper>
          </template>
      </Wrapper>

      <Wrapper background-color="white" class="column justify-center align-center">
          <template v-slot:description>
            <h3> actionText & onActionClick </h3>
            <p><small> Allow to have a button with an action into notification </small></p>
          </template>

          <template v-slot:inputs>
            <form>
              <div class="input-group">
                <div class="input-form">
                  <label for="actionText"> actionText </label>
                  <input type="text" id="actionText" name="actionText" v-model="actionText">
                </div>
              </div>
            </form>
          </template>

          <template v-slot:example>
            <button
              type="button"
              @click="showNotification({ type: 'info', actionText,  })">
              Show notification
            </button>
          </template>

          <template v-slot:code>
            <CodeWrapper type="javascript">
  <span class="token operator">&lt;</span>script<span class="token operator">></span>
    ...
    methods<span class="token ponctuation">:</span> {
      showNotification <span class="token ponctuation">()</span> {
        <span class="token keyword">this</span><span class="token ponctuation">.</span>$gnotify({
          <span class="token attr-name">message</span>: "{{message}}"
          <span class="token attr-name">actionText</span>: {{actionText}}
          <span class="token attr-name">onActionClick</span>: () => ({}),
        });
      },
    }
    ...
  <span class="token operator">&lt;/</span>script<span class="token operator">></span>
  </CodeWrapper>
          </template>
      </Wrapper>

      <Wrapper background-color="white" class="column justify-center align-center">
          <template v-slot:description>
            <h3> showClose </h3>
            <p><small> Show a button to hide notification </small></p>
          </template>

          <template v-slot:example>
            <button
              type="button"
              @click="showNotification({ showClose: true  })">
              Show notification with close button
            </button>
          </template>

          <template v-slot:code>
            <CodeWrapper type="javascript">
  <span class="token operator">&lt;</span>script<span class="token operator">></span>
    ...
    methods<span class="token ponctuation">:</span> {
      showNotification <span class="token ponctuation">()</span> {
        <span class="token keyword">this</span><span class="token ponctuation">.</span>$gnotify({
          <span class="token attr-name">message</span>: "{{message}}"
          <span class="token attr-name">showClose</span>: true,
        });
      },
    }
    ...
  <span class="token operator">&lt;/</span>script<span class="token operator">></span>
  </CodeWrapper>
          </template>
      </Wrapper>

      </div>
    </div>
  </div>
</template>

<script>
import CodeWrapper from './components/CodeWrapper.vue';
import Wrapper from './components/Wrapper.vue';
import Checkbox from './components/Checkbox.vue';

export default {
  name: 'App',
  components: { CodeWrapper, Wrapper, Checkbox },
  data: () => ({
    closeDelay: 4500,
    vertical: 'top',
    horizontal: 'left',
    message: 'Je suis une notification',
    offset: 100,
    actionText: 'Test',
  }),
  methods: {
    showNotification ({
      type,
      multiLine,
      offset,
      actionText,
      onActionClick,
      hideIcon,
      showClose,
    } = {}) {
      this.$notify({
        message: this.message,
        top: this.vertical === 'top',
        bottom: this.vertical === 'bottom',
        left: this.horizontal === 'left',
        right: this.horizontal === 'right',
        closeDelay: this.closeDelay,
        type,
        multiLine,
        offset: offset && Number(offset),
        actionText,
        onActionClick,
        hideIcon,
        showClose,
      });
    },
  },
};
</script>

<style>
  *, ::before, ::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    color: #4a4a4a;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  html {
    background-color: #fff;
    font-size: 16px;
    min-width: 300px;
    text-rendering: optimizeLegibility;
    text-size-adjust: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
</style>

<style lang="scss" scoped>
  @import   './styles/abstracts/functions',
            './styles/abstracts/variables',
            './styles/abstracts/mixins';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    background-color: color(other, gray);
  }

  .header {
    position: relative;
    display: flex;
    height: 100px;
    width: 100%;
    background-color: color(other, blue);
    color: #fff;
    padding: $gutter*2;
  }

  .content {
    max-width: 1000px;
    margin: 0 auto;
    font-size: 20px;
    font-size: 1.25rem;
    line-height: 1.62;
    color: #3b454e;

    .content-inner {
      text-align: left;
      padding: ($gutter*2);

      @include mq(tablet) {
        padding: $gutter*4;
      }
    }
  }

  .title {
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  h2 {
    font-size: 2.5rem;
    line-height: 1;
    color: #121212;
    position: relative;
    margin-top: $gutter*6;
    font-size: 1.875rem;

    @include mq(tablet) {
      font-size: 37px;
    }

    &:first-child {
      margin-top: 40px;
    }

    &:before {
      content: "";
      position: absolute;
      top: calc(100% - #{$gutter});
      left: -#{$gutter};
      background-color: transparentize(color(other, aqua-marine), .7);
      height: $gutter;
      width: calc(100% + #{$gutter*2});
    }
  }

  p {
    position: relative;
    display: flex;

    &:not(:last-child) {
      margin-top: 0;
      margin-bottom: $gutter*2;

      @include mq(tablet) {
        margin-bottom: $gutter*3;
      }
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
    height: auto;
    font-size: 14px;
    font-weight: 500;
    color: white;
    background-color: color(other, dark-purple);
    outline: 0;
    text-decoration: none;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
    user-select: none;

    &:hover {
      background-color: transparentize(color(other, dark-purple), .3);
    }

    & + button {
      margin-left: $gutter*2;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;

    .input-group {
      display: flex;
      flex-direction: column;
      align-items: space-between;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;

      @include mq(tablet) {
        flex-direction: row;
        align-items: center;
      }
    }

    .input-form + .input-form {
      margin: 10px 0 0;

      @include mq(tablet) {
        margin: 0 0 0 $gutter*2;
      }
    }

    .input-form {
      display: flex;
      align-items: center;
      flex: 1 1 auto;
      width: 100%;

      @include mq(tablet) {
        width: auto;
      }
    }

    input {
      position: relative;
      display: flex;
      flex: 1 0 auto;
      min-height: 36px;
      height: 36px;
      min-width: 150px;
      border: 1px solid color(other, light-gray);
      border-radius: get-border-radius(2);
      padding: 0 4px;

      &:active,
      &:focus {
        box-shadow: none;
        outline: 0;
        border-color: color(other, blue);
      }
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
      margin-right: $gutter;
    }
  }
</style>
