function createSlotContent(
  slotName: string | undefined,
  content: string | HTMLElement,
  tag = 'span',
): HTMLElement {
  const element = document.createElement(tag);

  if (slotName !== undefined) {
    element.setAttribute('slot', slotName);
  }

  if (typeof content === 'string') {
    element.textContent = content;
  } else {
    element.appendChild(content);
  }

  return element;
}

function getSlotElements(host: HTMLElement, slotName?: string): Element[] {
  if (slotName === undefined || slotName === 'default') {
    return Array.from(host.children).filter(
      (child) => !child.hasAttribute('slot'),
    );
  }
  return Array.from(host.children).filter(
    (child) => child.getAttribute('slot') === slotName,
  );
}

function isAllowedElement(element: Element, allowed: string[]): boolean {
  const tagName = element.tagName.toLowerCase();
  return allowed.some((pattern) => {
    if (pattern === 'h*') {
      return /^h\d+$/.test(tagName);
    }
    return tagName === pattern.toLowerCase();
  });
}

function assertSlot(
  host: HTMLElement,
  slotName: string,
  options?: {
    exists?: boolean;
    count?: number;
    allowedElements?: string[];
  },
): void {
  const shouldExist = options?.exists ?? true;
  const elements = getSlotElements(host, slotName);

  if (shouldExist && elements.length === 0) {
    throw new Error(`assertSlot: slot "${slotName}" expected content but found none`);
  }

  if (!shouldExist && elements.length > 0) {
    throw new Error(`assertSlot: slot "${slotName}" expected no content but found ${elements.length} element(s)`);
  }

  if (options?.count !== undefined && elements.length !== options.count) {
    throw new Error(
      `assertSlot: slot "${slotName}" expected ${options.count} element(s) but found ${elements.length}`,
    );
  }

  if (options?.allowedElements && elements.length > 0) {
    for (const el of elements) {
      if (!isAllowedElement(el, options.allowedElements)) {
        throw new Error(
          `assertSlot: slot "${slotName}" contains disallowed element <${el.tagName.toLowerCase()}>. Allowed: ${options.allowedElements.join(', ')}`,
        );
      }
    }
  }
}

export { createSlotContent, assertSlot, isAllowedElement, getSlotElements };
