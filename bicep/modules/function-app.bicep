param location string
param app_name string
param appInsightsInstrumentationKey string
param appInsightsConnectionString string
param mailFromSenderDomain string
param keyVaultName string
param mailerQueueEndpoint string
param applicationInsightsId string
param aspNodeJsAppServiceId string


var functionsAppName = '${app_name}-fn-${uniqueString(resourceGroup().id)}'
var webjobsStorageName = 'webjobs${uniqueString(resourceGroup().id)}'
var queueStorageName = 'queue${uniqueString(resourceGroup().id)}'

resource functionsStorage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: webjobsStorageName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
}

resource Functions_App 'Microsoft.Web/sites@2023-01-01' = {
  name: functionsAppName
  kind: 'functionapp,linux'
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  tags: {
    'hidden-link: /app-insights-resource-id': applicationInsightsId
  }
  properties: {
    enabled: true
    serverFarmId: aspNodeJsAppServiceId
    reserved: true
    isXenon: false
    hyperV: false
    siteConfig: {
      numberOfWorkers: 1
      linuxFxVersion: 'Node|20'
      windowsFxVersion: null
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
          value: '@Microsoft.KeyVault(VaultName=${keyVaultName}/CosmosDBConnectionString)'
        }
        {
          name: 'MAILER_QUEUE_ENDPOINT'
          value: mailerQueueEndpoint
        }
        {
          name: 'QUEUE_STORAGE_CONNECTION_STRING'
          value: 'DefaultEndpointsProtocol=https;AccountName=${queueStorageName};AccountKey=@Microsoft.KeyVault(VaultName=${keyVaultName}/QueueConnectionString;EndpointSuffix=core.windows.net'
        }
        {
          name: 'EMAIL_SERVICE_CONNECTION_STRING'
          value: '@Microsoft.KeyVault(VaultName=${keyVaultName}/PrimaryConnectionString)'
        }
        {
          name: 'EMAIL_FROM_SENDER_DOMAIN'
          value: mailFromSenderDomain
        }
        {
          name: 'FUNCTIONS_EXTENSION_VERSION'
          value: '~4'
        }
        {
          name: 'FUNCTIONS_WORKER_RUNTIME'
          value: 'node'
        }
        {
          name: 'WEBSITE_RUN_FROM_PACKAGE'
          value: '0'
        }
        {
          name: 'AzureWebJobsStorage'
          value: 'DefaultEndpointsProtocol=https;AccountName=${functionsStorage.name};AccountKey=${functionsStorage.listKeys().keys[0].value};EndpointSuffix=${az.environment().suffixes.storage}'
        }
      ]
    }
    httpsOnly: true
    redundancyMode: 'None'
    publicNetworkAccess: 'Enabled'
  }
}

resource Function_Role_Assignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: functionsStorage
  name: guid(resourceGroup().id, functionsStorage.id, Functions_App.id)
  properties: {
    principalId: Functions_App.identity.principalId
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      'b24988ac-6180-42a0-ab88-20f7382dd24c'
    )
    principalType: 'ServicePrincipal'
  }
}
