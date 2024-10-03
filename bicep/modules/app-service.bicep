param location string
param app_name string
param appInsightsInstrumentationKey string
param appInsightsConnectionString string
param mailFromSenderDomain string
param keyVaultName string
param mailerQueueEndpoint string
param environment string

var skuName = 'B1'
var skuTier = 'Basic'
var skuSize = 'B1'
var appServicePlanName = '${app_name}-asp'
var webappName = '${app_name}-app-${uniqueString(resourceGroup().id)}'
var queueStorageName = 'queue${uniqueString(resourceGroup().id)}'



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
          value: '@Microsoft.KeyVault(VaultName=${keyVaultName};SecretName=MONGODB_URI)'
        }
        {
          name: 'EMAIL_FROM_SENDER_DOMAIN'
          value: mailFromSenderDomain
        }
        {
          name: 'EMAIL_SERVICE_CONNECTION_STRING'
          value: '@Microsoft.KeyVault(VaultName=${keyVaultName};SecretName=EMAIL_SERVICE_CONNECTION_STRING)'
        }
        {
          name: 'MAILER_QUEUE_ENDPOINT'
          value: mailerQueueEndpoint
        }
        {
          name: 'QUEUE_STORAGE_CONNECTION_STRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${queueStorageName};AccountKey=@Microsoft.KeyVault(VaultName=${keyVaultName};SecretName=QUEUE_STORAGE_CONNECTION_STRING;EndpointSuffix=core.windows.net'
        }
        {
          name: 'APP_URL'
          value: 'https://${webappName}.azurewebsites.net'
        }
        {
          name: 'JWT_SECRET'
          value: '@Microsoft.KeyVault(VaultName=${keyVaultName};SecretName=JWT_SECRET)'
        }
        {
          name: 'NODE_ENV'
          value: environment
        }
      ]
    }
  }
}

output id string = NodeJS_AppService.id
output aspId string = ASP_NodeJS_AppService.id

