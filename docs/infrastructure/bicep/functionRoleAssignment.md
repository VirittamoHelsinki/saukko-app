# Function_Role_Assignment - Resurssi

## Tarkoitus
"Function_Role_Assignment" -resurssi antaa [Functions Appille](FunctionsApp.md) (jolla on systeemin identiteetti) "Contributor" roolin Storage Account -resurssiin (functionsStorage). Tämä rooli antaa [Functions Appille](FunctionsApp.md) oikeudet hallita [Storage Accountia](functionsStorage.md), joka on tarpeen esimerkiksi [Azure Functions](FunctionsApp.md) -sovelluksen toiminnan kannalta, koska se saattaa tarvita pääsyn [tallennusresurssiin](functionsStorage.md) erilaisten tehtävien suorittamiseksi (esimerkiksi logien tallennus, tiedostojen käsittely tai muiden tilapäistiedostojen tallennus).

## Yhteenveto
"Function_Role_Assignment" -resurssi varmistaa, että [Functions Appilla](FunctionsApp.md) on tarvittavat oikeudet hallita sille määriteltyä [Storage Accountia](functionsStorage.md), mahdollistamalla sovelluksen oikeaoppisen toiminnan ja resurssien käytön.

# Esimerkki
#### Ilman roolimäärittelyä:
* Functions Appilla on systeemin identiteetti
* Functions Appilla ei ole oikeuksia käyttää muita resursseja.
#### Roolimäärittelyn jälkeen:
* Functions Appilla on systeemin identiteetti.
* Functions Appilla on Contributor-rooli määritetyssä Storage Accountissa, mikä mahdollistaa sen hallinnan ja käytön.

Tässä tapauksessa, kun roolimäärittely luo "Function_Role_Assignment"-resurssin, se antaa systeemin identiteetille oikeudet hallita Storage Accountia, mikä mahdollistaa Functions Appin sujuvan toiminnan ja resurssien käytön, kuten esimerkiksi tiedostojen tallennuksen ja käsittelyn.