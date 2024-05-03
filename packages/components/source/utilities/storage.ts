const GetLocalString = ({ key }: { key: string }) => {
  const string = localStorage.getItem(key);
  if (string) return parseInt(string, 10);
  return null;
};
const SetLocalString = ({ key }: { key: string }) => {
  const currentTime = new Date().getTime();
  localStorage.setItem(key, currentTime.toString());
};

export default {
  GetLocalString,
  SetLocalString,
};
