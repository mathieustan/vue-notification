import { ICONS } from './icons';

export const Z_INDEX_LIST = {
  notification: 1003,
};

export const NOTIFICATION_POSITIONS = ['top', 'bottom', 'left', 'right'];
export const NOTIFICATION_TYPES = ['success', 'warning', 'info', 'error', 'offline'];
export const NOTIFICATION_ICONS = {
  success: { ...ICONS.check, height: 16 },
  info: { ...ICONS.info, height: 14 },
  warning: { ...ICONS.exclamation, height: 14 },
  error: { ...ICONS.exclamationTriangle, height: 16 },
  offline: { ...ICONS.wifiSlash, height: 14 },
  close: { ...ICONS.close },
};
