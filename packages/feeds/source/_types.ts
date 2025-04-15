export interface ElementModel {
  element: HTMLElement;
  styles: string;
  events?: Record<string, Function>;
}
