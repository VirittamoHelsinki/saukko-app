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
    appInsightsInstrumentationKey: import.meta.env.APP_INSIGHTS_INSTRUMENTATION_KEY,
    environentName: 'STAGING',
    eperusteetDataUrl: import.meta.env.VITE_EPERUSTEET_DATA_URL,
  },
  production: {
    showTestEnvironmentWarning: false,
    appInsightsInstrumentationKey: import.meta.env.APP_INSIGHTS_INSTRUMENTATION_KEY,
    environentName: 'PRODUCTION',
    eperusteetDataUrl: import.meta.env.VITE_EPERUSTEET_DATA_URL,
  }
}

export default {
  environment,
  ...environments[environment],
}
