*** Variables ***
${url-local}            http://localhost:5173/
${url-dev}              https://saukko-dev-app-cf2pynvwyijf4.azurewebsites.net/
${url-prod}             https://saukko-prod-app-pppoz4ij7jaqc.azurewebsites.net/

# register reacher url
# http://localhost:5173/register-user

# change this according to environment above
${url}=                 ${url-local}

${browser}              chrome
${time}                 2

${hamburger-menu}       _buttonContainer_1ndim_25c
${job_description}      Puskea koodia satalasissa.
${personal_goals}       Kirjoittaa kultaista koodia.
${customer_msg}         Homma valmis, tuon maanantaina omenan.
${supervisor_msg}       Mahtihomma. Kaikki ok.


@{r_words}              Kirja  Auto  Kissa  Pallo  Nahka  Talo  Juna  Lasi  Kello  Hanska  Kivi  Veto  Maito  Koru  Vesi  Aasi
@{r_locations}          Varasto  Toimisto  Tehdas  Liike  Hotelli  Rakennus  Koulu  Satama  Klinikka  Museo  Kioski  Talli  Kahvila  Baari  Klubi  Paja
@{r_business}           Oy  Tmi  Ry  OyJ  Saatio  Ay  Ky

${task_1}=              Huolto- ja asennustyötehtävissä toimiminen
${task_2}=              Manuaalikoneistaminen
# ${task_3}=              CNC-työstökoneen käyttäminen
${task_3}=              Manuaalikoneistuskoneiden käyttö valmistustyötehtävissä
${task_4}=              Levytyökoneiden ja hitsauskoneen käyttö valmistustyötehtävissä
${status_notstarted}=   Aloittamatta
${status_started}=      Aloitettu
${status_inreview}=     Käsittelyssä
# RED and YELLOW are both 'inreview'
${status_sent}=         ??
${status_finished}=     ?!?

# teacher
${test_teacher_email}         test_teacher@gmail.com
${test_teacher_pw}            testomies999
${test_teacher_firstname}     Marko
${test_teacher_lastname}      Teachman

# supervisor
${test_supervisor_email}      test_supervisor@gmail.com
${test_supervisor_pw}         testomies999
${test_supervisor_firstname}  Teppo
${test_supervisor_lastname}   Supervisor
${default_sv_pw}              12341234

# customer
${test_customer_email}        test_customer@gmail.com
${test_customer_pw}           testomies999
${test_customer_firstname}    Seppo
${test_customer_lastname}     Opiskelijamies

${email_pw}                  testihomma123
${default_customer_pw}       123456

# admin
${admin_user}                testi2@gmail.com
${admin_pw}                  123321
${admin_firstname}           Testitunnus
${admin_lastname}            Kakkonen


@{brute_pws}                 123123  12341234  123456  123321  12344321  123456123456  123456654321  12345  1234554321