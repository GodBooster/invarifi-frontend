export const appName = 'InvariFi';
export const appDescription =
  'InvariFi is a decentralized application that allows users to stake their crypto assets and earn rewards.';

export const getAppUrl = () =>
  typeof window !== 'undefined' ? window.location.origin : '';
