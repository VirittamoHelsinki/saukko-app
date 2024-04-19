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

var environment = contains(resourceGroup().name, 'dev') ? 'dev' : contains(resourceGroup().name, 'prod') ? 'prod': 'other'
var isProd = environment == 'prod'

var skuName = isProd ? 'B1' : 'F1'
var skuTier = isProd ? 'Basic' : 'Free'
var skuSize = isProd ? 'B1' : 'F1'

var workspaceName = '${app_name}-ws-${uniqueString(resourceGroup().id)}'
var appInsightName = '${app_name}-insight-${uniqueString(resourceGroup().id)}'
var webappName = '${app_name}-app-${uniqueString(resourceGroup().id)}'
var appServicePlanName = '${app_name}-asp'

// App Service plan for backend
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
      ]
    }
  }
}

// Application Insights
resource Application_Insights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Redfield'
    Request_Source: 'IbizaAIExtensionEnablementBlade'
    SamplingPercentage: null
    RetentionInDays: 90
    WorkspaceResourceId: Workspace.id
    IngestionMode: 'LogAnalytics'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// Workspace
resource Workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: workspaceName
  location: location
  properties: {
    sku: {
      name: 'pergb2018'
    }
    retentionInDays: 30
    features: {
      legacy: 0
      searchVersion: 1
      enableLogAccessUsingOnlyResourcePermissions: true
    }
    workspaceCapping: {
      dailyQuotaGb: json('-1.0')
    }
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}
