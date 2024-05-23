# OsTu-App Infrastruktuuri
Tässä dokumentaatiossa kuvataan, kuinka Saukko-App ympäristö rakennetaan, deployataan ja konfiguroidaan käyttämällä bicep-tiedostoa. Tämä dokumentaatio on tarkoitettu helpottamaan projektin ylläpitoa ja jatkokehitystä.
![Kuva infrasta](img/infra.png)
Kuva Projektin infrastruktuurista on luotu käyttäen bicep visualisointityökalua.

## Sisällysluettelo
* Resurssit
  * [Azure Resurssien yleiskuvaus]()
  * [ApplicationInsights](applicationInsights.md)
  * [App Service](appService.md)
  * [Cosmos DB](cosmos.md)
  * [Functions App](functionsApp.md)
* Konfiguraatiot
  * [CORS](cors.md)
* Oppaat
  * [Käyttöönotto](infra.md)

## Azure-resurssien kuvaus
### 1. Azure App Service
#### Tarkoitus
Azure App Service toimii sovelluksesi hosting-alustana. Se palvelee kahta pääkomponenttia:
* **Node.js Express API:** Tämä on sovelluksen backend, joka käsittelee tietokantayhteydet ja muut palvelinpuolen toiminnot.
* **React-frontend:** Tämä on sovelluksen käyttäjälle näkyvä käyttöliittymä, joka on rakennettu ja toimitettu App Servicen kautta.

**Yhteenveto:** Azure App Service tarjoaa skaalautuvan ja hallitun ympäristön, jossa sekä frontend että backend toimivat saumattomasti yhdessä.
### 2. Azure Functions App
#### Tarkoitus
Azure Functions App suorittaa ajoitettuja tehtäviä ja tietojenkäsittelyä seuraavasti:
* **Datan haku ja käsittely:** Se hakee säännöllisin väliajoin dataa ePerusteet REST APIsta, käsittelee sen ja tallentaa tulokset Azure Cosmos DB:hen.
* **Datan tarjoaminen:** Se myös tarjoaa tätä käsiteltyä dataa frontend-sovellukselle.

**Yhteenveto:** Azure Functions App mahdollistaa taustaprosessit ja ajoitetut tehtävät, jotka ovat välttämättömiä sovelluksen tietojen päivittämiselle ja ylläpidolle.
### 3. Azure Cosmos DB (MongoDB)
#### Tarkoitus
Azure Cosmos DB toimii sovelluksen tietokantana, jossa kaikki sovelluksen käyttämä data tallennetaan ja haetaan. Se tukee MongoDB-rajapintaa, mikä tekee siitä joustavan ja skaalautuvan valinnan NoSQL-tietokannan tarpeisiin.

**Yhteenveto:** Azure Cosmos DB tarjoaa globaalisti jaetun, erittäin skaalautuvan tietokantaratkaisun, joka tukee sovelluksen datan tallennusta ja hallintaa.
### 4. Azure Application Insights
#### Tarkoitus
Azure Application Insights kerää ja analysoi sovelluksen suorituskyky- ja käyttötilastoja. Se seuraa muun muassa:
* **Virheiden seuranta:** Sovelluksen virheet ja poikkeukset.
* **Käyttäjäistunnot:** Tietoa käyttäjien toiminnasta ja käyttökokemuksesta.

**Yhteenveto:** Azure Application Insights tarjoaa kattavan näkymän sovelluksen toimintaan, auttaa tunnistamaan ongelmia ja parantamaan käyttäjäkokemusta.
### 5 Muut Resurssit
* **Workspace:** Tämä resurssi on pakollinen Application Insights -resurssin käyttöä varten. Se toimii tiedonkeruun ja -analysoinnin keskuspaikkana.
* **App Service Plan:** Tämä resurssi määrittää resurssien laskentatehon ja hinnan. Sekä Azure App Service että Azure Functions App käyttävät samaa suunnitelmaa, mikä optimoi resurssien käytön ja kustannukset.
* **Storage Account:** Tätä käytetään Azure Functions Appin WebJobStorage-na, jossa tallennetaan taustaprosessien tarvitsemia tilapäistiedostoja.
* **Role Assignment:** Tämä määrittää oikeudet, jotka mahdollistavat Azure Functions Appin käyttää Storage Accountia WebJobStorage-tarkoituksiin.

# DOKKARI - TODO
1. Azure "AZ" komentorivi
3. GITHUB SALAISUUDET
