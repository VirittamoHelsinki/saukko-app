param location string
param keyVaultName string
param skuName string = 'standard'

resource keyVault 'Microsoft.KeyVault/vaults@2023-02-01' = {
  name: keyVaultName
  location: location
  properties: {
    sku: {
      family: 'A'
      name: skuName
    }
    tenantId: subscription().tenantId
    accessPolicies: [
      {
        tenantId: subscription().tenantId
        objectId: '<objectId-of-your-principal>' // This could be the object ID of the service principal or user
        permissions: {
          secrets: [
            'get'
            'set'
            'list'
          ]
        }
      }
    ]
    enabledForDeployment: true
    enabledForTemplateDeployment: true
    enabledForDiskEncryption: false
    enablePurgeProtection: true
    enableSoftDelete: true
  }
}

output keyVaultUri string = keyVault.properties.vaultUri
