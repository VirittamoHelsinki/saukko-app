*** Settings ***
Library         SeleniumLibrary
Library         OperatingSystem
Library         Collections
Library         DateTime
Resource        saukko-variables.robot
Resource        saukko-navigation.robot
Resource        saukko-randomgenerators.robot


*** Keywords ***
Open Browserwindow
    Set Selenium Speed          0.2

    Open Browser                ${url}    ${browser}
    # Sleep                       5  # enough time to press the default search-engine popup in chrome
    Set Browser Implicit Wait   2 seconds


Toggle Password Visibility
    [Tags]  button  valid
    Click Element    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/form/div/div/div[2]/div[1]/div/span
    Click Element    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/form/div/div/div[2]/div[2]/div/span
    Click Element    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/form/div/div/div[2]/div[3]/div/span


Change Password
    [Tags]  password  valid
    [Arguments]  ${old_pw}  ${new_pw}
    Go To Profilepage
    Wait Until Element Is Visible   xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]
    Click Element                   xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]
    Toggle Password Visibility
    Input Password                  xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/form/div/div/div[2]/div[1]/div/input  ${old_pw}
    Input Password                  xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/form/div/div/div[2]/div[2]/div/input  ${new_pw}
    Input Password                  xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/form/div/div/div[2]/div[3]/div/input  ${new_pw}
    Toggle Password Visibility
    Click Button                    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/form/div/div/button
    Page Should Contain             Tiedot päivitetty
    Click Button                    xpath=//*[@id="customized-dialog-title"]/button


Enter Login Credentials
    [Tags]  login  valid
    [Arguments]  ${email}  ${password}  ${firstname}  ${user_type}
    Location Should Be          ${url}login
    Input Text                  id:email     ${email}
    Input Password              id:password  ${password}
    Click Element               xpath=//div[@class="button__text" and text()="Kirjaudu sisään"]
    Wait Until Location Is Not  ${url}login  5

    IF    '${USER_TYPE}' == 'customer'
        Location Should Contain     ${url}unit-list
        Page Should Contain         Tervetuloa, ${firstname}
    ELSE
        Location Should Be          ${url}
        Page Should Contain         Tervetuloa ${firstname}
    END


Open Hamburgermenu
    [Tags]  valid  menu
    Wait Until Element Is Visible   xpath=//*[@id="root"]/div/div/div[1]/div[2]/button  5
    Click Element                   xpath=//*[@id="root"]/div/div/div[1]/div[2]/button
    Handle Popup If Present
    Wait Until Page Contains        Kirjaudu ulos   5


Login User
    [Tags]  login  navigate  valid
    [Arguments]  ${email}  ${password}  ${firstname}  ${user_type}
    Go To Loginpage
    Enter Login Credentials  ${email}  ${password}  ${firstname}  ${user_type}


Logout User
    [Tags]  logout  valid
    Open Hamburgermenu
    Handle Popup If Present

    Wait Until Element Is Visible   xpath=//p[text()="Kirjaudu ulos"]   5
    Click Element                   xpath=//p[text()="Kirjaudu ulos"]

    Page Should Contain Element     xpath=//div[@class="button__text" and text()="Kirjaudu sisään"]
    Page Should Contain             Kirjaudu sisään



Forgotten Password Case
    [Tags]  valid  email
    [Arguments]  ${email}
    Go To Loginpage
    Click Link                  css:a[href="/forgot-password"]
    Wait Until Location Is      ${url}forgot-password  5
    Input Text                  id:email    ${email}
    Click Element               xpath=//div[@class="button__text" and text()="Lähetä"]
    Page Should Contain         Tarkista sähköpostisi
    Wait Until Location Is Not  ${url}forgot-password  5


Forgotten Password Invalid Email
    [Tags]  invalid  email  navigate
    [Arguments]  ${email}
    Go To Loginpage
    Click Link                  css:a[href="/forgot-password"]
    Wait Until Location Is      ${url}forgot-password  5
    Input Text                  id:email    ${email}
    Click Element               xpath=//div[@class="button__text" and text()="Lähetä"]
    Page Should Not Contain     Tarkista sähköpostisi
    Location Should Be          ${url}forgot-password


Search And Select Degree
    [Arguments]  ${degree}  ${searchterm}
    Location Should Be              ${url}degrees/add
    ${classname}=                   Set Variable  addDegree__container--list
    ${xpath}=                       Set Variable  //*[@id="listContainer"]/div[contains(@class,"${classname}")]/p[text()="${degree}"]
    Wait Until Element Is Visible   xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[1]/input  5
    Input Text                      xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[1]/input  ${searchterm}
    Wait Until Page Contains        ${degree}  5
    Wait Until Element Is Visible   ${xpath}   5
    Click Element                   ${xpath}
    Wait Until Location Is Not      ${url}degrees/add  5


Search And Select New Degree
    [Arguments]  ${degree}  ${searchterm}
    Location Should Be              ${url}degrees
    ${listclass}=                   Set Variable  searchPage__container--list
    ${resultclass}=                 Set Variable  searchPage__container--list-item
    ${xpath}=                       Set Variable  //*[@class="${listclass}"]/div[@class="${resultclass}"]/h3[text()="${degree}"]

    Wait Until Element Is Visible     xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[1]/input  5
    Wait Until Page Contains Element  xpath=//*[@class='searchPage__container--list']     5

    Input Text                        xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[1]/input  ${searchterm}
    Wait Until Page Contains          ${degree}  5
    Wait Until Page Contains Element  ${xpath}  5
    Click Element                     ${xpath}
    Wait Until Location Is Not        ${url}degrees  5


Add Degree Partname And Tasks
    ${editbuttons}=      Get WebElements   xpath=//div[@class='unit']/button[contains(@class, 'edit')]

    FOR       ${button}     IN     @{editbuttons}
        Click Element              ${button}
        Wait Until Page Contains Element   xpath=//*[contains(@class, 'modal')]   5

        # randomize 1-3 tasks
        ${taskamount}=     Evaluate    random.randint(2, 4)
        FOR   ${i}   IN RANGE   1    ${taskamount}
            Page Should Contain Element   xpath=//*[@class="button__text" and text()="Lisää uusi ammattitaitovaatimus"]
            Click Element                 xpath=//*[@class="button__text" and text()="Lisää uusi ammattitaitovaatimus"]

            Input Text    xpath=//label[text()='Ammattitaitovaatimuksen nimi *']/following-sibling::input    Vaatimusnimi${i}
            Input Text    xpath=//label[text()='Kriteerit *']/following-sibling::textarea    Kriteeri${i}

            Page Should Contain Element   xpath=//*[@class="button__text" and text()="Lisää ammattitaitovaatimus"]
            Click Element                 xpath=//*[@class="button__text" and text()="Lisää ammattitaitovaatimus"]
        END

        Press Keys                         None   '\ue00c'
    END


Add Degree
    [Arguments]     ${degree}   ${searchterm}
    Go To Degreespage
    Page Should Contain Element   xpath=//*[@class="button__text" and text()="Lisää tutkinto"]
    Click Element                 xpath=//*[@class="button__text" and text()="Lisää tutkinto"]
    Location Should Be            ${url}degrees
    Search And Select New Degree  ${degree}  ${searchterm}

    Page Should Contain           ${degree}
    Page Should Contain Element   xpath=//*[@class="button__text" and text()="Tallenna ja jatka"]
    Click Element                 xpath=//*[@class="button__text" and text()="Tallenna ja jatka"]

    Select Parts Of Degree        ${degree}
    Location Should Contain       edit-units
    Page Should Contain Element   xpath=//*[@class="button__text" and text()="Seuraava"]
    Click Element                 xpath=//*[@class="button__text" and text()="Seuraava"]

    Location Should Contain       units/tasks
    Add Degree Partname And Tasks
    Page Should Contain Element   xpath=//*[@class="button__text" and text()="Seuraava"]
    Click Element                 xpath=//*[@class="button__text" and text()="Seuraava"]

    Location Should Contain       summary
    Scroll Element Into View      xpath=//*[@class="button__text" and text()="Tallenna tiedot"]
    Page Should Contain Element   xpath=//*[@class="button__text" and text()="Tallenna tiedot"]
    Click Element                 xpath=//*[@class="button__text" and text()="Tallenna tiedot"]
    Wait Until Page Contains      Tiedot tallennettu!   5
    Press Keys                    None  '\ue00c'
    Wait Until Location Is        ${url}degrees/add   5

    Input Text                    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[1]/input   ${searchterm}
    Wait Until Page Contains      ${degree}  5


Select Parts Of Degree
    [Arguments]    ${degree}
    ${checkbox_class}               Set Variable   selectUnit__container--units-unit-checkbox
    Location Should Contain         units

    ${checkboxes}=                  Get WebElements    xpath://div[contains(@class, '${checkbox_class}')]
    FOR                             ${checkbox}    IN    @{checkboxes}
        Click Element               ${checkbox}
    END

    Page Should Contain           ${degree}
    Page Should Contain Element   xpath=//*[@class="button__text" and text()="Seuraava"]
    Click Element                 xpath=//*[@class="button__text" and text()="Seuraava"]


Get WorkerId
    [Arguments]  ${firstname}  ${lastname}
    Go To FrontPage           teacher
    ${fullname}=              Evaluate   '${firstname}${SPACE}${lastname}'
    Wait Until Page Contains  ${fullname}  5

    Page Should Contain Element    xpath=//*[contains(@class, "customerList__element")]//*[text()="${firstname}" and text()="${lastname}"]
    Click Element                  xpath=//*[contains(@class, "customerList__element")]//*[text()="${firstname}" and text()="${lastname}"]

    Location Should Contain   ${url}unit-list
    ${current_url}=           Get Location
    ${id}=                    Evaluate    "${current_url}".split("/")[-1]
    Return From Keyword       ${id}


Get DegreeId
    [Arguments]  ${degreename}  ${searchterm}
    Go To Degreespage
    Search And Select Degree  ${degreename}  ${searchterm}
    ${current_url}=           Get Location
    ${id}=                    Evaluate    "${current_url}".split("/")[-1]
    Return From Keyword       ${id}


Get JobId
    [Arguments]  ${companyname}  ${searchterm}
    Go To Jobpage
    Search And Select Job    ${companyname}  ${searchterm}

    ${current_url}=          Get Location
    ${id}=                   Evaluate    "${current_url}".split("/")[-1]
    Return From Keyword      ${id}


Search And Select Job
    [Arguments]  ${companyname}  ${searchterm}
    Location Should Be             ${url}add/companyname
    ${classname}=                  Set Variable  addDegree__container--list
    ${xpath}=                      Set Variable  //*[contains(@class,"${classname}")]//div//p[text()="${companyname}"]

    Wait Until Element Is Visible  xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[1]/input  5
    Input Text                     xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[1]/input  ${searchterm}
    Page Should Contain            ${companyname}
    Click Element                  xpath=${xpath}

    Wait Until Location Is Not     ${url}add/companyname  5


Modify Degreename With Save
    [Tags]  valid  modify  navigate
    [Arguments]  ${new_degreename}
    Wait Until Element Is Visible   xpath=//*[@id="root"]/div/div/div[2]/main/section/div[1]/h1/span/div  5
    Click Element                   xpath=//*[@id="root"]/div/div/div[2]/main/section/div[1]/h1/span/div
    Wait Until Element Is Visible   xpath=//*[@id="outlined-multiline-static"]  5
    Click Element                   xpath=//*[@id="outlined-multiline-static"]
    Press Keys                      xpath=//*[@id="outlined-multiline-static"]  COMMAND+a   BACKSPACE
    Input Text                      xpath=//*[@id="outlined-multiline-static"]  ${new_degreename}

    Click Element                   xpath=//div[@class="button__text" and text()="Tallenna"]
    Page Should Contain             Tiedot tallennettu
    Click Button                    xpath=//*[@id="customized-dialog-title"]/button


Modify Degreename Without Save
    [Arguments]  ${degree}  ${new_degreename}
    Wait Until Element Is Visible   xpath=//*[@id="root"]/div/div/div[2]/main/section/div[1]/h1/span/div  5
    Click Element                   xpath=//*[@id="root"]/div/div/div[2]/main/section/div[1]/h1/span/div
    Wait Until Element Is Visible   xpath=//*[@id="outlined-multiline-static"]  5
    Click Element                   xpath=//*[@id="outlined-multiline-static"]
    Press Keys                      xpath=//*[@id="outlined-multiline-static"]  COMMAND+a   BACKSPACE
    Input Text                      xpath=//*[@id="outlined-multiline-static"]  ${new_degreename}
    Click Button                    xpath=/html/body/div[2]/div[3]/div/div/div/button

    # validate that the information is not updated
    Page Should Not Contain         ${new_degreename}
    Page Should Contain             ${degree}
    Reload Page
    Page Should Not Contain         ${new_degreename}
    Page Should Contain             ${degree}


Modify Degreename
    [Arguments]  ${degree}  ${new_degreename}  ${searchterm}
    Modify Degreename With Save     ${new_degreename}

    # Validate the modification
    Go To Degreespage
    Search And Select Degree        ${new_degreename}  ${searchterm}

    # Change back to original degree
    Modify Degreename With Save     ${degree}
    Go To Degreespage
    Search And Select Degree        ${degree}  ${searchterm}

    Modify Degreename Without Save  ${degree}  ${new_degreename}


Delete Degreepart Cancel
    [Arguments]  ${partname}  ${xpath}  ${button_xpath}

    Page Should Contain            ${partname}
    # element with partname
    Wait Until Element Is Visible  ${xpath}  5
    Wait Until Element Is Visible  ${button_xpath}  5
    Click Element                  ${button_xpath}

    # delete modal
    Page Should Contain Element    xpath=//*[contains(@class, "button__container")]//*[contains(@class, "button__text") and text()="Peruuta"]
    Page Should Contain Element    xpath=//*[contains(@class, "button__container")]//*[contains(@class, "button__text") and text()="Kyllä, arkistoi"]
    Click Element                  xpath=//*[contains(@class, "button__container")]//*[contains(@class, "button__text") and text()="Peruuta"]
    Page Should Contain            ${partname}

    Reload Page
    Page Should Contain            ${partname}
    Wait Until Element Is Visible  ${xpath}  5
    Wait Until Element Is Visible  ${button_xpath}  5
    Click Element                  ${button_xpath}
    Page Should Contain Element    xpath=//*[contains(@class, "button__container")]//*[contains(@class, "button__text") and text()="Peruuta"]
    Page Should Contain Element    xpath=//*[contains(@class, "button__container")]//*[contains(@class, "button__text") and text()="Kyllä, arkistoi"]

    # x button
    Page Should Contain Button     xpath=//*[@id="customized-dialog-title"]/button
    Click Button                   xpath=//*[@id="customized-dialog-title"]/button
    Page Should Contain            ${partname}

    Reload Page
    Page Should Contain            ${partname}


Delete Degreepart Confirm
    [Arguments]  ${partname}  ${xpath}  ${button_xpath}

    Page Should Contain            ${partname}
    # element with partname
    Wait Until Element Is Visible  ${xpath}  5
    Wait Until Element Is Visible  ${button_xpath}  5
    Click Element                  ${button_xpath}

    # delete modal
    Page Should Contain Element    xpath=//*[contains(@class, "button__container")]//*[contains(@class, "button__text") and text()="Peruuta"]
    Page Should Contain Element    xpath=//*[contains(@class, "button__container")]//*[contains(@class, "button__text") and text()="Kyllä, arkistoi"]
    Click Element                  xpath=//*[contains(@class, "button__container")]//*[contains(@class, "button__text") and text()="Kyllä, arkistoi"]

    Page Should Not Contain        ${partname}
    Reload Page
    Page Should Not Contain        ${partname}


Modify Degree Partname Cancel
    [Arguments]  ${partname}  ${new_partname}  ${xpath}  ${button_xpath}
    Page Should Contain            ${partname}

    # element with partname
    Wait Until Element Is Visible  ${xpath}  5
    Wait Until Element Is Visible  ${button_xpath}  5
    Click Element                  ${button_xpath}

    # modify modal
    Wait Until Element Is Visible  xpath=//*[@id="outlined-multiline-static"]  5
    Click Element                  xpath=//*[@id="outlined-multiline-static"]
    Press Keys                     xpath=//*[@id="outlined-multiline-static"]  COMMAND+a   BACKSPACE
    Input Text                     xpath=//*[@id="outlined-multiline-static"]  ${new_partname}

    # cancel button
    Page Should Contain Button     xpath=/html/body/div[2]/div[3]/div/div/div/button
    Click Button                   xpath=/html/body/div[2]/div[3]/div/div/div/button

    # validate that the modification is not permanent
    Page Should Not Contain        ${new_partname}
    Page Should Contain            ${partname}
    Reload Page
    Page Should Not Contain        ${new_partname}
    Page Should Contain            ${partname}


Modify Degree Partname Confirm
    [Arguments]  ${partname}  ${new_partname}  ${xpath}  ${button_xpath}
    Page Should Contain            ${partname}

    # element with partname
    Wait Until Element Is Visible  ${xpath}  5
    Wait Until Element Is Visible  ${button_xpath}  5
    Click Element                  ${button_xpath}

    # modify modal
    Wait Until Element Is Visible  xpath=//*[@id="outlined-multiline-static"]  5
    Click Element                  xpath=//*[@id="outlined-multiline-static"]
    Press Keys                     xpath=//*[@id="outlined-multiline-static"]  COMMAND+a   BACKSPACE
    Input Text                     xpath=//*[@id="outlined-multiline-static"]  ${new_partname}

    # confirm button
    Page Should Contain Element    xpath=//*[contains(@class, "button__container")]//*[contains(@class, "button__text") and text()="Tallenna"]
    Click Element                  xpath=//*[contains(@class, "button__container")]//*[contains(@class, "button__text") and text()="Tallenna"]

    # popup and x button
    Page Should Contain            Tiedot tallennettu
    Page Should Contain Element    xpath=//*[@id="customized-dialog-title"]/button
    Click Element                  xpath=//*[@id="customized-dialog-title"]/button

    # validate changes
    Page Should Contain            ${new_partname}
    Page Should Not Contain        ${partname}
    Reload Page
    Page Should Contain            ${new_partname}
    Page Should Not Contain        ${partname}


# UNFINISHED
Modify Degree Info Cancel
    [Arguments]  ${xpath}
    ${test_journalnumber}=       Set Variable  TES-1234-2019

    ${test_order_date}=       Set Variable  1998-12-12T22:00:00.000Z
    ${test_passage_date}=     Set Variable  2023-07-31T21:00:00.000Z

    # modification modal
    Click Element  ${xpath}
    Page Should Contain       Tutkinnon tietojen muokkaus

    ${original_journalnumber}=   Get Value     xpath=//*[@id="outlined-multiline-static"]

    Click Element                xpath=//*[@id="outlined-multiline-static"]
    Press Keys                   xpath=//*[@id="outlined-multiline-static"]  COMMAND+a   BACKSPACE
    Input Text                   xpath=//*[@id="outlined-multiline-static"]  ${test_journalnumber}

    #save button
    # /html/body/div[2]/div[3]/div/div/div/div/div/button
    Page Should Not Contain      Tutkinnon tietojen muokkaus


# UNFINISHED
Modify Degreeparts
    [Arguments]  ${partname}  ${new_partname}
    ${boxclass}=                   Set Variable  _box_124y2_36
    ${containerclass}=             Set Variable  _unitContainer_124y2_59
    ${innerclass}=                 Set Variable  _unitNameIconsContainer_124y2_72
    ${buttonclass}=                Set Variable  _circleWrapIcon_124y2_89
    ${xpath}                       Set Variable  //div[contains(@class,"${boxclass}")]/div[contains(@class,"${containerclass}")]/div[contains(@class,"${innerclass}")]/strong[text()="${partname}"]
    ${button_xpath}                Set Variable  ${xpath}/following-sibling::div[contains(@class,"${buttonclass}")]

    ${infobutton_xpath}            Set Variable  //*/ul[contains(@class,"${boxclass}")]/div[contains(@class,"${innerclass}")]/div[contains(@class,"${buttonclass}")]

    Modify Degree Partname Cancel   ${partname}  ${new_partname}  ${xpath}  ${button_xpath}/span
    Modify Degree Partname Confirm  ${partname}  ${new_partname}  ${xpath}  ${button_xpath}/span
    # change back to original partname
    Modify Degree Partname Confirm  ${new_partname}  ${partname}  ${xpath}  ${button_xpath}/span

    Delete Degreepart Cancel      ${partname}  ${xpath}  ${button_xpath}
    Delete Degreepart Confirm     ${partname}  ${xpath}  ${button_xpath}

    Modify Degree Info Cancel  ${infobutton_xpath}


# UNFINISHED
Modify Degree Information
    [Tags]  modify  valid  navigate
    [Arguments]  ${degree}  ${new_degreename}  ${searchterm}  ${partname}  ${new_partname}
    Go To Degreespage
    Search And Select Degree  ${degree}  ${searchterm}
    # Modify Degreename         ${degree}  ${new_degreename}  ${searchterm}
    # Modify Degreeparts        ${partname}  ${new_partname}


Add Workplace And Supervisor
    ${modal_button}=                   Set Variable   add-supervisor-modal__footer__button
    ${searchterm}=                     Set Variable   kone
    ${degree}=                         Set Variable   Kone- ja tuotantotekniikan perustutkinto
    ${container}=                      Set Variable   searchPage__container--list
    ${list}=                           Set Variable   company__searchPage__container--list-item
    ${xpath}=                          Set Variable   //*[@class="${container}"]/div[@class="${list}"]/h3[text()="${degree}"]
    ${unit_name}=                      Set Variable   Testiunit
    ${unit_description}=               Set Variable   Random description

    Go To Jobpage
    Wait Until Element Is Visible      xpath=//div[@class="button__text" and text()="Lisää yksikkö"]  5
    Click Element                      xpath=//div[@class="button__text" and text()="Lisää yksikkö"]
    Location Should Contain            company-info
    Input Text                         id=department-name-input           ${unit_name}
    Input Text                         id=department-description-input    ${unit_description}

    Scroll Element Into View           xpath=//div[@class="button__text" and text()="Lisää uusi ohjaaja"]
    Click Element                      xpath=//div[@class="button__text" and text()="Lisää uusi ohjaaja"]
    Input Text                         id=firstName           ${test_supervisor_firstname}
    Input Text                         id=lastName            ${test_supervisor_lastname}
    Input Text                         id=email               ${test_supervisor_email}
    Page Should Contain Element        xpath=//*[@class="${modal_button}" and text()="Lisää ohjaaja"]
    Click Element                      xpath=//*[@class="${modal_button}" and text()="Lisää ohjaaja"]

    Scroll Element Into View           xpath=//div[@class="button__text" and text()="Seuraava"]
    Click Element                      xpath=//div[@class="button__text" and text()="Seuraava"]

    Location Should Contain           degrees
    Input Text                        xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[2]/input   ${searchterm}
    Wait Until Page Contains          ${degree}    5

    Page Should Contain Element       xpath=${xpath}
    Click Element                     xpath=${xpath}

    Location Should Contain           units
    Select Parts Of Degree            ${degree}
    Location Should Contain           confirm-selection
    Scroll Element Into View          xpath=//div[@class="button__text" and text()="Vahvista"]
    Click Element                     xpath=//div[@class="button__text" and text()="Vahvista"]
    Wait Until Page Contains          Uusi yksikkö lisätty    5
    Press Keys                        None  '\ue00c'
    Wait Until Page Contains          ${unit_name}   5
    Location Should Contain           companyname


Add Customerinfo
    Location Should Be               ${url}evaluation-form

    # customerinfo
    Wait Until Element Is Visible    xpath=//*[@id="firstName"]  5
    Input Text                       xpath=//*[@id="firstName"]  ${test_customer_firstname}
    Wait Until Element Is Visible    xpath=//*[@id="lastName"]  5
    Input Text                       xpath=//*[@id="lastName"]  ${test_customer_lastname}
    Wait Until Element Is Visible    xpath=//*[@id="email"]  5
    Input Text                       xpath=//*[@id="email"]  ${test_customer_email}

    # startdate
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/form/div[4]/div[1]/div/div/button  5
    Click Element                    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/form/div[4]/div[1]/div/div/button
    Click Element                    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[2]/button[2]

    #enddate
    Wait Until Element Is Visible    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/form/div[4]/div[2]/div/div/button  5
    Click Element                    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/form/div[4]/div[2]/div/div/button
    Click Element                    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[2]/button[2]
    Click Element                    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]

    #input fields
    Wait Until Element Is Visible    xpath=//*[@id="workTasks"]  5
    Input Text                       xpath=//*[@id="workTasks"]  ${job_description}
    Wait Until Element Is Visible    xpath=//*[@id="workGoals"]  5
    Input Text                       xpath=//*[@id="workGoals"]  ${personal_goals}

    Scroll Element Into View         xpath=//div[@class="button__text" and text()="Seuraava"]
    Click Element                    xpath=//div[@class="button__text" and text()="Seuraava"]
    Wait Until Location Is Not       ${url}evaluation-form  5


Select Workplace and Supervisor
    [Arguments]              ${unit_name}
    Location Should Be       ${url}evaluation-workplace

    Wait Until Element Is Visible   xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[2]/input  5
    Input Text                      xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[2]/input  ${unit_name}
    Page Should Contain             ${unit_name}

    Click Element                   xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/div/div[1]/div[1]/label/span[1]/input
    Click Element                   xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/div/div[2]/div/div/div/div/div/div[1]
    Click Element                   xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/div/div[2]/div/div/div/div/div/div[2]/div/div/div/div/div

    Click Element                    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/div/div[2]/div/div/div/div/div[2]/div[1]/div[2]
    Click Element                    xpath=//*[@id="root"]/div/div/div[2]/main/div/section/div[3]/div/div[2]/div/div/div/div/div[2]/div[2]/div/div/div/div/div

    Wait Until Element Is Visible    xpath=//div[@class="button__text" and text()="Seuraava"]  5
    Click Element                    xpath=//div[@class="button__text" and text()="Seuraava"]

    Wait Until Location Is Not       ${url}evaluation-workplace  5


Select Workplace Parts
    ${checkbox_class}           Set Variable   selectUnit__container--units-unit-checkbox

    Location Should Be          ${url}evaluation-units

    ${checkboxes}=                  Get WebElements    xpath://div[contains(@class, '${checkbox_class}')]
    FOR                             ${checkbox}    IN    @{checkboxes}
        Click Element               ${checkbox}
    END

    Wait Until Element Is Visible    xpath=//div[@class="button__text" and text()="Seuraava"]  5
    Click Element                    xpath=//div[@class="button__text" and text()="Seuraava"]
    Wait Until Location Is Not       ${url}evaluation-units


Add Admin (new)
    Go To Registerationpage
    Input Text                         id:firstName    ${admin_firstname}
    Input Text                         id:lastName     ${admin_pw}
    Input Text                         id:email        ${admin_user}

    Click Element                      xpath=//input[@name="permissions" and @value="user"]
    Click Element                      xpath=//input[@name="permissions" and @value="admin"]

    Page Should Contain Element        xpath=//*[@class="button__text" and text()="Lisää opettaja"]
    Click Element                      xpath=//*[@class="button__text" and text()="Lisää opettaja"]

    Wait Until Page Contains           Tiedot tallennettu   5
    Press Keys                         None  '\ue00c'


Add Teacher As Admin
    [Arguments]    ${degree}
    Go To Teacherspage
    Wait Until Page Contains Element   xpath=//*[@class="button__text" and text()="Lisää uusi opettaja"]  5
    Click Element                      xpath=//*[@class="button__text" and text()="Lisää uusi opettaja"]
    Input Text                         id:firstName    ${test_teacher_firstname}
    Input Text                         id:lastName     ${test_teacher_lastname}
    Input Text                         id:email        ${test_teacher_email}

    Click Element                      xpath=//input[@name="permissions" and @value="user"]
    Click Element                      xpath=//input[@name="permissions" and @value="admin"]

    Click Element                      xpath=//*[@id="root"]/div/div/div[2]/main/div/form/div[3]/div/div/div/div/button
    Page Should Contain                ${degree}
    Press Keys                         None  DOWN
    Press Keys                         None  ENTER
    Page Should Contain                ${degree}

    Page Should Contain Element        xpath=//*[@class="button__text" and text()="Lisää opettaja"]
    Click Element                      xpath=//*[@class="button__text" and text()="Lisää opettaja"]

    Wait Until Page Contains           Tiedot tallennettu   5
    Press Keys                         None  '\ue00c'


Add Customer
    ${unit_name}=                      Set Variable   Testiunit
    Go To Contractpage
    Add Customerinfo
    Select Workplace and Supervisor    ${unit_name}
    Select Workplace Parts
    Location Should Be               ${url}evaluation-summary
    Scroll Element Into View         xpath=//div[@class="button__text" and text()="Lähetä kutsut"]
    Click Element                    xpath=//div[@class="button__text" and text()="Lähetä kutsut"]
    Page Should Contain              Kutsut lähetetty!
    Page Should Contain              Sopimukseen liitetyille henkilöille on lähetetty kirjautumiskutsut.
    # close popup with ESC
    Press Keys                       None  '\ue00c'


Select Userperformance
    [Arguments]  ${taskname}  ${status}

    ${classname}=              Set Variable  unitstatus-wrapper
    ${xpath}=                  Set Variable    //div[contains(@class,"${classname}")]/h2[text()="${taskname}"]/preceding::div[contains(@class, "unitstatus")]/h1[text()="${status}"]

    Location Should Contain        ${url}unit-list
    Page Should Contain            ${status}
    Page Should Contain            ${taskname}
    Wait Until Element Is Visible  xpath=${xpath}  5
    Click Element                  xpath=//h2[text()="${taskname}"]
    Wait Until Location Contains   userperformance  5
    Page Should Contain            Ammattitaitovaatimusten arviointi


Select Random Radio Buttons In Review
    [Arguments]   ${group_name}
    @{radio_values}=       Create List      Osaa ohjatusti    Osaa itsenäisesti
    ${radio_locator}=      Set Variable     //input[@type='radio'][@name='${group_name}']
    ${all_radios}=         Get WebElements  xpath=${radio_locator}
    ${counter}=            Set Variable     0
    ${choice}=             Set Variable     $null

    FOR   ${radio}   IN   @{all_radios}
        ${counter}=          Evaluate  ${counter} + 1

        IF  ${counter} % 2 == 1
            # seed the random.choice every other iteration
            ${current_time}=     Evaluate   time.time()  time
            Evaluate             random.seed(${current_time})  random
            ${choice}=           Evaluate   random.choice(@{radio_values})  random
        END

        ${label}=    Get Element Attribute    ${radio}    value
        IF    '${label}' == '${choice}'
            Click Element    ${radio}
        END

        # random time to sleep
        ${sleep_time}=     Evaluate  random.uniform(0.2, 0.9)  random
        Log          ${sleep_time}
        Sleep  ${sleep_time}
    END


Cancel Degree Review
    Page Should Contain Element            xpath=//button//div[text()="Takaisin"]
    Scroll Element Into View               xpath=//button//div[text()="Takaisin"]
    Click Element                          xpath=//button//div[text()="Takaisin"]
    Wait Until Location Does Not Contain   userperformance  5


Validate Empty Radio Buttons In Degree
    [Arguments]    ${group_name}
    ${radio_locator}=      Set Variable     //input[@type='radio'][@name='${group_name}']
    ${all_radios}=         Get WebElements  xpath=${radio_locator}

    Radio Button Should Not Be Selected     ${group_name}

    # svg when selected-radiobutton
    Page Should Not Contain Element         xpath=//*[@class="css-hyxlzm"]//*[contains(@class, "css-11zohuh-MuiSvgIcon-root")]

    # svg when unselected-radiobutton
    Page Should Contain Element             xpath=//*[@class="css-hyxlzm"]//*[contains(@class, "MuiSvgIcon-root") and contains(@class, "css-1hhw7if-MuiSvgIcon-root")]


Validate Filled Review
    [Arguments]  ${taskname}  ${status}

    Select Userperformance    ${taskname}  ${status}

    # svg when selected-radiobutton, should contain atleast 1
    Page Should Contain Element             xpath=//*[@class="css-hyxlzm"]//*[contains(@class, "css-11zohuh-MuiSvgIcon-root")]

    Cancel Degree Review


Fill And Save Review As Draft
    [Arguments]  ${taskname}  ${status}  ${status_new}  ${radio_button_groupname}

    Select Userperformance    ${taskname}  ${status}
    Select Random Radio Buttons In Review   ${radio_button_groupname}
    Page Should Contain Element     xpath=//div[@class="button__text" and text()="Tallenna luonnos"]
    Click Element                   xpath=//div[@class="button__text" and text()="Tallenna luonnos"]

    Wait Until Page Contains       Luonnos on tallennettu  5
    Wait Until Page Contains       Jos pyysit yhteydenottoa, pyyntö on välitetty ohjaajalle ja/tai opettajalle.  5
    # close popup with ESC
    Press Keys                             None  '\ue00c'
    Wait Until Location Does Not Contain   userperformance  5

    Validate Filled Review    ${taskname}  ${status_new}
    # color validation ?


Send Review
    [Arguments]   ${message}  ${sendbox_text}
    ${group_name}=         Set Variable     valmisLahetettavaksi
    ${assist_name}=        Set Variable     pyydetaanYhteydenottoaOpettajalta

    Page Should Contain Checkbox         xpath=//input[@type='checkbox'][@name='${group_name}']
    Page Should Contain Checkbox         xpath=//input[@type='checkbox'][@name='${assist_name}']
    Page Should Contain                  Ammattitaitovaatimusten arviointi

    Select Checkbox                      xpath=//input[@type='checkbox'][@name='${group_name}']
    Page Should Contain                  ${sendbox_text}
    Input Text           xpath=//*[@id="root"]/div/div/div[2]/main/div/div[2]/div[2]/form/textarea  ${message}

    Page Should Contain Element     xpath=//div[@class="button__text" and text()="Tallenna ja lähetä"]
    Scroll Element Into View        xpath=//div[@class="button__text" and text()="Tallenna ja lähetä"]
    Click Element                   xpath=//div[@class="button__text" and text()="Tallenna ja lähetä"]

    Wait Until Page Contains        Tiedot tallennettu   5
    Wait Until Page Contains        Tiedot on tallennettu järjestelmään onnistuneesti.   5
    Press Keys                      None   '\ue00c'
    Wait Until Location Does Not Contain    userperformance  5


Fill And Send Degree As Customer
    [Arguments]  ${taskname}  ${status}

    Select Userperformance   ${taskname}  ${status}
    Select Random Radio Buttons In Review   Itsearviointi
    Send Review              ${customer_msg}  Lisätietoa


Validate Review Statuses
    [Arguments]  ${task1}  ${stat1}  ${task2}  ${stat2}  ${task3}  ${stat3}  ${task4}  ${stat4}

    # loop through tasks and statuses, could use lengthof(tasks) instead
    FOR   ${i}   IN RANGE   1    5
        ${task}=       Set Variable    ${task${i}}
        ${status}=     Set Variable    ${stat${i}}
        ${xpath}=      Set Variable    //div[contains(@class,"unitstatus-wrapper")][h2[text()="${task}"]]/div[contains(@class, "unitstatus")]/h1[text()="${status}"]

        Page Should Contain           ${task}
        Page Should Contain           ${status}
        Element Should Be Visible     xpath=${xpath}
    END


Review Degree As Customer
    Fill And Cancel Review                     ${task_1}  ${status_notstarted}  Itsearviointi
    Validate Review Statuses                   ${task_1}  ${status_notstarted}  ${task_2}  ${status_notstarted}  ${task_3}  ${status_notstarted}  ${task_4}  ${status_notstarted}

    Fill And Save Review As Draft  ${task_1}  ${status_notstarted}  ${status_started}  Itsearviointi
    Validate Review Statuses                   ${task_1}  ${status_started}  ${task_2}  ${status_notstarted}  ${task_3}  ${status_notstarted}  ${task_4}  ${status_notstarted}

    Select Userperformance          ${task_1}  ${status_started}
    Send Review                     ${customer_msg}   Lisätietoa
    Validate Review Statuses                   ${task_1}  ${status_inreview}  ${task_2}  ${status_notstarted}  ${task_3}  ${status_notstarted}  ${task_4}  ${status_notstarted}

    Fill And Send Degree As Customer           ${task_2}  ${status_notstarted}
    Validate Review Statuses                   ${task_1}  ${status_inreview}  ${task_2}  ${status_inreview}  ${task_3}  ${status_notstarted}  ${task_4}  ${status_notstarted}

    Fill And Save Review As Draft  ${task_3}  ${status_notstarted}  ${status_started}  Itsearviointi
    Validate Review Statuses                   ${task_1}  ${status_inreview}  ${task_2}  ${status_inreview}  ${task_3}  ${status_started}  ${task_4}  ${status_notstarted}


Fill And Cancel Review
    [Arguments]  ${task}  ${status}  ${group_name}
    Location Should Contain        unit-list

    Select Userperformance         ${task}  ${status}
    Select Random Radio Buttons In Review   ${group_name}
    Cancel Degree Review
    Select Userperformance         ${task}  ${status}
    Validate Empty Radio Buttons In Degree  ${group_name}
    Cancel Degree Review


Fill And Cancel All Reviews
    Fill And Cancel Review         ${task_1}  ${status_inreview}       Ohjaajan havainto
    Fill And Cancel Review         ${task_2}  ${status_inreview}       Ohjaajan havainto
    Fill And Cancel Review         ${task_3}  ${status_notstarted}     Ohjaajan havainto
    Fill And Cancel Review         ${task_4}  ${status_notstarted}     Ohjaajan havainto


Fill And Save Reviews As Supervisor
    Fill And Save Review As Draft   ${task_1}  ${status_inreview}    ${status_inreview}   Ohjaajan havainto
    Fill And Save Review As Draft   ${task_4}  ${status_notstarted}  ${status_started}    Ohjaajan havainto


Send Reviews As Supervisor
    Select Customer

    # send task_1
    Select Userperformance   ${task_1}  ${status_inreview}
    Send Review              ${supervisor_msg}   Arvioinnin yhteenveto

    # send task_3
    Select Userperformance   ${task_3}  ${status_notstarted}
    Select Random Radio Buttons In Review    Ohjaajan havainto
    Send Review              ${supervisor_msg}   Arvioinnin yhteenveto


Select Customer
    Page Should Contain Element    xpath=//*[contains(@class, "customerList__element")]//*[text()="${test_customer_firstname}" and text()="${test_customer_lastname}"]
    Click Element                  xpath=//*[contains(@class, "customerList__element")]//*[text()="${test_customer_firstname}" and text()="${test_customer_lastname}"]

    Wait Until Location Contains   unit-list
    Page Should Contain            ${test_customer_firstname}${SPACE}${test_customer_lastname}
    Page Should Contain            Suoritukset


Validate Reviews As All Users After Supervisor
    # as supervisor
    Validate Review Statuses    ${task_1}  ${status_inreview}  ${task_2}  ${status_inreview}  ${task_3}  ${status_inreview}  ${task_4}  ${status_started}
    Logout User

    # as customer
    Login User  ${test_customer_email}  ${test_customer_pw}  ${test_customer_firstname}  customer
    Validate Review Statuses       ${task_1}  ${status_inreview}  ${task_2}  ${status_inreview}  ${task_3}  ${status_inreview}  ${task_4}  ${status_notstarted}
    Logout User

    # as teacher
    Login User     ${test_teacher_email}  ${test_teacher_pw}  ${test_teacher_firstname}  teacher
    Select Customer
    Validate Review Statuses       ${task_1}  ${status_inreview}  ${task_2}  ${status_inreview}  ${task_3}  ${status_inreview}  ${task_4}  ${status_notstarted}


Review Degree As Supervisor
    Location Should Be            ${url}

    Select Customer
    Validate Review Statuses      ${task_1}  ${status_inreview}  ${task_2}  ${status_inreview}  ${task_3}  ${status_notstarted}  ${task_4}  ${status_notstarted}

    Fill And Cancel All Reviews
    Validate Review Statuses      ${task_1}  ${status_inreview}  ${task_2}  ${status_inreview}  ${task_3}  ${status_notstarted}  ${task_4}  ${status_notstarted}

    Fill And Save Reviews As Supervisor
    Validate Review Statuses      ${task_1}  ${status_inreview}  ${task_2}  ${status_inreview}  ${task_3}  ${status_notstarted}  ${task_4}  ${status_started}

    # validate statuses as customer
    Logout User
    Login User  ${test_customer_email}  ${test_customer_pw}  ${test_customer_firstname}  customer
    Validate Review Statuses     ${task_1}  ${status_inreview}  ${task_2}  ${status_inreview}  ${task_3}  ${status_started}  ${task_4}  ${status_notstarted}
    Logout User

    Login User  ${test_supervisor_email}  ${test_supervisor_pw}  ${test_supervisor_firstname}  supervisor
    Send Reviews As Supervisor

    Validate Reviews As All Users After Supervisor


# UNFINISHED
Validate Filled Radio Buttons
    [Arguments]         ${group_name}   ${status}  #  group_name == Ohjaajan havainto  OR  Itsearviointi
    ${option_1}=        Set Variable     Osaa itsenäisesti
    ${option_2}=        Set Variable     Osaa ohjatusti

    # click element     xpath=//div[@class="first-div-style"][p[text()="${group_name}"]]/div

    # checked radio
    # class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1hbvpl3-MuiSvgIcon-root"
    # unchecked radio
    # MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1hbvpl3-MuiSvgIcon-root

    # example
    # click element   //div[contains(@class,"unitstatus-wrapper")][h2[text()="${task_1}"]]/div[contains(@class, "unitstatus")]/h1[text()="${status_sent}"]
    #


# UNFINISHED
Validate Review As Teacher
    [Arguments]  ${task}  ${task_expected_status}  ${customer_status}  ${supervisor_status}

    Select Userperformance         ${task}   ${task_expected_status}
    Validate Filled Radio Buttons   Itsearviointi        #   Ohjaajan havainto     OR      Itsearviointi
    Validate Filled Radio Buttons   Ohjaajan havainto    #   Ohjaajan havainto     OR      Itsearviointi


Fill Reviews As Teacher
    Select Userperformance  ${task_1}  ${status_inreview}
    Select Random Radio Buttons In Review   Opettajan merkintä

# UNFINISHED
Review Degree As Teacher
    Select Customer
    Validate Review Statuses     ${task_1}  ${status_inreview}  ${task_2}  ${status_inreview}  ${task_3}  ${status_inreview}  ${task_4}  ${status_notstarted}

    # Validate Review As Teacher   ${task_1}  ${status_inreview}   ???    ???

    Fill Reviews As Teacher


# UNFINISHED
Validate Notification Amount As Supervisor
    [Arguments]  ${expected_value}

    ${notification_xpath}=         Set Variable  //span[@class="numberstyle" and text()="${expected_value}"]
    ${notification_supervisor}=    Set Variable  //span[contains(@class="supervisor")]

    Location Should Be             ${url}
    Page Should Contain            uutta ilmoitusta
    Page Should Contain Element    xpath=${notification_xpath}
    Click Element                  xpath=${notification_xpath}

    #  !classes are different for supervisor, these are for teacher
    IF    ${expected_value} == 0
        Page Should Not Contain         xpath=//*[contains(@class, "customerList__element")]//*[text()="${test_customer_firstname}" and text()="${test_customer_lastname}"]
    ELSE
        Page Should Contain Element     xpath=//*[contains(@class, "customerList__element")]//*[text()="${test_customer_firstname}" and text()="${test_customer_lastname}"]
        Page Should Contain             uusi
    END


# INCOMPLETE, validate as teacher and supervisor
Validate Customer Contract
    ${classname}=       Set Variable   infoList__container

    # navigate into the customer, select the contract
    Select Customer
    Page Should Contain         xpath=//*[@class="button__text" and text()="Tarkastele sopimusta"]
    Click Element               xpath=//*[@class="button__text" and text()="Tarkastele sopimusta"]
    Wait Until Location Does Not Contain   unit-list  5
    Page Should Contain         Sopimus
    Page Should Contain         Sopimuksen yhteenveto

    Location Should Contain     contract-info

    Page Should Contain Element       xpath=/div[@class="${classname}"]/ul/li[h4(text()="Asiakkaan nimi")][div(text()="${test_customer_firstname}" and text()="${test_customer_lastname}")]
    Page Should Contain Element       xpath=/div[@class="${classname}"]/ul/li[h4(text()="Asiakkaan sähköposti")][div(text()="${test_customer_email}")]
    Page Should Contain Element       xpath=/div[@class="${classname}"]/ul/li[h4(text()="Opettajan nimi")][div(text()="${test_teacher_firstname}" and text()="${test_teacher_lastname}")]
    Page Should Contain Element       xpath=/div[@class="${classname}"]/ul/li[h4(text()="Opettajan sähköposti")][div(text()="${test_teacher_email}")]
    Page Should Contain Element       xpath=/div[@class="${classname}"]/ul/li[h4(text()="Työpaikka ja yksikkö")][div[contains(text()="Nahkapaja Oy")]]
    Page Should Contain Element       xpath=/div[@class="${classname}"]/ul/li[h4(text()="Ohjaaja")][div(text()="${test_supervisor_firstname}" and text()="${test_supervisor_lastname}")]
    Page Should Contain Element       xpath=/div[@class="${classname}"]/ul/li[h4(text()="Ohjaajan sähköposti")][div(text()="${test_supervisor_email}")]
    Page Should Contain Element       xpath=/div[@class="${classname}"]/ul/li[h4(text()="Työtehtävät")][div(text()="${job_description}")]
    Page Should Contain Element       xpath=/div[@class="${classname}"]/ul/li[h4(text()="Omat tavoitteet")][div(text()="${personal_goals}")]

    # add validation that degree-info is present and correct

    Page Should Contain Element            xpath=//div/a/p[text()="Takaisin"]
    Scroll Element Into View               xpath=//div/a/p[text()="Takaisin"]
    Click Element                          xpath=//div/a/p[text()="Takaisin"]
    Wait Until Location Does Not Contain   contract-info  5


# used in testing to get the default password
Brute Defaultpasswords
    [Arguments]     ${brute_email}
    FOR    ${i}    IN RANGE    0    len(${brute_pws})

        Location Should Be          ${url}login
        Input Text                  id:email     ${brute_email}
        Input Password              id:password  ${brute_pws[${i}]}
        Click Element               xpath=//div[@class="button__text" and text()="Kirjaudu sisään"]
        sleep  1
        ${current_url}=       Get Location

        IF    '${current_url}' != '${url}login'
            Log    LOGIN SUCCESS!
            Log    '${brute_pws[${i}]}'
            Return From Keyword
        END
    END
