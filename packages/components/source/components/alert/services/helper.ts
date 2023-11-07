import { VARIABLES } from '../globals';

export const GetLocalString = () => {
  const string = localStorage.getItem(VARIABLES.ALERT_LOCAL_STORAGE_KEY);
  if (string) return parseInt(string, 10);
  return null;
};

export const SetLocalString = () => {
  const currentTime = new Date().getTime();
  localStorage.setItem(
    VARIABLES.ALERT_LOCAL_STORAGE_KEY,
    currentTime.toString(),
  );
};
