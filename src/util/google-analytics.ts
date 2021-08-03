import ReactGA from 'react-ga';

/**
 * Tracks visited page path with Google Analytics.
 */
export const trackPageWithGoogleAnalytics = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};
