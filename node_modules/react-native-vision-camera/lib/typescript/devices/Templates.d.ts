import { FormatFilter } from './getCameraFormat';
type PredefinedTemplates = 'Video' | 'Video60Fps' | 'VideoSlowMotion' | 'VideoStabilized' | 'Photo' | 'PhotoPortrait' | 'FrameProcessingYUV' | 'FrameProcessingRGB' | 'Snapchat' | 'Instagram';
/**
 * Predefined templates for use in `useCameraFormat`/`getCameraFormat`.
 * @example
 * ```ts
 * const format = useCameraFormat(device, Templates.Snapchat)
 * ```
 */
export declare const Templates: Record<PredefinedTemplates, FormatFilter[]>;
export {};
//# sourceMappingURL=Templates.d.ts.map