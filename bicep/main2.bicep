param location string = resourceGroup().location
param app_name string = resourceGroup().name
param keyVaultName string = '${app_name}-kv'

var skuName = 'B1'

module appService 'modules/app-service.bicep' = {
  name: 'AppServiceModule'
  params: {
    location: location
    app_name: app_name
    appInsightsInstrumentationKey: monitoring.outputs.instrumentationKey
    appInsightsConnectionString: monitoring.outputs.connectionString
    keyVaultName: keyVaultName
    mailFromSenderDomain: communication.outputs.mailFromSenderDomain
    mailerQueueEndpoint: queueStorage.outputs.mailerQueueEndpoint
  }
}

module keyVault 'modules/keyVault.bicep' = {
  name: 'keyVaultModule'
  params: {
    location: location
    skuName: skuName
    keyVaultName: keyVaultName
  }
}

module functionApp 'modules/function-app.bicep' = {
  name: 'FunctionAppModule'
  params: {
    location: location
    app_name: app_name
    aspNodeJsAppServiceId: appService.outputs.aspId
    appInsightsInstrumentationKey: monitoring.outputs.instrumentationKey
    appInsightsConnectionString: monitoring.outputs.connectionString
    applicationInsightsId: monitoring.outputs.applicationInsightsId
    keyVaultName: keyVaultName
    mailFromSenderDomain: communication.outputs.mailFromSenderDomain
    mailerQueueEndpoint: queueStorage.outputs.mailerQueueEndpoint
  }
}

module cosmosDb 'modules/cosmos-db.bicep' = {
  name: 'CosmosDbModule'
  params: {
    location: location
    app_name: app_name
    keyVaultName: keyVaultName
  }
}

module communication 'modules/communication-services.bicep' = {
  name: 'CommunicationServicesModule'
  params: {
    app_name: app_name
    keyVaultName: keyVaultName
  }
}

module monitoring 'modules/monitoring.bicep' = {
  name: 'MonitoringModule'
  params: {
    location: location
    app_name: app_name
  }
}

module queueStorage 'modules/queue-storage.bicep' = {
  name: 'QueueStorageModule'
  params: {
    location: location
    keyVaultName: keyVaultName
  }
}

