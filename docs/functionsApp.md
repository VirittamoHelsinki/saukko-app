# Azure Functions App - ePerusteet replica
Tämä dokumentaatio kattaa Azure Functions -sovelluksen, joka on kehitetty ratkaisemaan ePerusteet REST API:n puutteita. Sovelluksen avulla pystymme hakemaan tarvittavat tiedot ePerusteista, käsittelemään ne ja tallentamaan MongoDB-tietokantaan (Azure Cosmos DB). Tämä dokumentaatio auttaa käyttäjiä ymmärtämään sovelluksen toimintaa ja käyttämään sen toimintoja.

## Yleiskuvaus
ePerusteet REST API on ajoittain hidas, ja joskus tietyt rajapinnat eivät ole käytettävissä. Lisäksi tiukat CORS-säännöt vaikeuttavat suoria API-kutsuja front-endistä. Näiden ongelmien ratkaisemiseksi olemme kehittäneet Azure Functions -sovelluksen, joka:

* Hakee tarvittavan datan ePerusteista haluttuun aikaan.
* Käsittelee ja tallentaa datan MongoDB-tietokantaan.
* Tarjoaa rajapinnat datan hakemiseen front-endistä.

## Funktiot

### ePerusteetTimedQuery
* **Trigger:** Ajastettu (Cron)
* **Kuvaus:** Hakee, käsittelee ja tallentaa datan ePerusteista MongoDB-tietokantaan joka päivä puoleltaöin.
* **Ajastus:** `'0 0 0 * * *'` (joka päivä klo 00:00)
* **Toiminta:**
  * Hakee tiedot ePerusteista.
  * Käsittelee datan.
  * Tallentaa datan MongoDB-tietokantaan.

### manualUpdateEperusteet
* **Trigger:** HTTP
* **Kuvaus:** Manuaalisesti laukaistava versio ePerusteetTimedQuery-funktiosta.
* **Käyttötarkoitus:** Uusimpien tietojen hakeminen, esim. kun Azure-infra on juuri pystytetty ja tietokanta on tyhjä.
* **Endpoint:** `/api/manualUpdateEperusteet`
* **Toiminta:**
  * Hakee tiedot ePerusteista.
  * Käsittelee datan.
  * Tallentaa datan MongoDB-tietokantaan.

### getDegrees
* **Trigger:** HTTP
* **Kuvaus:** Palauttaa paginoidun sivun tutkintojen dataa sekä tietoa sivutuksesta.
* **Endpoint:** `/api/getDegrees`
* **URL Search Params**

### getDegreeById
* **Trigger:** HTTP
* **Kuvaus:** Palauttaa yksittäisen tutkinnon tiedot.
* **Endpoint:** `/api/getDegreeById/{id}` TODO: Check the path

## Käyttöönotto
1. Kloonaa repository
```sh
git clone https://github.com/VirittamoHelsinki/saukko-app.git
cd saukko-app/functions
```
2. Asenna riippuvuudet
```sh
npm install
```
3. Määritä ympäristömuuttujat
    * Luo `.env` tiedosto functions projektin juureen ja lisää tarvittavat ympäristömuuttujat
      * ENVIRONMENT=production|development
      * MONGODB_URI_DEV=mongodb://saukko-dev-cosmos:......................
      * MONGODB_URI_PROD=mongodb://saukko-prod-cosmos:......................
4. Käynnistä paikallisesti:
```sh
npm run start
```

## Ympäristömuuttujat
* `ENVIRONMENT`: Määriittää mitä ympäristöä käytetään `development`|`production`
* `MONGODB_URI_DEV`: Projektin kehitysversion MongoDB yhteysmerkkijono (ConnecitonString)
* `MONGODB_URI_PROD`: Tuotantoversion MongoDB yhteysmerkkijono (ConnectionString), siinä tapauksessa jos projektia on tarkoituksenmukaista ajaa tyotantoympäristössä. Kuitenkaan tämä ei ole suositeltavaa devatessa.

## CORS
Tämä on tärkeä osio sovelluksen toiminnan sekä resurssi-turvallisuuden kannalta. Käy tämä osio huolellisesti läpi tästä linkinstä [CORS-DOCS](cors.md)

# API URL Löytäminen Azuresta (EPERUSTEET_DATA_URL)
1. **Kirjaudu Azure-portaliin:**
    * Mene [Azure-portaliin](https://portal.azure.com/) ja kirjaudu sisään.
2. **Navigoi haluamaasi resurssiryhmään**
    * Kirjoita hakukenttään `resource groups` ja valitse Resource groups
    * Etsi ja valitse haluamasi resurssiryhmä listalta
3. **Etsi ja Valitse listalta Functions App resurssi**
    * Resurssin nimi on muotoa `saukko-<env>-fn-<uniq-str>`
    * Tämä vie sinut Functions sovelluksen yleisnäkymään
4. Paikanna URL
    * URL sijaitsee functions sovelluksen yleisnäkymän `essentials` osiossa, sivun yläosassa
5. Kun tallennat tämän URL -osoitteen ympäristömuuttujaksi clientille, tai GitHub repository secretiksi, lisää URL osoitteeseen polku `/api`. Osoitteen tulisi näyttää suurinpiirtein tältä: `https://saukko-<env>-fn-<uniq-str>.azurewebsites.net/api`

## Huomioita
* Varmista, että Azure Function App -palvelu on käynnissä ja oikein konfiguroitu.
* Tarkista ympäristömuuttujien oikeellisuus ennen käyttöönottoa.
* Dokumentoi mahdolliset muutokset ja päivitykset tähän tiedostoon.
