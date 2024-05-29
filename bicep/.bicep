/*
  check syntax:
  az bicep build --file .bicep

  Preview changes in azure:
  az deployment group what-if --resource-group <resourcegroup_name> --template-file .bicep

  Deploy:
  az deployment group create --resource-group <resourcegroup_name> --template-file .bicep

  backup app settings
  az webapp config appsettings list --name <existing_app_service_name> --resource-group <existing_resource_group> --query "[].{name:name,value:value}" --output tsv > env/<existing_app_service_name>_existing_app_settings.env
*/
param location string = resourceGroup().location
param app_name string = resourceGroup().name

var skuName = 'B1'
var skuTier = 'Basic'
var skuSize = 'B1'

var workspaceName = '${app_name}-ws-${uniqueString(resourceGroup().id)}'
var appInsightName = '${app_name}-insight-${uniqueString(resourceGroup().id)}'
var webappName = '${app_name}-app-${uniqueString(resourceGroup().id)}'
var functionsAppName = '${app_name}-fn-${uniqueString(resourceGroup().id)}'
var appServicePlanName = '${app_name}-asp'
var webjobsStorageName = 'webjobs${uniqueString(resourceGroup().id)}'
var cosmosDbName = '${app_name}-cosmos'
var communicationServicesName = '${app_name}-com-${uniqueString(resourceGroup().id)}'
var emailServiceName = '${app_name}-es-${uniqueString(resourceGroup().id)}'

// App Service plan for the APP
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

// APP SERVICE
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
          value: Application_Insights.properties.InstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: Application_Insights.properties.ConnectionString
        }
        {
          name: 'MONGODB_URI'
          value: Cosmos_Mongo.listConnectionStrings().connectionStrings[0].connectionString
        }
        {
          name: 'EMAIL_FROM_SENDER_DOMAIN'
          value: AzureManagedDomain.properties.mailFromSenderDomain
        }
        {
          name: 'EMAIL_SERVICE_CONNECTION_STRING'
          value: Communication_Services.listKeys().primaryConnectionString
        }
        {
          name: 'APP_URL'
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
        {
          name: 'NODE_ENV'
          value: 'staging|production'
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
    'hidden-link: /app-insights-resource-id': Application_Insights.id
  }
  properties: {
    enabled: true
    serverFarmId: ASP_NodeJS_AppService.id
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
          value: Application_Insights.properties.InstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: Application_Insights.properties.ConnectionString
        }
        {
          name: 'MONGODB_URI'
          value: replace(Cosmos_Mongo.listConnectionStrings().connectionStrings[0].connectionString, '?', 'eperusteet?')
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

/*
  b24988ac-6180-42a0-ab88-20f7382dd24c
  Grants full access to manage all resources, but does not allow you to assign roles in Azure RBAC,
  manage assignments in Azure Blueprints, or share image galleries.
*/
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

resource Cosmos_Mongo 'Microsoft.DocumentDB/databaseAccounts@2024-02-15-preview' = {
  name: cosmosDbName
  location: location
  kind: 'MongoDB'
  tags: {
    defaultExperience: 'Azure Cosmos DB for MongoDB API'
    'hidden-cosmos-mmspecial': ''
  }
  properties: {
    publicNetworkAccess: 'Enabled'
    databaseAccountOfferType: 'Standard'
    defaultIdentity: 'FirstPartyIdentity'
    // defaultPriorityLevel: 'High'
    minimalTlsVersion: 'Tls12'
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
      maxIntervalInSeconds: 5
      maxStalenessPrefix: 100
    }
    apiProperties: {
      serverVersion: '6.0'
    }
    locations: [
      {
        locationName: location
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
    cors: []
    capabilities: [
      {
        name: 'EnableMongo'
      }
      {
        name: 'EnableServerless'
      }
    ]
    ipRules: []
    backupPolicy: {
      type: 'Periodic'
      periodicModeProperties: {
        backupIntervalInMinutes: 240
        backupRetentionIntervalInHours: 8
        backupStorageRedundancy: 'Geo'
      }
    }
    networkAclBypassResourceIds: []
    diagnosticLogSettings: {
      enableFullTextQuery: 'None'
    }
  }
  identity: {
    type: 'None'
  }
}


resource Communication_Services 'Microsoft.Communication/communicationServices@2023-06-01-preview' = {
  name: communicationServicesName
  location: 'global'
  tags: {}
  properties: {
    dataLocation: 'Europe'
    linkedDomains: [
      AzureManagedDomain.id
    ]
  }
}


resource Email_Service 'Microsoft.Communication/emailServices@2023-06-01-preview' = {
  name: emailServiceName
  location: 'global'
  tags: {}
  properties: {
    dataLocation: 'Europe'
  }
}


resource AzureManagedDomain 'Microsoft.Communication/emailServices/domains@2023-06-01-preview' = {
  name: 'AzureManagedDomain'
  location: 'global'
  parent: Email_Service
  properties: {
    domainManagement: 'AzureManaged'
    userEngagementTracking: 'Disabled'
  }
}
