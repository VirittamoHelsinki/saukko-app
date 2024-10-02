param location string
param cosmosDbName string

resource Cosmos_Mongo 'Microsoft.DocumentDB/databaseAccounts@2024-02-15-preview' = {
  name: cosmosDbName
  location: location
  kind: 'MongoDB'
  properties: {
    publicNetworkAccess: 'Enabled'
    databaseAccountOfferType: 'Standard'
    minimalTlsVersion: 'Tls12'
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    // Additional properties...
  }
}

output mongoDbConnectionString string = Cosmos_Mongo.listConnectionStrings().connectionStrings[0].connectionString
