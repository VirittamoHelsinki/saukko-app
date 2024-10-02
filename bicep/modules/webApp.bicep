param location string
param webAppName string
param appServicePlanId string
param appInsightInstrumentationKey string
param appInsightConnectionString string
param mongoDbConnectionString string
param emailServiceConnectionString string
param queueEndpoint string
param queueConnectionString string
param senderDomain string

resource NodeJS_AppService 'Microsoft.Web/sites@2023-01-01' = {
  name: webAppName
  kind: 'app,linux'
  location: location
  properties: {
    reserved: true
    serverFarmId: appServicePlanId
    siteConfig: {
      numberOfWorkers: 1
      linuxFxVersion: 'NODE|20-lts'
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsightInstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsightConnectionString
        }
        {
          name: 'MONGODB_URI'
          value: mongoDbConnectionString
        }
        {
          name: 'EMAIL_SERVICE_CONNECTION_STRING'
          value: emailServiceConnectionString
        }
        {
          name: 'MAILER_QUEUE_ENDPOINT'
          value: queueEndpoint
        }
        {
          name: 'QUEUE_STORAGE_CONNECTION_STRING'
          value: queueConnectionString
        }
        {
          name: 'EMAIL_FROM_SENDER_DOMAIN'
          value: senderDomain
        }
        // Other settings...
      ]
    }
  }
}
