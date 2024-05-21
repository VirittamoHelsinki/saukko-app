const environment = (() => {
  const host = window.location.host.toLocaleLowerCase().split(':')[0];

  if (host === 'localhost' || host === '172.0.0.1') {
    return 'development';
  }

  if (host.includes('saukko-dev-app')) {
    return 'staging'
  }

  return 'production'
})();


const environments = {
  development: {
    showTestEnvironmentWarning: false,
    appInsightsInstrumentationKey: undefined,
    environentName: 'DEVELOPMENT',
    eperusteetDataUrl: import.meta.env.VITE_EPERUSTEET_DATA_URL
  },
  staging: {
    showTestEnvironmentWarning: true,
    appInsightsInstrumentationKey: import.meta.env.APP_INSIGHTS_INSTRUMENTATION_KEY, //'bd7deb24-7b39-4832-bc15-2e18b6697064', // TODO: use ENV
    environentName: 'STAGING',
    eperusteetDataUrl: import.meta.env.VITE_EPERUSTEET_DATA_URL,
  },
  production: {
    showTestEnvironmentWarning: false,
    appInsightsInstrumentationKey: import.meta.env.APP_INSIGHTS_INSTRUMENTATION_KEY, //"e3bae532-eb64-494a-8fb9-7f3663ca3d73", // TODO: use env,
    environentName: 'PRODUCTION',
    eperusteetDataUrl: import.meta.env.VITE_EPERUSTEET_DATA_URL,
  }
}

export default {
  environment,
  ...environments[environment],
}
