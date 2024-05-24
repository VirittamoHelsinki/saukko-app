# Saukko - Projekti Infrastruktuurin Dokumentaatio

## 1. Johdanto

Tässä dokumentaatiossa kuvataan, kuinka Saukko-App ympäristö rakennetaan, deployataan ja konfiguroidaan käyttämällä bicep-tiedostoa. Tämä dokumentaatio on tarkoitettu helpottamaan projektin ylläpitoa ja jatkokehitystä.

## 2. Projektin Arkkitehtuuri

#### **Frontend:** React-Vite-javascript
#### **Backend:** NodeJS-Express-TypeScript
#### **Azure Functions App:** ~~Replikoitu~~ Paranneltu ePerusteet käyttöliittymä
#### **Tietokanta:** Azure Cosmos DB (mongo)
#### **Application Insights:** Projektin monitorointi Azure ympristöissä

## 3. Azure Ympäristön Rakentaminen Bicep-tiedostolla
### 3.1  Bicep-tiedoston Yleiskatsaus
Bicep-tiedosto on infrastruktuurin määrittelytiedosto, joka käytetään Azure-resurssien provisiointiin. Tässä on lyhyt katsaus tiedostoon:

```ts
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
...
```

### 3.2 Bicep-tiedoston käyttöönotto
#### **1. Resurssiryhmän luominen:**
Resurssiryhmän nimi kannattaa pitää lyhyenä ja ytimekkäänä. Nimeä suunniteltaessa on hyvä huomioida, että siitä käy ilmi resurssien käyttötarkoitus ja ympäristö (tuotanto- tai testikäyttö). Tämä resurssiryhmän nimi toimii pohjana varsinaisten resurssien nimeämisessä. Azure-resursseilla on tavallisesti erilaisia sääntöjä niiden nimeämisessä, ja nämä säännöt on otettu huomioon Bicep-tiedostossa, lukuun ottamatta pituusrajoituksia. Hyvä nimi resurssiryhmälle Saukko-projektin osalta voisi olla esimerkiksi saukko-prod tai saukko-dev, riippuen siitä, mihin ympäristöön resursseja ollaan asentamassa.

Lisäksi resurssiryhmän sijainnin valinta on tärkeää. GDPR-säädöksien noudattamiseksi on suositeltavaa valita sijainti Euroopasta, jotta data pysyy EU:n alueella. Tämä varmistaa, että tiedot käsitellään ja säilytetään GDPR-vaatimusten mukaisesti.
```bash
az group create --name <resourcegroup_name> --location <location>
```
Esimerkiksi, jos haluat luoda resurssiryhmän Euroopan alueelle, voit valita sijainniksi northeurope tai westeurope:
```bash
az group create --name saukko-prod --location northeurope
```
#### **2. Deploy Bicep-tiedosto**
Vaikka Azure-ympäristön replikointi Bicepin avulla on helppoa ja nopeaa, se voi vaatia hieman manuaalista työtä. Bicepin avulla voimme kuitenkin minimoida tämän manuaalisen työn määrän. Alla olevaa komentoa voidaan käyttää Azure-ympäristön rakentamiseen. Kun ajat tämän komennon, varmista, että olet korvannut <resourcegroup_name> osion aiemmin lisäämälläsi resurssiryhmän nimellä. Varmista myös, että komento löytää Bicep-tiedostosi avaamalla konsolin projektin Bicep-kansioon.
```bash
az deployment group create --resource-group <resourcegroup_name> --template-file .bicep
```
Esimerkiksi, jos resurssiryhmäsi nimi on saukko-prod, komento näyttää tältä:
```bash
az deployment group create --resource-group saukko-prod --template-file .bicep
```

## 4. Infran Käyttöönoton Manuaaliset Työnvaiheet
### 4.1 Azure Portal Konfiguraatiot

1. Azure Function App Konfigurointi
    * Navigoi [Azure Portaliin.](https://portal.azure.com/)
    * Etsi ja avaa luomasi resurssiryhmä, resurssiryhmä [listalta.](https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups)
    * Valitse `Function App` Resurssilistalta. Resurssin nimi on muotoa `saukko-<env>-fn-<uniq-str>`
    * Sidebarista vasemmalla, valitse CORS ja aseta ainakin seuraavat originit listalle:
      - https://portal.azure.com (tämä mahdollistaa sen että voit triggeröidä Functioita suoraan portalista, esim testiä varten, mutta se ei ole pakollinen)
      - http://localhost:5173 (tätä ei lisätä jos kyseessä on production)
      - https://localhost:5173 (tätä ei lisätä jos kyseessä on production)
      - http://127.0.0.1:5173 (tätä ei lisätä jos kyseessä on production)
      - https://127.0.0.1:5173 (tätä ei lisätä jos kyseessä on production)
      - Tähän sinun tulisi lisätä vielä App Servicen URL (Clientin URL, Azure ympäristössä)
    * Sidebarista vasemmalla, valitse Deployment Center
      - Valitse Sourceksi GitHub
      - Valitse Organisaatioksi organisaatio joka omistaa projektin koodi repositoryn
      - Valitse Projektin Repository
      - Valitse Branch jonka version haluat tässä resurssiryhmässä julkaista, (dev / main / yms..)
      - Workflow Option: `Use available workflow: ...`
      - Authentication type: `Basic authentication`
2. Azure App Service Konfigurointi
    * Navigoi [Azure Portaliin.](https://portal.azure.com/)
    * Etsi ja avaa luomasi resurssiryhmä, resurssiryhmä [listalta.](https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups)
    * Valitse `App Service` Resurssilistalta. Resurssin nimi on muotoa `saukko-<env>-app-<uniq-str>`
    * Sidebarista vasemmalla, valitse Deployment Center
      - Valitse Sourceksi GitHub
      - Valitse Organisaatioksi organisaatio joka omistaa projektin koodi repositoryn
      - Valitse Projektin Repository
      - Valitse Branch jonka version haluat tässä resurssiryhmässä julkaista, (dev / main / yms..)
      - Workflow Option: `Use available workflow: ...`
      - Authentication type: `Basic authentication`
    * Sidebarista vasemmalla, valitse Environment variables
      - Nyt näet listan Sovellus asetuksia, nämä ovat samoja muuttujia joita projektin kehittäjillä on `.env` tiedostoissaan. Osa näiden muuttujien arvoista on jo valmiiksi asetettu, ja niihin ei tarvitse koskea. Näitä ovat esimerkiksi `Environment variables`, `APPLICATIONINSIGHTS_CONNECTION_STRING` sekä `MONGODB_URI`, niiden arvot on asetettu automaattisesti siinä vaiheessa kun tämä KO. resurssi on luotu bicep tiedostolla.
      - `NODE_ENV` arvoksi on defaultina asetettu `production|staging`, arvo pitää muokata vastaamaan tämän Azure resurssiryhmän luonnetta, siis joko `production` tai `staging`.
      - `APP_URL` tulee sisältää tämän App Servicen URL / Custom domain jota palvelun käyttäjät käyttävät saavuttaakseen tämän palvelun.
      - `JWT-SECRET` tulisi olla 64 merkkiä pitkä merkkijono, sitä käytetään allekirjoittamaan JWT tokenit. `JWT-SECRET` on tietoturvan kannalta oleellinen pitää salassa ja sen ei kannata olla sama kun mitä muissa ympäristöissä käytetään.
      - `EMAIL_SERVICE` sekä `EMAIL_SERVICE-*` muuttujat ovat palvelun käyttämän sähköpostipalvelun muuttujia sekä salaisuuksia.
      - On olemassa myös joitain muuttujia jotka pitää olla asennettuna jo react projectimme buildin aikana. React ei enään buildin jälkeen käytä dynaamisia env muuttujia joten meidän tulee varmistaa että nämä muuttujat ovat asennettu projektin github repositoryyn salaisuuksiksi.
        * Avaa projektin [repository](https://github.com/VirittamoHelsinki/saukko-app)
        * Valitse Settings
        * Vasemmalla sidebarista, laajenna `Secrets and variables` valikko
        * Valitse `Actions`
        * listalta tulisi löytyä seuraavat muuttujat:
            * EPERUSTEET_DATA_URL_PROD
            * EPERUSTEET_DATA_URL_DEV
            * APP_INSIGHTS_INSTRUMENTATION_KEY_PROD
            * APP_INSIGHTS_INSTRUMENTATION_KEY_DEV
        * Huomaa että et voi katsella muuttujien arvoja, voit ainoastaan päivittää tai poistaa KO. muuttujan arvon.
        * Tässä [linkki ohjeeseen](applicationInsights.md#kuinka-löytää-app_insights_instrumentation_key-azure-portaalissa) kuinka voit saada `APP_INSIGHTS_INSTRUMENTATION_KEY_*` arvon eri ympäristöissä
        * Tässä [linkki ohjeeseen](functionsApp.md#api-url-löytäminen-azuresta-eperusteet_data_url) kuinka voit saada `EPERUSTEET_DATA_URL_*` arvon eri ympäristöissä