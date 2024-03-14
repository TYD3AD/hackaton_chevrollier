"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withDisableFrameProcessorsIOS = void 0;
var _configPlugins = require("@expo/config-plugins");
/**
 * Set the `disableFrameProcessors` inside of the XcodeProject.
 * This is used to disable frame processors if you don't need it on iOS. (will save CPU and Memory)
 */
const withDisableFrameProcessorsIOS = c => {
  return (0, _configPlugins.withPodfileProperties)(c, config => {
    // TODO: Implement Podfile writing
    config.ios = config.ios;
    return config;
  });
};
exports.withDisableFrameProcessorsIOS = withDisableFrameProcessorsIOS;
//# sourceMappingURL=withDisableFrameProcessorsIOS.js.map