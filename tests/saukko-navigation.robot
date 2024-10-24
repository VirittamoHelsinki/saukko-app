*** Settings ***
Library         SeleniumLibrary
Library         OperatingSystem
Library         Collections
Library         DateTime
Resource        saukko-variables.robot
Resource        saukko-keywords.robot

*** Keywords ***
Handle Popup If Present
    ${unsaved_msg}=       Set Variable  Jos poistut sivulta, tallentamattomat tiedot menetetään.
    ${exit_button}=       Set Variable  //button[text()="Poistu sivulta"]

    Set Browser Implicit Wait   0.1 seconds
    ${popup_present}=       Run Keyword And Return Status    Page Should Contain    ${unsaved_msg}
    Set Browser Implicit Wait   2 seconds

    IF  ${popup_present}
        Click Element     xpath=${exit_button}
    END


Go To FrontPage
    [Arguments]   ${user_type}
    [Tags]  navigate  valid

    Open Hamburgermenu
    Wait Until Element Is Visible   xpath=//p[contains(@class,'NavText') and contains(text(),'Etusivu')]
    Click Element                   xpath=//p[contains(@class,'NavText') and contains(text(),'Etusivu')]

    IF    '${user_type}' == 'customer'
        Location Should Contain     ${url}unit-list
    ELSE
        Location Should Be          ${url}
    END



Go To Loginpage
    [Tags]  navigate  valid
    Go To                          ${url}
    Wait Until Element Is Visible  xpath=//section[@class="landingPage__buttons"]//div[@class="button__text" and text()="Kirjaudu sisään"]   5
    Scroll Element Into View       xpath=//section[@class="landingPage__buttons"]//div[@class="button__text" and text()="Kirjaudu sisään"]
    Click Element                  xpath=//section[@class="landingPage__buttons"]//div[@class="button__text" and text()="Kirjaudu sisään"]
    Location Should Be             ${url}login


Go To Degreespage
    [Tags]  navigate  valid
    Go To              ${url}
    Open Hamburgermenu
    Wait Until Element Is Visible   xpath=//p[contains(@class,'NavText') and contains(text(),'Tutkinnot')]  5
    Click Element                   xpath=//p[contains(@class,'NavText') and contains(text(),'Tutkinnot')]
    Wait Until Location Is          ${url}degrees/add  5


Go To Profilepage
    [Tags]  navigate  valid
    Go To                          ${url}
    Open Hamburgermenu
    Wait Until Element Is Visible  xpath=//p[contains(@class,'NavText') and contains(text(),'Profiili')]  5
    Click Element                  xpath=//p[contains(@class,'NavText') and contains(text(),'Profiili')]
    Wait Until Location Is         ${url}profile  5


Go To Jobpage
    [Tags]  navigate  valid
    Open Hamburgermenu
    Wait Until Element Is Visible    xpath=//p[contains(@class,'NavText') and contains(text(),'Työpaikat')]  5
    Click Element                    xpath=//p[contains(@class,'NavText') and contains(text(),'Työpaikat')]
    Wait Until Location Is           ${url}add/companyname  5


Go To Contractpage
    [Tags]  navigate  valid
    Open Hamburgermenu
    Wait Until Element Is Visible    xpath=//p[contains(@class,'NavText') and contains(text(),'Luo uusi sopimus')]  5
    Click Element                    xpath=//p[contains(@class,'NavText') and contains(text(),'Luo uusi sopimus')]
    Wait Until Location Is           ${url}evaluation-form  5


Go To Teacherspage
    [Tags]  navigate  valid
    Open Hamburgermenu
    Wait Until Element Is Visible    xpath=//p[contains(@class,'NavText') and contains(text(),'Opettajat')]  5
    Click Element                    xpath=//p[contains(@class,'NavText') and contains(text(),'Opettajat')]
    Wait Until Location Contains     teacher-list  5


Go To Registerationpage
    Go To                           ${url}register-user
    Wait Until Location Contains    register-user    5
