export const getApiUrl = () => {
  const origin = window.location.origin;
  if (origin.includes('vercel.app')) {
    return 'https://ais-pre-g2juvihdzewqfrd42vfmaw-754701656249.europe-west2.run.app';
  }
  return '';
};
export const API_URL = getApiUrl();
