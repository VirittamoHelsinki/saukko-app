# Application Insights
Azure Insights tarjoaa kattavan ratkaisun sovelluksen suorituskyvyn valvontaan ja lokitietojen keräämiseen. Se sisältää useita komponentteja, kuten:
* **Application Insights:** Sovelluksen suorituskyvyn seurantaan ja diagnostiikkaan.
* **Azure Monitor Logs:** Kehittyneet lokitiedot ja kyselymahdollisuudet.
* **Azure Monitor Metrics:** Metriikat ja hälytykset sovelluksen suorituskyvyn seurantaan.

## Hyödynnä projektissa
1. Sovelluksen Suorituskyvyn Seuranta: Integroi Application Insights sovellukseesi sekä Frontend-, Backend- että Function App -tasolla. Näin voit seurata sovelluksen suorituskykyä reaaliajassa, havaita pullonkauloja ja optimoida suorituskykyä.

2. Lokitietojen Kerääminen: Konfiguroi kaikki osat sovelluksestasi lähettämään lokitietoja Azure Monitor Logs -palveluun. Voit määrittää hälytyksiä tiettyjen poikkeusten tai suorituskyvyn mittareiden ylittämisestä.

3. Käyttäjäsessioiden Seuranta: Application Insights tarjoaa mahdollisuuden seurata käyttäjäsessioita ja käyttäjätoimintaa sovelluksessasi. Tämä auttaa ymmärtämään, miten käyttäjät vuorovaikuttavat sovelluksen kanssa ja tunnistamaan mahdollisia käyttöongelmia.

4. Kustomoidut Kyselyt ja Raportit: Käytä Azure Monitor Logs -palvelua luomaan kustomoituja kyselyjä ja raportteja lokitiedoista. Voit analysoida tietoja syvällisemmin ja tunnistaa trendejä tai ongelmia sovelluksessasi.

Tämän dokumentaation kirjoitushetkellä ainoastaan Frontend on konfiguroitu lähettämään virhe sekä sessio dataa Application Insights palveluun. Infrastruktuuri on kuitenkin suunniteltu sekä toteutettu niin, että myös backend sekä ePerusteet - Functions app voivat lokittaa sinne dataa. Azure Insights palvelun käyttöönotto myös sovelluksen muissa osioissa on hyvin suoraviivaista ja Microsoft on [documentoinut](https://learn.microsoft.com/en-us/azure/azure-monitor/app/nodejs) työvaiheet varsin hyvin.

## Virheiden Paikantaminen Azure Insightsin Avulla ErrorId:n Perusteella
Kun React Frontendissa tapahtuu virhe, ErrorBoundary ottaa tämän virheen kiinni ja luo sille uniikin tunnisteen, jota kutsutaan ErrorId:ksi. Tämä ErrorId toimii avaimena virheen jäljittämisessä Azure Insights -palvelussa.

1. **Asiakkaan Ilmoitus:** Kun käyttäjä kohtaa virheen sovelluksessa, ErrorBoundary luo virheelle ErrorId:n ja näyttää sen käyttäjälle. Käyttäjä voi ottaa yhteyttä tekniseen tukeen ja toimittaa tämän ErrorId:n heille.
2. **Kirjautuminen Azure-tiliin:** Tekninen tuki kirjautuu Azure-tilille [Azure-portaaliin](https://portal.azure.com).
3. **Navigointi Azure Insightsiin:** Azure-portaalissa tekninen tuki siirtyy Azure Insightsiin valitsemalla haluamansa resurssiryhmän ja valitsemalla sieltä "Application Insights".
4. **Haku ErrorId:llä:** Azure Application Insights -näkymässä tekninen tuki valitsee "Transaction Search" sivupalkista ja lisää filtterin errorId, jonka arvoksi he syöttävät asiakkaalta saamansa ErrorId:n.
5. **Hakutulosten Tarkastelu:** Suoritettuaan haun Azure Insights palauttaa kaikki lokitiedot, joissa ErrorId vastaa annettua arvoa. Tekninen tuki voi tarkastella näitä tietoja saadakseen lisätietoja virheestä.
6. **Virheen Analysointi ja Korjaaminen:** Käyttämällä saatuja lokitietoja tekninen tuki voi analysoida virheen syyn ja tarvittaessa korjata sen sovelluksessa.

## Kuinka löytää APP_INSIGHTS_INSTRUMENTATION_KEY Azure-portaalissa
1. Kirjaudu Azure-tilillesi: Avaa selain ja siirry [Azure-portaaliin](https://portal.azure.com). Kirjaudu sisään Azure-tilillesi käyttämällä asianmukaisia tunnistetietoja.

2. Valitse Sovellus: Valitse "Resource groups (Resurssiryhmät)" tai "All resources (Kaikki resurssit)" -vaihtoehdosta sovellus, johon olet liittänyt Application Insightsin.

3. Etsi Application Insights -resurssi: Sovelluslistauksessa etsi Application Insights -resurssi, joka vastaa sovellusta, jota haluat tarkastella. Napsauta sen nimeä avataksesi resurssin yksityiskohdat.

4. Näytä Instrumentation Key: Application Insightsin yksityiskohtanäkymässä, sivun yläosassa "Essentials" osiossa on rivi nimeltään "Instrumentation Key", Tarvitset tätä tietoa kun määrität .env tiedostoon tai GitHub Repository salaisuuksiin APP_INSIGHTS_INSTRUMENTATION_KEY muuttujaa.