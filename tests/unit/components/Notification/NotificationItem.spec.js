import { shallowMount } from '@vue/test-utils';
import NotificationItem from '@/components/Notification/NotificationItem.vue';

import { Z_INDEX_LIST } from '../../../../src/constants';

jest.useFakeTimers();

describe('NotificationItem', () => {
  let mountComponent;

  beforeEach(() => {
    mountComponent = ({
      value = true,
      position,
      absolute,
      top,
      bottom,
      right,
      left,
      multiLine,
    } = {}) =>
      shallowMount(NotificationItem, {
        propsData: {
          value,
          position,
          absolute,
          top,
          bottom,
          right,
          left,
          multiLine,
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
          { value: true, absolute: false, top: true, bottom: false, right: false, left: false },
          {
            'notification--active': true,
            'notification--multi-line': false,
            'notification--absolute': false,
            'notification--bottom': false,
            'notification--left': false,
            'notification--right': false,
            'notification--top': true,
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
  });

  describe('beforeDestroy', () => {
    it('should do nothing if $refs.notification isn\'t defined', () => {
      const wrapper = mountComponent();
      wrapper.vm.$refs = {};
      wrapper.destroy();
      expect(wrapper.vm.$refs.notification).toEqual(undefined);
    });

    it('should remove element from Dom ONLY IF $refs.notification is defined', () => {
      const wrapper = mountComponent();
      wrapper.vm.$refs = {
        notification: {
          parentNode: { removeChild: jest.fn(() => true) },
        },
      };

      wrapper.destroy();
      expect(wrapper.vm.$refs.notification.parentNode.removeChild).toHaveBeenCalled();
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
