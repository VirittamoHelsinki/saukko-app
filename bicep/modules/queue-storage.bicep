param location string
param keyVaultName string

var queueStorageName = 'queue${uniqueString(resourceGroup().id)}'
var mailerQueueName = 'mailer'

resource QueueStorage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  name: queueStorageName
  location: location
  tags: {}
  properties: {
    dnsEndpointType: 'Standard'
    defaultToOAuthAuthentication: false
    publicNetworkAccess: 'Enabled'
    allowCrossTenantReplication: false
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    allowSharedKeyAccess: true
    largeFileSharesState: 'Enabled'
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      requireInfrastructureEncryption: false
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
    // primaryEndpoints: {
    //   dfs: 'https://queuestoragesaukkotest.dfs.core.windows.net/'
    //   web: 'https://queuestoragesaukkotest.z16.web.core.windows.net/'
    //   blob: 'https://queuestoragesaukkotest.blob.core.windows.net/'
    //   queue: 'https://queuestoragesaukkotest.queue.core.windows.net/'
    //   table: 'https://queuestoragesaukkotest.table.core.windows.net/'
    //   file: 'https://queuestoragesaukkotest.file.core.windows.net/'
    // }
  }
}

resource queueService 'Microsoft.Storage/storageAccounts/queueServices@2023-01-01' = {
  parent: QueueStorage
  name: 'default'
  properties: {}
}

resource mailerQueue 'Microsoft.Storage/storageAccounts/queueServices/queues@2023-01-01' = {
  parent: queueService
  name: mailerQueueName
  properties: {}
}
  
resource queueKeyVaultSecret 'Microsoft.KeyVault/vaults/secrets@2021-04-01-preview' = {
  name: '${keyVaultName}/QUEUE_STORAGE_CONNECTION_STRING'
  properties: {
    value: QueueStorage.listKeys().keys[0].value
  }
}

output mailerQueueEndpoint string = '${QueueStorage.properties.primaryEndpoints.queue}/${mailerQueueName}'
