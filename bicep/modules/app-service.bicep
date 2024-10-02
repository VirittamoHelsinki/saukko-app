param location string
param app_name string

param appInsightsInstrumentationKey string
param appInsightsConnectionString string

var skuName = 'B1'
var skuTier = 'Basic'
var skuSize = 'B1'
var appServicePlanName = '${app_name}-asp'
var webappName = '${app_name}-app-${uniqueString(resourceGroup().id)}'

resource ASP_NodeJS_AppService 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: appServicePlanName
  location: location
  kind: 'linux'
  properties: {
    reserved: true
  }
  sku: {
    name: skuName
    tier: skuTier
    size: skuSize
  }
}

resource NodeJS_AppService 'Microsoft.Web/sites@2023-01-01' = {
  name: webappName
  kind: 'app,linux'
  location: location
  properties: {
    reserved: true
    serverFarmId: ASP_NodeJS_AppService.id
    siteConfig: {
      numberOfWorkers: 1
      functionAppScaleLimit: 0
      minimumElasticInstanceCount: 1
      linuxFxVersion: 'NODE|20-lts'
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsightsInstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsightsConnectionString
        }
        {
          name: 'MONGODB_URI'
          value: Cosmos_Mongo.listConnectionStrings().connectionStrings[0].connectionString
        }
        {
          name: 'EMAIL_FROM_SENDER_DOMAIN'
          value: AzureManagedDomain.properties.mailFromSenderDomain
        }
        {
          name: 'EMAIL_SERVICE_CONNECTION_STRING'
          value: Communication_Services.listKeys().primaryConnectionString
        }
        {
          name: 'MAILER_QUEUE_ENDPOINT'
          value: '${QueueStorage.properties.primaryEndpoints.queue}/${mailerQueueName}'
        }
        {
          name: 'QUEUE_STORAGE_CONNECTION_STRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${queueStorageName};AccountKey=${QueueStorage.listKeys().keys[0].value};EndpointSuffix=core.windows.net'
        }
        {
          name: 'APP_URL'
          value: '.'
        }
        {
          name: 'JWT_SECRET'
          value: '.'
        }
        {
          name: 'EMAIL_SERVICE'
          value: '.'
        }
        {
          name: 'EMAIL_SERVICE_HOST'
          value: '.'
        }
        {
          name: 'EMAIL_SERVICE_PORT'
          value: '.'
        }
        {
          name: 'EMAIL_SERVICE_USER'
          value: '.'
        }
        {
          name: 'EMAIL_SERVICE_PASSWORD'
          value: ''
        }
        {
          name: 'EMAIL_SERVICE_FROM'
          value: '.'
        }
        {
          name: 'NODE_ENV'
          value: 'staging|production'
        }
      ]
    }
  }
}

output id string = NodeJS_AppService.id

