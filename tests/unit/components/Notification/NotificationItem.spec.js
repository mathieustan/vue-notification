import { shallowMount } from '@vue/test-utils';
import NotificationItem from '@/components/Notification/NotificationItem.vue';

import { Z_INDEX_LIST, NOTIFICATION_ICONS, NOTIFICATION_THEME } from '../../../../src/constants';

jest.useFakeTimers();

describe('NotificationItem', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = ({
      value = true,
      type,
      position,
      absolute,
      top,
      bottom,
      right,
      left,
      multiLine,
      fullWidth,
      theme,
    } = {}) =>
      shallowMount(NotificationItem, {
        propsData: {
          value,
          type,
          position,
          absolute,
          top,
          bottom,
          right,
          left,
          multiLine,
          fullWidth,
          theme,
        },
      });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.activeTimeout).toEqual(-1);
    expect(wrapper.vm.isActive).toEqual(true);
    expect(wrapper.vm.absolute).toEqual(false);
    expect(wrapper.vm.top).toEqual(false);
    expect(wrapper.vm.bottom).toEqual(false);
    expect(wrapper.vm.right).toEqual(false);
    expect(wrapper.vm.left).toEqual(false);
    expect(wrapper.vm.message).toEqual('');
    expect(wrapper.vm.position).toEqual('');
    expect(wrapper.vm.closeDelay).toEqual(4500);
  });

  describe('computed', () => {
    describe('classes', () => {
      it.each([
        [
          { value: true, absolute: false, top: true, bottom: false, right: false, left: false, fullWidth: true },
          {
            'notification--active': true,
            'notification--multi-line': false,
            'notification--absolute': false,
            'notification--bottom': false,
            'notification--left': false,
            'notification--right': false,
            'notification--top': true,
            'notification--full-width': true,
          },
        ],
        [
          { value: true, absolute: true, top: true, bottom: false, right: true, left: false, multiLine: true },
          {
            'notification--active': true,
            'notification--multi-line': true,
            'notification--absolute': true,
            'notification--bottom': false,
            'notification--left': false,
            'notification--right': true,
            'notification--top': true,
            'notification--full-width': false,
          },
        ],
      ])('when props = %p, should return %p', (props, expectedResult) => {
        const wrapper = mountComponent(props);
        expect(wrapper.vm.classes).toEqual(expectedResult);
      });
    });

    describe('verticalProperty', () => {
      it.each([
        ['top-left', 'top'],
        ['top-right', 'top'],
        ['top', 'top'],
        ['bottom-left', 'bottom'],
        ['bottom-right', 'bottom'],
        ['bottom', 'bottom'],
      ])('when position = %p, should return %p', (position, expectedResult) => {
        const wrapper = mountComponent({ position });
        expect(wrapper.vm.verticalProperty).toEqual(expectedResult);
      });
    });

    describe('positionStyle', () => {
      it.each([
        ['top-left', { top: '16px' }],
        ['top-right', { top: '16px' }],
        ['top', { top: '16px' }],
        ['bottom-left', { bottom: '16px' }],
        ['bottom-right', { bottom: '16px' }],
        ['bottom', { bottom: '16px' }],
      ])('when position = %p, should return %p', (position, expectedResult) => {
        const wrapper = mountComponent({ position });
        expect(wrapper.vm.positionStyle).toEqual({
          ...expectedResult,
          zIndex: Z_INDEX_LIST.notification,
        });
      });
    });

    describe('wrapperStyle', () => {
      it.each([
        [undefined, undefined, { 'box-shadow': NOTIFICATION_THEME.boxShadow }],
        [undefined, 'success', {
          'background-color': NOTIFICATION_THEME.colors.success,
          'border-color': NOTIFICATION_THEME.colors.success,
          'box-shadow': NOTIFICATION_THEME.boxShadow,
        }],
        [{ colors: { success: '#FFFFFF' } }, 'success', {
          'background-color': '#FFFFFF',
          'border-color': '#FFFFFF',
        }],
      ])(
        'when theme = %p & type = %p, should return %p',
        (theme, type, expectedResult) => {
          const wrapper = mountComponent({ theme, type });
          expect(wrapper.vm.wrapperStyle).toEqual(expectedResult);
        },
      );
    });

    describe('iconStyle', () => {
      it.each([
        [undefined, undefined, {}],
        [undefined, 'success', {
          'background-color': NOTIFICATION_THEME.colors.successDarken,
          'border-color': NOTIFICATION_THEME.colors.successDarken,
        }],
        [{ colors: { successDarken: '#FFFFFF' } }, 'success', {
          'background-color': '#FFFFFF',
          'border-color': '#FFFFFF',
        }],
      ])(
        'when theme = %p & type = %p, should return %p',
        (theme, type, expectedResult) => {
          const wrapper = mountComponent({ theme, type });
          expect(wrapper.vm.iconStyle).toEqual(expectedResult);
        },
      );
    });

    describe('iconType', () => {
      it.each([
        [undefined, undefined],
        ['success', {
          height: 16,
          path: NOTIFICATION_ICONS.success.path,
          viewBox: NOTIFICATION_ICONS.success.viewBox,
        }],
        ['info', {
          height: 14,
          path: NOTIFICATION_ICONS.info.path,
          viewBox: NOTIFICATION_ICONS.info.viewBox,
        }],
        ['warning', {
          height: 14,
          path: NOTIFICATION_ICONS.warning.path,
          viewBox: NOTIFICATION_ICONS.warning.viewBox,
        }],
        ['error', {
          height: 16,
          path: NOTIFICATION_ICONS.error.path,
          viewBox: NOTIFICATION_ICONS.error.viewBox,
        }],
        ['offline', {
          height: 14,
          path: NOTIFICATION_ICONS.offline.path,
          viewBox: NOTIFICATION_ICONS.offline.viewBox,
        }],
      ])('when type = %p, should return %p', (type, expectedResult) => {
        const wrapper = mountComponent({ type });
        expect(wrapper.vm.iconType).toEqual(expectedResult);
      });
    });
  });

  describe('watch', () => {
    describe('isActive', () => {
      it('should call setTimeout and set isActive to false', async () => {
        const wrapper = mountComponent({ value: true });
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.isActive).toBeTruthy();

        jest.runOnlyPendingTimers();
        expect(wrapper.vm.isActive).toBeFalsy();
      });
    });
  });

  describe('methods', () => {
    describe('destroyElement', () => {
      it('should destroy component & remove it from DOM', () => {
        const wrapper = mountComponent({ value: true });
        Object.defineProperty(
          wrapper.element,
          'parentNode',
          { value: { removeChild: jest.fn(() => true) } },
        );

        wrapper.vm.destroyElement();
        expect(wrapper.element.parentNode.removeChild).toHaveBeenCalled();
      });
    });

    describe('close', () => {
      it('should set isActive to false', () => {
        const wrapper = mountComponent({ value: true });
        expect(wrapper.vm.isActive).toEqual(true);

        wrapper.vm.close();
        expect(wrapper.vm.isActive).toEqual(false);
      });
    });
  });
});
