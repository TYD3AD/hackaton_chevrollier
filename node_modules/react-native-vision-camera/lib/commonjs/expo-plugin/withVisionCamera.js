"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _configPlugins = require("@expo/config-plugins");
var _withDisableFrameProcessorsAndroid = require("./withDisableFrameProcessorsAndroid");
var _withDisableFrameProcessorsIOS = require("./withDisableFrameProcessorsIOS");
var _withAndroidMLKitVisionModel = require("./withAndroidMLKitVisionModel");
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const pkg = require('../../../package.json');
const CAMERA_USAGE = 'Allow $(PRODUCT_NAME) to access your camera';
const MICROPHONE_USAGE = 'Allow $(PRODUCT_NAME) to access your microphone';
const withCamera = (config, props = {}) => {
  if (config.ios == null) config.ios = {};
  if (config.ios.infoPlist == null) config.ios.infoPlist = {};
  config.ios.infoPlist.NSCameraUsageDescription = props.cameraPermissionText ?? config.ios.infoPlist.NSCameraUsageDescription ?? CAMERA_USAGE;
  if (props.enableMicrophonePermission) {
    config.ios.infoPlist.NSMicrophoneUsageDescription = props.microphonePermissionText ?? config.ios.infoPlist.NSMicrophoneUsageDescription ?? MICROPHONE_USAGE;
  }
  const androidPermissions = ['android.permission.CAMERA'];
  if (props.enableMicrophonePermission) androidPermissions.push('android.permission.RECORD_AUDIO');
  if (props.disableFrameProcessors) {
    config = (0, _withDisableFrameProcessorsAndroid.withDisableFrameProcessorsAndroid)(config);
    config = (0, _withDisableFrameProcessorsIOS.withDisableFrameProcessorsIOS)(config);
  }
  if (props.enableCodeScanner) config = (0, _withAndroidMLKitVisionModel.withAndroidMLKitVisionModel)(config, props);
  return (0, _configPlugins.withPlugins)(config, [[_configPlugins.AndroidConfig.Permissions.withPermissions, androidPermissions]]);
};
var _default = exports.default = (0, _configPlugins.createRunOncePlugin)(withCamera, pkg.name, pkg.version);
//# sourceMappingURL=withVisionCamera.js.map