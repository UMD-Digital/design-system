function queryShadow<T extends Element = Element>(
  host: HTMLElement,
  selector: string,
): T | null {
  return host.shadowRoot?.querySelector<T>(selector) ?? null;
}

function queryShadowAll<T extends Element = Element>(
  host: HTMLElement,
  selector: string,
): T[] {
  if (!host.shadowRoot) return [];
  return Array.from(host.shadowRoot.querySelectorAll<T>(selector));
}

function getShadowStyles(host: HTMLElement): string | null {
  if (!host.shadowRoot) return null;
  const style = host.shadowRoot.querySelector('style');
  return style?.textContent ?? null;
}

function getShadowHTML(host: HTMLElement): string | null {
  if (!host.shadowRoot) return null;
  const temp = document.createElement('div');
  temp.innerHTML = host.shadowRoot.innerHTML;
  temp.querySelectorAll('style').forEach((el) => el.remove());
  const result = temp.innerHTML.trim();
  return result || null;
}

export { queryShadow, queryShadowAll, getShadowStyles, getShadowHTML };
