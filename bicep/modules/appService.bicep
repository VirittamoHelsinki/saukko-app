param location string
param appServicePlanName string
param skuName string
param skuTier string
param skuSize string

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

output appServicePlanId string = ASP_NodeJS_AppService.id
