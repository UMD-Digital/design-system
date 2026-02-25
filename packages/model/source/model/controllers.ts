import type { ReactiveController, ReactiveControllerHost } from '../_types';

/**
 * Tracks viewport intersection using IntersectionObserver.
 * Calls host.requestUpdate() when intersection state changes.
 */
export class IntersectionController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _observer: IntersectionObserver | null = null;
  private _options: IntersectionObserverInit;

  isIntersecting = false;
  entries: IntersectionObserverEntry[] = [];

  constructor(host: ReactiveControllerHost, options?: IntersectionObserverInit) {
    this._host = host;
    this._options = options ?? {};
    host.addController(this);
  }

  hostConnected(): void {
    this._observer = new IntersectionObserver((entries) => {
      this.entries = entries;
      this.isIntersecting = entries.some((e) => e.isIntersecting);
      this._host.requestUpdate();
    }, this._options);
    this._observer.observe(this._host);
  }

  hostDisconnected(): void {
    this._observer?.disconnect();
    this._observer = null;
  }
}

/**
 * Tracks a CSS media query match state.
 * Calls host.requestUpdate() when match changes.
 */
export class MediaQueryController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _mql: MediaQueryList | null = null;
  private _handler: ((e: MediaQueryListEvent) => void) | null = null;
  private _query: string;

  matches = false;

  constructor(host: ReactiveControllerHost, query: string) {
    this._host = host;
    this._query = query;
    host.addController(this);
  }

  hostConnected(): void {
    this._mql = window.matchMedia(this._query);
    this.matches = this._mql.matches;
    this._handler = (e) => {
      this.matches = e.matches;
      this._host.requestUpdate();
    };
    this._mql.addEventListener('change', this._handler);
  }

  hostDisconnected(): void {
    if (this._mql && this._handler) {
      this._mql.removeEventListener('change', this._handler);
    }
    this._mql = null;
    this._handler = null;
  }
}
