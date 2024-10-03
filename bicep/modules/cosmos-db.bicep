param location string
param app_name string
param keyVaultName string

var cosmosDbName = '${app_name}-cosmos'

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

resource cosmosKeyVaultSecret 'Microsoft.KeyVault/vaults/secrets@2021-04-01-preview' = {
  name: '${keyVaultName}/CosmosDBConnectionString'
  properties: {
    value: Cosmos_Mongo.listConnectionStrings().connectionStrings[0].connectionString
  }
}

