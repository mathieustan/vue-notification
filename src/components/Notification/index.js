import Vue from 'vue';
import NotificationItem from './NotificationItem.vue';

import { NOTIFICATION_POSITIONS, NOTIFICATION_TYPES } from '../../constants';

const NotificationConstructor = Vue.extend(NotificationItem);

let instance;
let instances = [];
let seed = 1;

const Notification = (params = { top: true, bottom: false, left: true, right: false }) => {
  const mergedParams = mergeOptionsWithParams(Notification.options, params);

  const id = 'notification_' + seed++;
  const positions = getPositionsFromOptions(mergedParams);
  const positionName = setPositionName(positions);
  const propsData = (typeof mergedParams === 'string') ? { message: mergedParams } : mergedParams;

  instance = new NotificationConstructor({
    propsData: {
      ...propsData,
      value: false, // required prop
      position: positionName,
      verticalOffset: getVerticalOffset(instances, positionName, mergedParams),
    },
    mounted () {
      this.$on('input', value => {
        if (value) return;
        Notification.close(id);
      });
    },
  });

  instance.id = id;

  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.value = true;

  instance.$nextTick(() => {
    instance.dom = instance.$el;
  });

  instances.push(instance);
  return instance;
};

NOTIFICATION_TYPES.forEach(type => {
  Notification[type] = params => {
    if (typeof params === 'string') {
      params = {
        message: params,
      };
    }
    params.type = type;
    return Notification(params);
  };
});

Notification.close = id => {
  const instancesLength = instances.length;
  const instance = instances.find(instance => instance.id === id);
  if (!instance) return;

  const instanceIndex = instances.findIndex(instance => instance.id === id);
  instances.splice(instanceIndex, 1);

  if (instancesLength <= 1) return;

  const position = instance.position;
  const removedHeight = instance.dom.offsetHeight;

  // Update notifications position after current closed notification
  for (let i = instanceIndex; i < instancesLength - 1; i++) {
    if (instances[i].position !== position) return;
    instances[i].dom.style[instance.verticalProperty] =
      `${parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - 16}px`;
  }
};

Notification.closeAll = function () {
  instances.forEach(instance => {
    instance.close();
  });
};

// -----------------------------------------
// Helpers
// - getPositionsFromOptions : pick top, left, bottom, right from params
// - setPositionName : Generate a position string (like top-left)
// - getVerticalOffset : Should return verticial offset from previous instance with same position
// - getVerticalProperty : Return vertical property to update for position
// -----------------------------------------
function getPositionsFromOptions (params) {
  return Object.assign({}, ...NOTIFICATION_POSITIONS.map(key => ({ [key]: params[key] })));
}

function setPositionName (positions) {
  return Object
    .keys(positions)
    .filter(key => positions[key])
    .join('-');
}

function getVerticalOffset (instances, position, { offset = 0 } = {}) {
  return instances
    .filter(item => item.position === position)
    .reduce((offset, item) => {
      offset += item.$el.offsetHeight + 16;
      return offset;
    }, offset);
}

function mergeOptionsWithParams (options, params) {
  if (!options.breakpoints) return params;

  const windowWidth = window.innerWidth;
  let match = -1;
  Object.keys(options.breakpoints).forEach(breakpoint => {
    console.log(breakpoint <= windowWidth);
    if (breakpoint <= windowWidth && breakpoint > match) {
      match = Number(breakpoint);
    }
  });

  const paramsToMerge = (typeof params === 'string') ? { message: params } : params;
  return Object.assign({}, options.breakpoints[match], paramsToMerge);
}

export default Notification;
