# CORS - Ja sen configurointi Azure Resurssissa
Cross-Origin Resource Sharing (CORS) on tärkeä mekanismi, joka sallii resurssien jakamisen eri alkuperien (origins) välillä. Azure Functions -sovelluksessamme on tärkeää määrittää sallitut alkuperät, jotta front-end-sovellukset voivat tehdä API-kutsuja turvallisesti.

### CORS Määritykset
Azure Functions -sovelluksessamme CORS on konfiguroitu siten, että vain tietyt alkuperät ovat sallittuja. Tämä varmistaa, että vain valtuutetut lähteet voivat käyttää sovelluksen rajapintoja.

### Sallittujet Originien Luettelo
Lisää alla olevat alkuperät (origins) Azure Functions -sovelluksen CORS-asetuksiin:
* Sovelluksen Frontendin URL
* DEV / STAGING ympäristössä joudut lisäämään myös paikallisen kehitysympäristön originit joita voi olla esim:
  * `http://localhost:5173`
  * `https://localhost:5173`
  * `http://172:0.0.1:5173`
  * `https://127.0.0.1:5173`
* Saatat haluta lisätä myös `https://portal.azure.com`, sillä se mahdollistaa functioiden testiajot Azure Portalin kautta.

### CORS-asetusten päivitys
Voit päivittää CORS-asetuksia Azure Functions -sovelluksessasi joko Azure-portaalin kautta tai käyttämällä Azure CLI:tä.

#### Azure potalin kautta
1. Siirry Azure Function App -palvelusi asetuksiin Azure-portaalissa.
2. Valitse `CORS`-osio.
3. Lisää sallitut alkuperät (origins) yllä olevasta luettelosta.
4. Tallenna muutokset.

#### Azure CLI:n kautta
Voit käyttää Azure CLI:tä lisätäksesi sallitut alkuperät (origins) seuraavalla komennolla:
```sh
az functionapp cors add --name <function-app-name> --resource-group <resource-group-name> --allowed-origins "https://example-frontend.com" "https://another-frontend.com" "http://localhost:5173"
```

### Huomioita
* Varmista, että lisäät vain tarvittavat ja luotetut alkuperät (origins) CORS-asetuksiin.
* Kehitysympäristössä voit sallia kaikki alkuperät käyttämällä wildcard-merkkiä (*), mutta tuotantoympäristössä tämä ei ole suositeltavaa turvallisuussyistä.
* Testaa CORS-asetukset huolellisesti varmistaaksesi, että front-end-sovelluksesi voivat tehdä onnistuneita API-kutsuja ilman CORS-virheitä.