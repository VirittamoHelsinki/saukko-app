param location string = resourceGroup().location
param app_name string = resourceGroup().name

var appServicePlanName = '${app_name}-asp'
var webappName = '${app_name}-app'
var appInsightName = '${app_name}-insight'
var cosmosDbName = '${app_name}-cosmos'

// App Service Plan Module
module appService 'modules/appService.bicep' = {
  name: 'appServiceModule'
  params: {
    location: location
    appServicePlanName: appServicePlanName
    skuName: 'B1'
    skuTier: 'Basic'
    skuSize: 'B1'
  }
}

// Application Insights Module
module appInsights 'modules/appInsights.bicep' = {
  name: 'appInsightsModule'
  params: {
    location: location
    appInsightName: appInsightName
  }
}

// Cosmos DB Module
module cosmosDb 'modules/cosmosDb.bicep' = {
  name: 'cosmosDbModule'
  params: {
    location: location
    cosmosDbName: cosmosDbName
  }
}

// Web App Module
module webApp 'modules/webApp.bicep' = {
  name: 'webAppModule'
  params: {
    location: location
    webAppName: webappName
    appServicePlanId: appService.outputs.appServicePlanId
    appInsightInstrumentationKey: appInsights.outputs.instrumentationKey
    appInsightConnectionString: appInsights.outputs.connectionString
    mongoDbConnectionString: cosmosDb.outputs.mongoDbConnectionString
    emailServiceConnectionString: ''  // Add value from a relevant module
    queueEndpoint: ''  // Add value from a relevant module
    queueConnectionString: ''  // Add value from a relevant module
    senderDomain: ''  // Add value from a relevant module
  }
}
