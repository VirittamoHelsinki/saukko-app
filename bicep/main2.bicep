param location string = resourceGroup().location
param app_name string = resourceGroup().name

module appService 'modules/app-service.bicep' = {
  name: 'AppServiceModule'
  params: {
    location: location
    app_name: app_name
  }
}

module functionApp 'modules/function-app.bicep' = {
  name: 'FunctionAppModule'
  params: {
    location: location
    app_name: app_name
    appServicePlanId: appService.outputs.id
  }
}

module cosmosDb 'modules/cosmos-db.bicep' = {
  name: 'CosmosDbModule'
  params: {
    location: location
    app_name: app_name
  }
}

module communication 'modules/communication-services.bicep' = {
  name: 'CommunicationServicesModule'
  params: {
    app_name: app_name
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
    app_name: app_name
  }
}

