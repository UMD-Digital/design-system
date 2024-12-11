export const get = ({ key }: { key: string }) => {
  const string = localStorage.getItem(key);
  if (string) return parseInt(string, 10);
  return null;
};

export const set = ({ key }: { key: string }) => {
  const currentTime = new Date().getTime();
  localStorage.setItem(key, currentTime.toString());
};
