# GitHub Actions (CI/CD)
Projektissamme GitHubilla on keskeinen rooli koodin laadunvalvonnassa ja jatkuvassa toimituksessa (Continuous Delivery, CD). Käytämme GitHub Actions -työkaluja automatisoimaan build- ja deploy-prosessit sekä staging- että tuotantoympäristöihin Azureen.

## GitHub Actions ja CD-prosessi
GitHub Actions -työkaluja käytetään seuraaviin tehtäviin:

1. **Koodin laadunvalvonta:** Ennen kuin koodi hyväksytään ja yhdistetään päähaaraan, varmistamme sen laadun automaattisilla testeillä ja tarkistuksilla.
2. **Build ja deploy:** Automaattiset build- ja deploy-prosessit varmistavat, että koodi siirtyy sujuvasti kehitysympäristöstä tuotantoon.

### Ympäristömuuttujat ja GitHub Repositoryn Secretit
Build- ja deploy-prosessien onnistumiseksi on tärkeää määrittää tarvittavat ympäristömuuttujat GitHub-repositoryn secrettien avulla. Tärkeitä muuttujia ovat esimerkiksi:

* **Azuren deployment-profiilit:** Nämä ovat välttämättömiä, jotta GitHub Actions voi onnistuneesti deployata projektin Azure-resursseihin, kuten App Service tai Functions App.
* **React-projektin ympäristömuuttujat:** Näitä muuttujia käytetään build-vaiheessa ja ne on määritetty secrettienä:
  * `APP_INSIGHTS_INSTRUMENTATION_KEY_DEV`
  * `APP_INSIGHTS_INSTRUMENTATION_KEY_PROD`
  * `EPERUSTEET_DATA_URL_DEV`
  * `EPERUSTEET_DATA_URL_PROD`

### GitHub Actions -tiedostot
Projektissamme on viisi erillistä GitHub Actions -työtiedostoa, joilla on omat erityiset tehtävänsä. Kukin niistä määrittää, millaisia muutoksia projektiin tulee tehdä ja missä branchissa nämä muutokset tapahtuvat, jotta eri toiminnot aktivoituvat.

1. `dev_staging-app-service.yml`: Deployaa dev-haaran koodin App Serviceen staging-ympäristöön.
2. `main_prod-app-service.yml`: Deployaa päähaaran (main) koodin App Serviceen tuotantoympäristöön.
3. `dev_staging-functions-app.yml`: Deployaa dev-haaran koodin Functions Appiin staging-ympäristöön.
4. `main_prod-functions-app.yml`: Deployaa päähaaran (main) koodin Functions Appiin tuotantoympäristöön.
5. `on-pr-main-dev.yml`: Tarkistaa koodin laadun ja suorittaa testit, ennen kuin pull request voidaan hyväksyä ja yhdistää päähaaraan.

## Yhteenveto
GitHub ja GitHub Actions ovat olennaisia projektimme automatisoidussa build- ja deploy-prosessissa. Ne varmistavat koodin laadun ja mahdollistavat sujuvan siirtymän kehityksestä tuotantoon. Ympäristömuuttujien määrittäminen secrettien avulla on ratkaisevaa onnistuneelle build- ja deploy-prosessille, ja erilliset GitHub Actions -tiedostot hallinnoivat eri ympäristöihin suuntautuvia deploy-prosesseja ja koodin laadunvalvontaa.

## GitHub Repository Secretien Asettaminen
GitHub repository secretit ovat ympäristömuuttujia, jotka tallennetaan turvallisesti ja joita käytetään GitHub Actions -työnkulkujen aikana. Tässä ovat ohjeet, kuinka repository secret asetetaan ja mitä oikeuksia GitHub-käyttäjällä tulee olla, jotta hän voi lisätä ja muokata niitä.

### Oikeudet
Jotta käyttäjä voi lisätä ja muokata repository secrettien arvoja, hänellä tulee olla maintainer tai administrator oikeudet kyseiseen repositoryyn.

### Ohjeet Secrettien Asettamiseen
1. **Navigoi GitHub Repositoryyn:**
    Mene haluamaasi repositoryyn, jossa haluat asettaa secretin.
2. **Asetukset:**
    Klikkaa repositoryn sivun yläosassa olevaa Settings (Asetukset) välilehteä.
3. **Secrets and Variables:**
    Vasemmanpuoleisesta valikosta valitse Secrets and variables, ja sen alta Actions.
4. **Uuden Secretin Lisääminen:**
    Klikkaa **New repository secret** -painiketta.
5. **Nimi ja Arvo:**
    * **Name:** Anna secretille nimi. Esimerkiksi `APP_INSIGHTS_INSTRUMENTATION_KEY_DEV`
    * **Value:** Anna secretille arvo, esimerkiksi Azuren Application Insights -avain
6. **Tallenna Secret:**
    Klikkaa Add secret tallentaaksesi secretin.

### Esimerkkejä Tarvittavista Secreteistä
* `AZURE_WEBAPP_PUBLISH_PROFILE_DEV`
* `AZURE_WEBAPP_PUBLISH_PROFILE_PROD`
* `APP_INSIGHTS_INSTRUMENTATION_KEY_DEV`
* `APP_INSIGHTS_INSTRUMENTATION_KEY_PROD`
* `EPERUSTEET_DATA_URL_DEV`
* `EPERUSTEET_DATA_URL_PROD`

### Yhteenveto
GitHub repository secrettien avulla voit hallita ympäristömuuttujia turvallisesti ja käyttää niitä GitHub Actions -työnkulkujen aikana. Oikeudet näiden secreteiden hallintaan edellyttävät maintainer- tai administrator-oikeuksia. Secrettien lisääminen tapahtuu repositoryn asetuksissa seuraamalla yllä kuvattuja askeleita. Näin voit varmistaa, että ympäristömuuttujat ovat käytettävissä ja suojattuina build- ja deploy-prosessin aikana.