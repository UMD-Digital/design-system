import { VARIABLES } from '../globals';

const { ALERT_LOCAL_STORAGE_KEY } = VARIABLES;

export const GetLocalString = () => {
  const string = localStorage.getItem(ALERT_LOCAL_STORAGE_KEY);
  if (string) return parseInt(string, 10);
  return null;
};

export const SetLocalString = () => {
  const currentTime = new Date().getTime();
  localStorage.setItem(ALERT_LOCAL_STORAGE_KEY, currentTime.toString());
};
