param app_name string

param keyVaultName string

var communicationServicesName = '${app_name}-com-${uniqueString(resourceGroup().id)}'
var emailServiceName = '${app_name}-es-${uniqueString(resourceGroup().id)}'


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

resource communicationKeyVaultSecret 'Microsoft.KeyVault/vaults/secrets@2021-04-01-preview' = {
  name: '${keyVaultName}/PrimaryConnectionString'
  properties: {
    value: Communication_Services.listKeys().primaryConnectionString
  }
}

output mailFromSenderDomain string = AzureManagedDomain.properties.mailFromSenderDomain
