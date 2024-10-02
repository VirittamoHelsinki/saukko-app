param location string
param app_name string
param appServicePlanId string

var functionsAppName = '${app_name}-fn-${uniqueString(resourceGroup().id)}'
var webjobsStorageName = 'webjobs${uniqueString(resourceGroup().id)}'

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
  properties: {
    serverFarmId: appServicePlanId
    siteConfig: {
      linuxFxVersion: 'Node|20'
    }
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
