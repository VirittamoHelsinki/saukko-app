*** Settings ***
Library         SeleniumLibrary
Library         OperatingSystem
Library         Collections
Library         DateTime
Resource        saukko-variables.robot
Resource        saukko-keywords.robot

*** Keywords ***
Generate Random Workplace
    ${current_time}=     Evaluate   time.time()  time
    Evaluate             random.seed(${current_time})  random
    ${word}=             Evaluate   random.choice(@{r_words})  random
	${location}=         Evaluate   random.choice(@{r_locations})   random
    ${business}=         Evaluate   random.choice(@{r_business})    random
    ${workplace}=        Set Variable  ${word}${location} ${business}
    Return From Keyword  ${workplace}


Generate Random Vatnumber
    ${current_time}=      Evaluate   time.time()  time
    Evaluate              random.seed(${current_time})  random
    ${first}=             Evaluate  random.randint(1, 9)  random
    ${digits}=            Evaluate   ''.join(random.choices('0123456789', k=6))   random
    ${last}=              Evaluate  random.randint(1, 9)   random
    ${vat}=               Set Variable   ${first}${digits}-${last}
    Return From Keyword   ${vat}
