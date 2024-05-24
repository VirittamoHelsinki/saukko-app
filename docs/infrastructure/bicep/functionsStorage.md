# FunctionsStorage - Resurssi

## Tarkoitus
**"functionsStorage"** -resurssi luo Azure Storage Accountin, jota käytetään pääasiassa seuraaviin tarkoituksiin:
1. **Azure Functionsin Tallennustarpeet:**
    * Azure Functions vaatii Storage Accountin erilaisia toimintoja varten, kuten:
      * Funktioiden suoritusajan (runtime) tilapäistiedostojen tallennus.
      * Funktioiden hallinnolliset tiedostot, kuten triggerit ja metatiedot.
    * Storage Account toimii varastona [Functions_App](FunctionsApp.md) resurssin AzureWebJobsStorage-asetuksessa, joka on kriittinen Azure Functions -sovelluksille.
2. **Sovelluksen Data ja Logit:**
    * Storage Accountia voidaan käyttää myös sovelluksen datan ja logien tallentamiseen, mikä voi olla hyödyllistä erityisesti monimutkaisissa sovellusarkkitehtuureissa.

## Yhteenveto
**"functionsStorage"** -resurssi on Azure Storage Account, joka on oleellinen komponentti Azure Functions -sovelluksen toiminnan kannalta. Se tarjoaa tarvittavat tallennustilat ja -palvelut, joita Functions App käyttää suoritusaikana ja hallinnollisiin tarkoituksiin. Tämä tallennustili on määritelty käyttämään Standard_LRS-SKU:ta ja StorageV2-tyyppiä, mikä tarjoaa monipuoliset ja skaalautuvat tallennusominaisuudet kohtuullisella kustannustasolla.
