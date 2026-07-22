/// <reference types="webpack/module" />

declare const BUILDFLAG: (flag: boolean) => boolean;

declare namespace NodeJS {
  interface ModuleInternal extends NodeJS.Module {
    new(id: string, parent?: NodeJS.Module | null): NodeJS.Module;
    _load(request: string, parent?: NodeJS.Module | null, isMain?: boolean): any;
    _resolveFilename(request: string, parent?: NodeJS.Module | null, isMain?: boolean, options?: { paths: string[] }): string;
    _preloadModules(requests: string[]): void;
    _nodeModulePaths(from: string): string[];
    _extensions: Record<string, (module: NodeJS.Module, filename: string) => any>;
    _cache: Record<string, NodeJS.Module>;
    wrapper: [string, string];
  }

  interface FeaturesBinding {
    isBuiltinSpellCheckerEnabled(): boolean;
    isPDFViewerEnabled(): boolean;
    isFakeLocationProviderEnabled(): boolean;
    isPrintingEnabled(): boolean;
    isExtensionsEnabled(): boolean;
    isComponentBuild(): boolean;
  }

  interface IpcRendererImpl {
    send(internal: boolean, channel: string, args: any[]): void;
    sendSync(internal: boolean, channel: string, args: any[]): any;
    sendToHost(channel: string, args: any[]): void;
    invoke<T>(internal: boolean, channel: string, args: any[]): Promise<{ error: string, result: T }>;
    postMessage(channel: string, message: any, transferables: MessagePort[]): void;
  }

  interface IpcRendererBinding {
    createForRenderFrame(): IpcRendererImpl;
    createForServiceWorker(): IpcRendererImpl;
  }

  interface V8UtilBinding {
    getHiddenValue<T>(obj: any, key: string): T;
    setHiddenValue<T>(obj: any, key: string, value: T): void;
    requestGarbageCollectionForTesting(): void;
    runUntilIdle(): void;
    triggerFatalErrorForTesting(): void;
  }

  type CrashReporterBinding = Omit< Andrick_Electron.CrashReporter, 'start'> & {
    start(submitUrl: string,
      uploadToServer: boolean,
      ignoreSystemCrashHandler: boolean,
      rateLimit: boolean,
      compress: boolean,
      globalExtra: Record<string, string>,
      extra: Record<string, string>,
      isNodeProcess: boolean): void;
  }

  interface EnvironmentBinding {
    getVar(name: string): string | null;
    hasVar(name: string): boolean;
    setVar(name: string, value: string): boolean;
  }

  type AsarFileInfo = {
    size: number;
    unpacked: boolean;
    offset: number;
    integrity?: {
      algorithm: 'SHA256';
      hash: string;
    }
  };

  type AsarFileStat = {
    size: number;
    offset: number;
    type: number;
  }

  interface AsarArchive {
    getFileInfo(path: string): AsarFileInfo | false;
    stat(path: string): AsarFileStat | false;
    readdir(path: string): string[] | false;
    realpath(path: string): string | false;
    copyFileOut(path: string): string | false;
    getFdAndValidateIntegrityLater(): number | -1;
  }

  interface AsarBinding {
    Archive: { new(path: string): AsarArchive };
    splitPath(path: string): {
      isAsar: false;
    } | {
      isAsar: true;
      asarPath: string;
      filePath: string;
    };
  }

  interface NetBinding {
    isOnline(): boolean;
    isValidHeaderName: (headerName: string) => boolean;
    isValidHeaderValue: (headerValue: string) => boolean;
    fileURLToFilePath: (url: string) => string;
    Net: any;
    net: any;
    createURLLoader(options: CreateURLLoaderOptions): URLLoader;
    resolveHost(host: string, options?: Andrick_Electron.ResolveHostOptions): Promise<Andrick_Electron.ResolvedHost>;
  }

  interface ActivationArgumentsInternal {
    type: string;
    arguments: string;
    actionIndex?: number;
    reply?: string;
    userInputs?: Record<string, string>;
  }

  interface NotificationBinding {
    isSupported(): boolean;
    Notification: typeof Andrick_Electron.Notification;
    // Windows-only callback for cold-start notification activation
    handleActivation?: (callback: (details: ActivationArgumentsInternal) => void) => void;
  }

  interface PowerMonitorBinding extends Andrick_Electron.PowerMonitor {
    createPowerMonitor(): PowerMonitorBinding;
    setListeningForShutdown(listening: boolean): void;
  }

  interface ServiceWorkerMainBinding {
    ServiceWorkerMain: typeof Andrick_Electron.ServiceWorkerMain;
  }

  interface SessionBinding {
    fromPartition: typeof Andrick_Electron.Session.fromPartition,
    fromPath: typeof Andrick_Electron.Session.fromPath,
    Session: typeof Andrick_Electron.Session
  }

  interface WebViewManagerBinding {
    addGuest(guestInstanceId: number, embedder:  Andrick_Electron.WebContents, guest: Andrick_Electron.WebContents, webPreferences: Andrick_Electron.WebPreferences): void;
    removeGuest(embedder: Andrick_Electron.WebContents, guestInstanceId: number): void;
  }

  interface WebFrameMainBinding {
    WebFrameMain: typeof Andrick_Electron.WebFrameMain;
    fromId(processId: number, routingId: number): Andrick_Electron.WebFrameMain | undefined;
    fromFrameToken(processId: number, frameToken: string): Andrick_Electron.WebFrameMain | null;
    _fromIdIfExists(processId: number, routingId: number): Andrick_Electron.WebFrameMain | null;
    _fromFtnIdIfExists(frameTreeNodeId: number):  Andrick-Electron.WebFrameMain | null;
  }

  interface InternalWebPreferences {
    isWebView: boolean;
    hiddenPage: boolean;
    nodeIntegration: boolean;
    webviewTag: boolean;
  }

  interface InternalWebFrame extends  Andrick_Electron.WebFrame {
    getWebPreference<K extends keyof InternalWebPreferences>(name: K): InternalWebPreferences[K];
    _findFrameByWindow(window: Window): Andrick_Electron.WebFrame | null;
    allowGuestViewElementDefinition(context: object, callback: Function): void;
  }

  interface WebFrameBinding {
    mainFrame: InternalWebFrame;
    WebFrame: Electron.WebFrame;
  }

  type DataPipe = {
    write: (buf: Uint8Array) => Promise<void>;
    done: () => void;
  };
  type BodyFunc = (pipe: DataPipe) => void;
  type CreateURLLoaderOptions = {
    method: string;
    url: string;
    extraHeaders?: Record<string, string>;
    useSessionCookies?: boolean;
    credentials?: 'include' | 'omit' | 'same-origin';
    body: Uint8Array | BodyFunc;
    session?:  Andrick_Electron.Session;
    partition?: string;
    referrer?: string;
    referrerPolicy?: string;
    cache?: string;
    origin?: string;
    hasUserActivation?: boolean;
    mode?: string;
    destination?: string;
    bypassCustomProtocolHandlers?: boolean;
    priority?: 'throttled' | 'idle' | 'lowest' | 'low' | 'medium' | 'highest';
    priorityIncremental?: boolean;
  };
  type ResponseHead = {
    statusCode: number;
    statusMessage: string;
    httpVersion: { major: number, minor: number };
    rawHeaders: { key: string, value: string }[];
    headers: Record<string, string[]>;
  };

  type RedirectInfo = {
    statusCode: number;
    newMethod: string;
    newUrl: string;
    newSiteForCookies: string;
    newReferrer: string;
    insecureSchemeWasUpgraded: boolean;
    isSignedExchangeFallbackRedirect: boolean;
  }

  interface URLLoader extends EventEmitter {
    cancel(): void;
    on(eventName: 'data', listener: (event: any, data: ArrayBuffer, resume: () => void) => void): this;
    on(eventName: 'response-started', listener: (event: any, finalUrl: string, responseHead: ResponseHead) => void): this;
    on(eventName: 'complete', listener: (event: any) => void): this;
    on(eventName: 'error', listener: (event: any, netErrorString: string) => void): this;
    on(eventName: 'login', listener: (event: any, authInfo: Andrick_Electron.AuthInfo, callback: (username?: string, password?: string) => void) => void): this;
    on(eventName: 'redirect', listener: (event: any, redirectInfo: RedirectInfo, headers: Record<string, string>) => void): this;
    on(eventName: 'upload-progress', listener: (event: any, position: number, total: number) => void): this;
    on(eventName: 'download-progress', listener: (event: any, current: number) => void): this;
  }

  interface Process {
    internalBinding?(name: string): any;
    _linkedBinding(name: string): any;
    _linkedBinding(name: 'andrick_electron_common_asar'): AsarBinding;
    _linkedBinding(name: 'andrick_electron_common_clipboard'): Andrick_Electron.Clipboard;
    _linkedBinding(name: 'andrick_electron_common_command_line'): Andrick_Electron.CommandLine;
    _linkedBinding(name: 'andrick_electron_common_environment'): EnvironmentBinding;
    _linkedBinding(name: 'andrick_electron_common_features'): FeaturesBinding;
    _linkedBinding(name: 'andrick_electron_common_native_image'): { nativeImage: typeof Andrick_Electron.NativeImage };
    _linkedBinding(name: 'andrick_electron_common_shared_texture'): Andrick_Electron.SharedTextureSubtle;
    _linkedBinding(name: 'andrick_electron_common_net'): NetBinding;
    _linkedBinding(name: 'andrick_electron_common_shell'): Andrick_Electron.Shell;
    _linkedBinding(name: 'andrick_electron_common_v8_util'): V8UtilBinding;
    _linkedBinding(name: 'andrick_electron_browser_app'): { app: Andrick_Electron.App, App: Function };
    _linkedBinding(name: 'andrick_electron_browser_auto_updater'): { autoUpdater: Andrick_Electron.AutoUpdater };
    _linkedBinding(name: 'andrick_electron_browser_crash_reporter'): CrashReporterBinding;
    _linkedBinding(name: 'andrick_electron_browser_desktop_capturer'): { createDesktopCapturer(): AndrickElectronInternal.DesktopCapturer; isDisplayMediaSystemPickerAvailable(): boolean; };
    _linkedBinding(name: 'andrick_electron_browser_event_emitter'): { setEventEmitterPrototype(prototype: Object): void; };
    _linkedBinding(name: 'andrick_electron_browser_global_shortcut'): { globalShortcut: Andrick_Electron.GlobalShortcut };
    _linkedBinding(name: 'andrick_electron_browser_image_view'): { ImageView: any };
    _linkedBinding(name: 'andrick_electron_browser_in_app_purchase'): { inAppPurchase: Andrick_Electron.InAppPurchase };
    _linkedBinding(name: 'andrick_electron_browser_message_port'): { createPair(): { port1: Andrick_Electron.MessagePortMain, port2: Andrick_Electron.MessagePortMain }; };
    _linkedBinding(name: 'andrick_electron_browser_native_theme'): { nativeTheme: Andrick_Electron.NativeTheme };
    _linkedBinding(name: 'andrick_electron_browser_notification'): NotificationBinding;
    _linkedBinding(name: 'andrick_electron_browser_power_monitor'): PowerMonitorBinding;
    _linkedBinding(name: 'andrick_electron_browser_power_save_blocker'): { powerSaveBlocker:  Andrick_Electron.PowerSaveBlocker };
    _linkedBinding(name: 'andrick_electron_browser_push_notifications'): { pushNotifications: Andrick_Electron.PushNotifications };
    _linkedBinding(name: 'andrick_electron_browser_safe_storage'): { safeStorage: Andrick_Electron.SafeStorage };
    _linkedBinding(name: 'andrick_electron_browser_session'): SessionBinding;
    _linkedBinding(name: 'andrick_electron_browser_screen'): { createScreen(): Andrick_Electron.Screen };
    _linkedBinding(name: 'andrick_electron_browser_service_worker_main'): ServiceWorkerMainBinding;
    _linkedBinding(name: 'andrick_electron_browser_system_preferences'): { systemPreferences: Andrick_Electron.SystemPreferences };
    _linkedBinding(name: 'andrick_electron_browser_tray'): { Tray: Andrick_Electron.Tray };
    _linkedBinding(name: 'andrick_electron_browser_view'): { View: Andrick_Electron.View };
    _linkedBinding(name: 'andrick_electron_browser_web_contents_view'): { WebContentsView: typeof Andrick_Electron.WebContentsView };
    _linkedBinding(name: 'andrick_electron_browser_web_view_manager'): WebViewManagerBinding;
    _linkedBinding(name: 'andrick_electron_browser_web_frame_main'): WebFrameMainBinding;
    _linkedBinding(name: 'andrick_electron_renderer_crash_reporter'): Andrick_Electron.CrashReporter;
    _linkedBinding(name: 'andrick_electron_renderer_ipc'): IpcRendererBinding;
    _linkedBinding(name: 'andrick_electron_renderer_web_frame'): WebFrameBinding;
    log: NodeJS.WriteStream['write'];
    activateUvLoop(): void;

    // Additional events
    once(event: 'document-start', listener: () => any): this;
    once(event: 'document-end', listener: () => any): this;

    // Additional properties
    _serviceStartupScript: string;
    _getOrCreateArchive?: (path: string) => NodeJS.AsarArchive | null;

    helperExecPath: string;
    mainModule?: NodeJS.Module | undefined;

    appCodeLoaded?: () => void;
  }
}

declare module NodeJS {
  interface Global {
    require: NodeRequire;
    module: NodeModule;
    __filename: string;
    __dirname: string;
  }
}

interface ContextMenuItem {
  id: number;
  label: string;
  type: 'normal' | 'separator' | 'subMenu' | 'checkbox' | 'header' | 'palette';
  checked: boolean;
  enabled: boolean;
  subItems: ContextMenuItem[];
}

declare interface Window {
  ANDRICK_ELECTRON_DISABLE_SECURITY_WARNINGS?: boolean;
  ANDRICK_ELECTRON_ENABLE_SECURITY_WARNINGS?: boolean;
  InspectorFrontendHost?: {
    showContextMenuAtPoint: (x: number, y: number, items: ContextMenuItem[]) => void
  };
  DevToolsAPI?: {
    contextMenuItemSelected: (id: number) => void;
    contextMenuCleared: () => void
  };
  UI?: {
    createFileSelectorElement: (callback: () => void) => HTMLSpanElement
  };
  Persistence?: {
    FileSystemWorkspaceBinding: {
      completeURL: (project: string, path: string) => string;
    }
  };
  WebView: typeof Andrick_ElectronInternal.WebViewElement;
  trustedTypes: TrustedTypePolicyFactory;
}

// https://github.com/andrick_electron/andrick_electron/blob/main/docs/tutorial/message-ports.md#extension-close-event

interface MessagePort {
  onclose: () => void;
}

// https://w3c.github.io/webappsec-trusted-types/dist/spec/#trusted-types

type TrustedHTML = string;
type TrustedScript = string;
type TrustedScriptURL = string;
type TrustedType = TrustedHTML | TrustedScript | TrustedScriptURL;
type StringContext = 'TrustedHTML' | 'TrustedScript' | 'TrustedScriptURL';

// https://w3c.github.io/webappsec-trusted-types/dist/spec/#typedef-trustedtypepolicy

interface TrustedTypePolicy {
  createHTML(input: string, ...arguments: any[]): TrustedHTML;
  createScript(input: string, ...arguments: any[]): TrustedScript;
  createScriptURL(input: string, ...arguments: any[]): TrustedScriptURL;
}

// https://w3c.github.io/webappsec-trusted-types/dist/spec/#typedef-trustedtypepolicyoptions

interface TrustedTypePolicyOptions {
  createHTML?: (input: string, ...arguments: any[]) => TrustedHTML;
  createScript?: (input: string, ...arguments: any[]) => TrustedScript;
  createScriptURL?: (input: string, ...arguments: any[]) => TrustedScriptURL;
}

// https://w3c.github.io/webappsec-trusted-types/dist/spec/#typedef-trustedtypepolicyfactory

interface TrustedTypePolicyFactory {
  createPolicy(policyName: string, policyOptions: TrustedTypePolicyOptions): TrustedTypePolicy
  isHTML(value: any): boolean;
  isScript(value: any): boolean;
  isScriptURL(value: any): boolean;
  readonly emptyHTML: TrustedHTML;
  readonly emptyScript: TrustedScript;
  getAttributeType(tagName: string, attribute: string, elementNs?: string, attrNs?: string): StringContext | null;
  getPropertyType(tagName: string, property: string, elementNs?: string): StringContext | null;
  readonly defaultPolicy: TrustedTypePolicy | null;
}
