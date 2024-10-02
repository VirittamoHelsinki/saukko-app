param app_name string

var communicationServicesName = '${app_name}-com-${uniqueString(resourceGroup().id)}'
var emailServiceName = '${app_name}-es-${uniqueString(resourceGroup().id)}'

resource Communication_Services 'Microsoft.Communication/communicationServices@2023-06-01-preview' = {
  name: communicationServicesName
  location: 'global'
  properties: {
    dataLocation: 'Europe'
  }
}

resource Email_Service 'Microsoft.Communication/emailServices@2023-06-01-preview' = {
  name: emailServiceName
  location: 'global'
  properties: {
    dataLocation: 'Europe'
  }
}
