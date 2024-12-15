import { type BuilderProps } from '../_types';

export default class ElementBuilder {
  private className: string;
  private element: HTMLElement;

  constructor(className: string, element: HTMLElement) {
    this.className = className;
    this.element = element;
  }

  createElement(props: BuilderProps) {
    const { config, options = {} } = props;
    const className = this.className;
    const element = this.element;

    if (!className || !element) {
      throw new Error(`element & className is required for Element Builder`);
    }

    let styles = '';

    if (config.styleModifiers) {
      styles += config.styleModifiers({ className, ...options });
    }

    if (config.elementModifiers) {
      for (const modifier of config.elementModifiers) {
        modifier(element);
      }
    }

    element.classList.add(className);

    return {
      element,
      className,
      styles,
    };
  }
}
