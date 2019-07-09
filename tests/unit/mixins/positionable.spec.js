import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import positionable from '@/mixins/positionable';

describe('positionable', () => {
  let mountComponent;
  const EmptyComponent = Vue.component('empty-component', {
    mixins: [positionable],
    template: '<div class="positionable"></div>',
  });

  beforeEach(() => {
    mountComponent = () => shallowMount(EmptyComponent);
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Should init data', () => {
    const wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.absolute).toEqual(false);
    expect(wrapper.vm.bottom).toEqual(false);
    expect(wrapper.vm.left).toEqual(false);
    expect(wrapper.vm.right).toEqual(false);
    expect(wrapper.vm.top).toEqual(false);
  });
});
