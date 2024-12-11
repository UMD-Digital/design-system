export const debounce = function <T extends Function>(cb: T, wait = 50) {
  let timer: number = 0;
  const callable = (...args: any) => {
    clearTimeout(timer);
    // @ts-ignore
    timer = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
};
