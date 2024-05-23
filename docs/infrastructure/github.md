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
