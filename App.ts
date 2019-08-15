import Sentry from 'sentry-expo';

// TODO -> Use environment vars, see: https://docs.expo.io/versions/v32.0.0/guides/using-sentry/#__next
Sentry.config('https://92e853601ecc4e2abbadb2d8732b85a3@sentry.io/1532012').install();

import App from './src/App';
export default App;
