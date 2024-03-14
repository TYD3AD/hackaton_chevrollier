import React from 'react';
import type { CameraDevice } from './CameraDevice';
import type { CameraProps } from './CameraProps';
import type { PhotoFile, TakePhotoOptions } from './PhotoFile';
import type { Point } from './Point';
import type { RecordVideoOptions } from './VideoFile';
import type { EmitterSubscription } from 'react-native';
export type CameraPermissionStatus = 'granted' | 'not-determined' | 'denied' | 'restricted';
export type CameraPermissionRequestResult = 'granted' | 'denied';
interface CameraState {
    isRecordingWithFlash: boolean;
}
/**
 * ### A powerful `<Camera>` component.
 *
 * Read the [VisionCamera documentation](https://react-native-vision-camera.com/) for more information.
 *
 * The `<Camera>` component's most important properties are:
 *
 * * {@linkcode CameraProps.device | device}: Specifies the {@linkcode CameraDevice} to use. Get a {@linkcode CameraDevice} by using the {@linkcode useCameraDevice | useCameraDevice(..)} hook, or manually by using the {@linkcode CameraDevices.getAvailableCameraDevices CameraDevices.getAvailableCameraDevices()} function.
 * * {@linkcode CameraProps.isActive | isActive}: A boolean value that specifies whether the Camera should actively stream video frames or not. This can be compared to a Video component, where `isActive` specifies whether the video is paused or not. If you fully unmount the `<Camera>` component instead of using `isActive={false}`, the Camera will take a bit longer to start again.
 *
 * @example
 * ```tsx
 * function App() {
 *   const device = useCameraDevice('back')
 *
 *   if (device == null) return <NoCameraErrorView />
 *   return (
 *     <Camera
 *       style={StyleSheet.absoluteFill}
 *       device={device}
 *       isActive={true}
 *     />
 *   )
 * }
 * ```
 *
 * @component
 */
export declare class Camera extends React.PureComponent<CameraProps, CameraState> {
    /** @internal */
    static displayName: string;
    /** @internal */
    displayName: string;
    private lastFrameProcessor;
    private isNativeViewMounted;
    private readonly ref;
    /** @internal */
    constructor(props: CameraProps);
    private get handle();
    /**
     * Take a single photo and write it's content to a temporary file.
     *
     * @throws {@linkcode CameraCaptureError} When any kind of error occured while capturing the photo. Use the {@linkcode CameraCaptureError.code | code} property to get the actual error
     * @example
     * ```ts
     * const photo = await camera.current.takePhoto({
     *   qualityPrioritization: 'quality',
     *   flash: 'on',
     *   enableAutoRedEyeReduction: true
     * })
     * ```
     */
    takePhoto(options?: TakePhotoOptions): Promise<PhotoFile>;
    private getBitRateMultiplier;
    /**
     * Start a new video recording.
     *
     * @throws {@linkcode CameraCaptureError} When any kind of error occured while starting the video recording. Use the {@linkcode CameraCaptureError.code | code} property to get the actual error
     *
     * @example
     * ```ts
     * camera.current.startRecording({
     *   onRecordingFinished: (video) => console.log(video),
     *   onRecordingError: (error) => console.error(error),
     * })
     * setTimeout(() => {
     *   camera.current.stopRecording()
     * }, 5000)
     * ```
     */
    startRecording(options: RecordVideoOptions): void;
    /**
     * Pauses the current video recording.
     *
     * @throws {@linkcode CameraCaptureError} When any kind of error occured while pausing the video recording. Use the {@linkcode CameraCaptureError.code | code} property to get the actual error
     *
     * @example
     * ```ts
     * // Start
     * await camera.current.startRecording()
     * await timeout(1000)
     * // Pause
     * await camera.current.pauseRecording()
     * await timeout(500)
     * // Resume
     * await camera.current.resumeRecording()
     * await timeout(2000)
     * // Stop
     * const video = await camera.current.stopRecording()
     * ```
     */
    pauseRecording(): Promise<void>;
    /**
     * Resumes a currently paused video recording.
     *
     * @throws {@linkcode CameraCaptureError} When any kind of error occured while resuming the video recording. Use the {@linkcode CameraCaptureError.code | code} property to get the actual error
     *
     * @example
     * ```ts
     * // Start
     * await camera.current.startRecording()
     * await timeout(1000)
     * // Pause
     * await camera.current.pauseRecording()
     * await timeout(500)
     * // Resume
     * await camera.current.resumeRecording()
     * await timeout(2000)
     * // Stop
     * const video = await camera.current.stopRecording()
     * ```
     */
    resumeRecording(): Promise<void>;
    /**
     * Stop the current video recording.
     *
     * @throws {@linkcode CameraCaptureError} When any kind of error occured while stopping the video recording. Use the {@linkcode CameraCaptureError.code | code} property to get the actual error
     *
     * @example
     * ```ts
     * await camera.current.startRecording()
     * setTimeout(async () => {
     *  const video = await camera.current.stopRecording()
     * }, 5000)
     * ```
     */
    stopRecording(): Promise<void>;
    /**
     * Focus the camera to a specific point in the coordinate system.
     * @param {Point} point The point to focus to. This should be relative
     * to the Camera view's coordinate system and is expressed in points.
     *  * `(0, 0)` means **top left**.
     *  * `(CameraView.width, CameraView.height)` means **bottom right**.
     *
     * Make sure the value doesn't exceed the CameraView's dimensions.
     *
     * @throws {@linkcode CameraRuntimeError} When any kind of error occured while focussing. Use the {@linkcode CameraRuntimeError.code | code} property to get the actual error
     * @example
     * ```ts
     * await camera.current.focus({
     *   x: tapEvent.x,
     *   y: tapEvent.y
     * })
     * ```
     */
    focus(point: Point): Promise<void>;
    /**
     * Get a list of all available camera devices on the current phone.
     *
     * If you use Hooks, use the `useCameraDevices(..)` hook instead.
     *
     * * For Camera Devices attached to the phone, it is safe to assume that this will never change.
     * * For external Camera Devices (USB cameras, Mac continuity cameras, etc.) the available Camera Devices could change over time when the external Camera device gets plugged in or plugged out, so use {@link addCameraDevicesChangedListener | addCameraDevicesChangedListener(...)} to listen for such changes.
     *
     * @example
     * ```ts
     * const devices = Camera.getAvailableCameraDevices()
     * const backCameras = devices.filter((d) => d.position === "back")
     * const frontCameras = devices.filter((d) => d.position === "front")
     * ```
     */
    static getAvailableCameraDevices(): CameraDevice[];
    /**
     * Adds a listener that gets called everytime the Camera Devices change, for example
     * when an external Camera Device (USB or continuity Camera) gets plugged in or plugged out.
     *
     * If you use Hooks, use the `useCameraDevices()` hook instead.
     */
    static addCameraDevicesChangedListener(listener: (newDevices: CameraDevice[]) => void): EmitterSubscription;
    /**
     * Gets the current Camera Permission Status. Check this before mounting the Camera to ensure
     * the user has permitted the app to use the camera.
     *
     * To actually prompt the user for camera permission, use {@linkcode Camera.requestCameraPermission | requestCameraPermission()}.
     */
    static getCameraPermissionStatus(): CameraPermissionStatus;
    /**
     * Gets the current Microphone-Recording Permission Status. Check this before mounting the Camera to ensure
     * the user has permitted the app to use the microphone.
     *
     * To actually prompt the user for microphone permission, use {@linkcode Camera.requestMicrophonePermission | requestMicrophonePermission()}.
     */
    static getMicrophonePermissionStatus(): CameraPermissionStatus;
    /**
     * Shows a "request permission" alert to the user, and resolves with the new camera permission status.
     *
     * If the user has previously blocked the app from using the camera, the alert will not be shown
     * and `"denied"` will be returned.
     *
     * @throws {@linkcode CameraRuntimeError} When any kind of error occured while requesting permission. Use the {@linkcode CameraRuntimeError.code | code} property to get the actual error
     */
    static requestCameraPermission(): Promise<CameraPermissionRequestResult>;
    /**
     * Shows a "request permission" alert to the user, and resolves with the new microphone permission status.
     *
     * If the user has previously blocked the app from using the microphone, the alert will not be shown
     * and `"denied"` will be returned.
     *
     * @throws {@linkcode CameraRuntimeError} When any kind of error occured while requesting permission. Use the {@linkcode CameraRuntimeError.code | code} property to get the actual error
     */
    static requestMicrophonePermission(): Promise<CameraPermissionRequestResult>;
    private onError;
    private onInitialized;
    private onStarted;
    private onStopped;
    private onCodeScanned;
    private setFrameProcessor;
    private unsetFrameProcessor;
    private onViewReady;
    /** @internal */
    componentDidUpdate(): void;
    /** @internal */
    render(): React.ReactNode;
}
export {};
//# sourceMappingURL=Camera.d.ts.map