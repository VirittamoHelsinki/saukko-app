param location string
param app_name string

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
      linuxFxVersion: 'NODE|20-lts'
    }
  }
}

output id string = NodeJS_AppService.id

