param location string
param app_name string
param keyVaultName string

var queueStorageName = 'queue${uniqueString(resourceGroup().id)}'
var mailerQueueName = 'mailer'

resource QueueStorage 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: queueStorageName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    encryption: {
      services: {
        queue: {
          enabled: true
        }
      }
    }
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
}

resource queueKeyVaultSecret 'Microsoft.KeyVault/vaults/secrets@2021-04-01-preview' = {
  name: '${keyVaultName}/QueueConnectionString'
  properties: {
    value: QueueStorage.listKeys().keys[0].value
  }
}

output mailerQueueEndpoint string = '${QueueStorage.properties.primaryEndpoints.queue}/${mailerQueueName}'
