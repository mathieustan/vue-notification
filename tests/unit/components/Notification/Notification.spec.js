import Vue from 'vue';
import Notification from '@/components/Notification';

jest.useFakeTimers();

describe('Notification', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    Notification.closeAll();

    const notifications = document.querySelectorAll('.notification');
    if (!notifications || notifications.length === 0) return;

    notifications.forEach(notification => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });
  });

  it('automatically close', async () => {
    const instance = Notification({ message: 'test', closeDelay: 200 });
    await Vue.nextTick();

    expect(instance.isActive).toEqual(true);
    expect(document.querySelector('.notification')).toBeDefined();

    jest.runOnlyPendingTimers();
    expect(instance.isActive).toEqual(false);
  });

  it('Should close when input value change & equal false', async () => {
    jest.spyOn(Notification, 'close');
    const instance = Notification({ message: 'test', closeDelay: 0 });
    await Vue.nextTick();
    instance.$emit('input', true);
    expect(Notification.close).not.toHaveBeenCalled();

    instance.$emit('input', false);
    expect(Notification.close).toHaveBeenCalled();
  });

  describe('Notification params', () => {
    it('Notification WITHOUT params', async () => {
      const instance = Notification();
      expect(instance.value).toEqual(true);

      await Vue.nextTick();

      expect(instance.isActive).toEqual(true);
      expect(instance.message).toEqual('');
      expect(instance.top).toEqual(false);
      expect(instance.right).toEqual(false);
      expect(instance.left).toEqual(false);
      expect(instance.bottom).toEqual(false);

      jest.runOnlyPendingTimers();
      expect(instance.isActive).toEqual(false);
    });

    it('Notification with simple message', async () => {
      const instance = Notification('simple message');
      expect(instance.value).toEqual(true);

      await Vue.nextTick();

      expect(instance.isActive).toEqual(true);
      expect(instance.message).toEqual('simple message');
      expect(instance.top).toEqual(false);
      expect(instance.right).toEqual(false);
      expect(instance.left).toEqual(false);
      expect(instance.bottom).toEqual(false);
      jest.runOnlyPendingTimers();
      expect(instance.isActive).toEqual(false);
    });

    it('Notification with params', async () => {
      const instance = Notification({
        message: 'simple message',
        top: true,
        left: true,
      });
      expect(instance.value).toEqual(true);

      await Vue.nextTick();

      expect(instance.isActive).toEqual(true);
      expect(instance.message).toEqual('simple message');
      expect(instance.top).toEqual(true);
      expect(instance.right).toEqual(false);
      expect(instance.left).toEqual(true);
      expect(instance.bottom).toEqual(false);
      jest.runOnlyPendingTimers();
      expect(instance.isActive).toEqual(false);
    });

    it('Notification with a simple message & options', async () => {
      Notification.options = { breakpoints: { 0: { top: true, right: true } } };
      const instance = Notification('simple message');
      expect(instance.value).toEqual(true);

      await Vue.nextTick();

      expect(instance.isActive).toEqual(true);
      expect(instance.message).toEqual('simple message');
      expect(instance.top).toEqual(true);
      expect(instance.right).toEqual(true);
      expect(instance.left).toEqual(false);
      expect(instance.bottom).toEqual(false);
      jest.runOnlyPendingTimers();
      expect(instance.isActive).toEqual(false);
    });

    it('Notification with a simple message & UNDEFINED options', async () => {
      Notification.options = undefined;
      const instance = Notification('simple message');
      expect(instance.value).toEqual(true);

      await Vue.nextTick();

      expect(instance.isActive).toEqual(true);
      expect(instance.message).toEqual('simple message');
      expect(instance.top).toEqual(false);
      expect(instance.right).toEqual(false);
      expect(instance.left).toEqual(false);
      expect(instance.bottom).toEqual(false);
      jest.runOnlyPendingTimers();
      expect(instance.isActive).toEqual(false);
    });

    it('Notification with a simple message & WRONG options', async () => {
      Notification.options = { breakpoints: { toto: { top: true, right: true } } };
      const instance = Notification('simple message');
      expect(instance.value).toEqual(true);

      await Vue.nextTick();

      expect(instance.isActive).toEqual(true);
      expect(instance.message).toEqual('simple message');
      expect(instance.top).toEqual(false);
      expect(instance.right).toEqual(false);
      expect(instance.left).toEqual(false);
      expect(instance.bottom).toEqual(false);
      jest.runOnlyPendingTimers();
      expect(instance.isActive).toEqual(false);
    });
  });

  describe('Notification Type', () => {
    it('Success with simple message', async () => {
      const instance = Notification.success('simple message');
      await Vue.nextTick();
      expect(instance.message).toEqual('simple message');
      expect(instance.type).toEqual('success');
      expect(instance.top).toEqual(false);
      expect(instance.right).toEqual(false);
      expect(instance.left).toEqual(false);
      expect(instance.bottom).toEqual(false);
    });
    it('Success with params', async () => {
      const instance = Notification.success({
        message: 'simple message',
        top: true,
        right: true,
      });
      await Vue.nextTick();
      expect(instance.message).toEqual('simple message');
      expect(instance.type).toEqual('success');
      expect(instance.top).toEqual(true);
      expect(instance.right).toEqual(true);
      expect(instance.left).toEqual(false);
      expect(instance.bottom).toEqual(false);
    });
  });

  describe('Notification Close', () => {
    it('Should do nothing if instance undefined', async () => {
      const instance = Notification.success({ message: 'simple message', closeDelay: 0 });
      Notification.success({ message: 'simple message', closeDelay: 0 });

      await Vue.nextTick();
      jest.runOnlyPendingTimers();
      Object.defineProperty(instance, 'dom', { value: { offsetHeight: 0 } });

      let notifications = document.querySelectorAll('.notification');
      expect(notifications[0].getAttribute('style')).toContain('bottom: 0px;');
      expect(notifications[1].getAttribute('style')).toContain('bottom: 16px;');

      Notification.close('notification__undefined');

      expect(notifications[0].getAttribute('style')).toContain('bottom: 0px;');
      expect(notifications[1].getAttribute('style')).toContain('bottom: 16px;');
    });

    it('Should do nothing if there is only 1 instance', async () => {
      const instance = Notification.success({ message: 'simple message', closeDelay: 0 });

      await Vue.nextTick();
      jest.runOnlyPendingTimers();
      Object.defineProperty(instance, 'dom', { value: { offsetHeight: 0 } });

      let notifications = document.querySelectorAll('.notification');
      expect(notifications[0].getAttribute('style')).toContain('bottom: 0px;');

      Notification.close(instance.id);

      expect(notifications[0].getAttribute('style')).toContain('bottom: 0px;');
    });

    it('Should do nothing if there is only 1 instance with same position', async () => {
      const instance = Notification.success({ message: 'simple message', bottom: true, closeDelay: 0 });
      Notification.success({ message: 'simple message', top: true, closeDelay: 0 });

      await Vue.nextTick();
      jest.runOnlyPendingTimers();
      Object.defineProperty(instance, 'dom', { value: { offsetHeight: 0 } });

      let notifications = document.querySelectorAll('.notification');
      expect(notifications[0].getAttribute('style')).toContain('bottom: 0px;');
      expect(notifications[1].getAttribute('style')).toContain('top: 0px;');

      Notification.close(instance.id);

      expect(notifications[0].getAttribute('style')).toContain('bottom: 0px;');
      expect(notifications[1].getAttribute('style')).toContain('top: 0px;');
    });

    it('Should update others instance position when a notification is closed', async () => {
      const instance = Notification.success({ message: 'simple message', closeDelay: 0 });
      Notification.success({ message: 'simple message', closeDelay: 0 });

      await Vue.nextTick();
      jest.runOnlyPendingTimers();
      Object.defineProperty(instance, 'dom', { value: { offsetHeight: 0 } });

      let notifications = document.querySelectorAll('.notification');
      expect(notifications[0].getAttribute('style')).toContain('bottom: 0px;');
      expect(notifications[1].getAttribute('style')).toContain('bottom: 16px;');

      Notification.close(instance.id);

      expect(notifications[1].getAttribute('style')).toContain('bottom: 0px;');
    });
  });
});
