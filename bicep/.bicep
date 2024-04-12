/*
  check syntax:
  az bicep build --file .bicep

  Preview changes in azure:
  az deployment group what-if --resource-group <resourcegroup_name> --template-file .bicep

  Deploy:
  az deployment group create --resource-group <resourcegroup_name> --template-file .bicep
*/
param location string = resourceGroup().location
param app_name string = resourceGroup().name
var webappName = '${app_name}-app-${uniqueString(resourceGroup().id)}'
var workspaceName = '${app_name}-ws-${uniqueString(resourceGroup().id)}'
var appInsightName = '${app_name}-insight-${uniqueString(resourceGroup().id)}'
var nodeJsBackendName = '${app_name}-backend-${uniqueString(resourceGroup().id)}'
var frontDoorName = '${app_name}-fd-${uniqueString(resourceGroup().id)}'
var appServicePlanName = '${app_name}-asp'
var backendAppServicePlanName = '${app_name}-basp'

// App Service plan for client
resource ASP_App_Service 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: appServicePlanName
  location: location
  kind: 'app'
  properties: { }
  sku: {
    name: 'F1'
    tier: 'Free'
    size: 'F1'
    family: 'F'
    capacity: 0
  }
}

// App Service plan for backend
resource ASP_NodeJS_Backend 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: backendAppServicePlanName
  location: location
  kind: 'linux'
  properties: {
    reserved: true
  }
  sku: {
    name: 'F1'
    tier: 'Free'
    size: 'F1'
    family: 'F'
    capacity: 1
  }
}

// Backend
resource NodeJS_Backend 'Microsoft.Web/sites@2023-01-01' = {
  name: nodeJsBackendName
  kind: 'app,linux'
  location: location
  properties: {
    reserved: true
    serverFarmId: ASP_NodeJS_Backend.id
    siteConfig: {
      numberOfWorkers: 1
      functionAppScaleLimit: 0
      minimumElasticInstanceCount: 0
      linuxFxVersion: 'NODE|20-lts'
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: Application_Insights.properties.InstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: Application_Insights.properties.ConnectionString
        }
        {
          name: 'MONGODB_URI'
          value: 'SET_ME'
        }
        {
          name: 'JWT_SECRET'
          value: 'SET_ME'
        }
        {
          name: 'EMAIL_SERVICE_PORT'
          value: 'SET_ME'
        }
        {
          name: 'EMAIL_SERVICE'
          value: 'SET_ME'
        }
        {
          name: 'EMAIL_SERVICE_USER'
          value: 'SET_ME'
        }
        {
          name: 'EMAIL_SERVICE_PASSWORD'
          value: 'SET_ME'
        }
        {
          name: 'EMAIL_SERVICE_FROM'
          value: 'SET_ME'
        }
        {
          name: 'EMAIL_SERVICE_HOST'
          value: 'SET_ME'
        }
        {
          name: 'NODE_ENV'
          value: 'staging'
        }
      ]
    }
  }
}

// Client
resource App_Service 'Microsoft.Web/sites@2023-01-01' = {
  name: webappName
  kind: 'app'
  location: location
  properties: {
    reserved: true
    serverFarmId: ASP_App_Service.id
    siteConfig: {
      numberOfWorkers: 1
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: Application_Insights.properties.InstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: Application_Insights.properties.ConnectionString
        }
      ]
    }
  }
}

// Workspace
resource Workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: workspaceName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Disabled'
  }
}

// Application Insights
resource Application_Insights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: Workspace.id
    Flow_Type: 'Bluefield'
  }
}

resource frontDoor 'Microsoft.Network/frontDoors@2021-06-01' = {
  name: frontDoorName
  location: 'global'
  properties: {
    friendlyName: frontDoorName
    routingRules: [
      {
        name: 'apiAndAuthRule'
        properties: {
          frontendEndpoints: [
            {
              id: resourceId('Microsoft.Network/frontDoors/frontendEndpoints', frontDoorName, 'mainFrontendEndpoint')
            }
          ]
          acceptedProtocols: [
            'Https'
          ]
          patternsToMatch: [
            '/api'
            '/api/'
            '/api/*'
            '/auth'
            '/auth/'
            '/auth/*'
          ]
          routeConfiguration: {
            '@odata.type': '#Microsoft.Azure.FrontDoor.Models.FrontdoorForwardingConfiguration'
            backendPool: {
              id: resourceId('Microsoft.Network/frontDoors/backendPools', frontDoorName, 'NodeJSBackendPool')
            }
          }
          enabledState: 'Enabled'
        }
      }
      {
        name: 'defaultRule'
        properties: {
          frontendEndpoints: [
            {
              id: resourceId('Microsoft.Network/frontDoors/frontendEndpoints', frontDoorName, 'mainFrontendEndpoint')
            }
          ]
          acceptedProtocols: [
            'Https'
          ]
          patternsToMatch: [
            '/*'
          ]
          routeConfiguration: {
            '@odata.type': '#Microsoft.Azure.FrontDoor.Models.FrontdoorForwardingConfiguration'
            backendPool: {
              id: resourceId('Microsoft.Network/frontDoors/backendPools', frontDoorName, 'AppServicePool')
            }
          }
          enabledState: 'Enabled'
        }
      }
    ]
    backendPools: [
      {
        name: 'NodeJSBackendPool'
        properties: {
          backends: [
            {
              address: NodeJS_Backend.properties.defaultHostName
              httpPort: 80
              httpsPort: 443
              priority: 1
              weight: 500
            }
          ]
          loadBalancingSettings: {
            id: resourceId('Microsoft.Network/frontDoors/loadBalancingSettings', frontDoorName, 'loadBalancingSettings')
          }
          healthProbeSettings: {
            id: resourceId('Microsoft.Network/frontDoors/healthProbeSettings', frontDoorName, 'healthProbeSettings')
          }
        }
      }
      {
        name: 'AppServicePool'
        properties: {
          backends: [
            {
              address: App_Service.properties.defaultHostName
              httpPort: 80
              httpsPort: 443
              priority: 1
              weight: 500
            }
          ]
          loadBalancingSettings: {
            id: resourceId('Microsoft.Network/frontDoors/loadBalancingSettings', frontDoorName, 'loadBalancingSettings')
          }
          healthProbeSettings: {
            id: resourceId('Microsoft.Network/frontDoors/healthProbeSettings', frontDoorName, 'healthProbeSettings')
          }
        }
      }
    ]
    frontendEndpoints: [
      {
        name: 'mainFrontendEndpoint'
        properties: {
          hostName: '${frontDoorName}.azurefd.net'
        }
      }
    ]
    loadBalancingSettings: [
      {
        name: 'loadBalancingSettings'
        properties: {
          sampleSize: 4
          successfulSamplesRequired: 2
        }
      }
    ]
    healthProbeSettings: [
      {
        name: 'healthProbeSettings'
        properties: {
          path: '/healthz'
          protocol: 'Https'
          intervalInSeconds: 120
        }
      }
    ]
    enabledState: 'Enabled'
  }
}
