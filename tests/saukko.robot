*** Settings ***
Library         SeleniumLibrary
Library         OperatingSystem
Library         Collections
Library         DateTime
Library         RequestsLibrary
Resource        saukko-keywords.robot
Resource        saukko-variables.robot
Resource        saukko-navigation.robot
Suite Setup     Open Browserwindow
Suite Teardown  Close Browser


*** Test Cases ***
# # registerpage needs atleast 1 user
# Add Adminuser
#     Add Admin (new)


Login Logout (admin)
    Login User   ${admin_user}   ${admin_pw}   ${admin_firstname}   teacher
    Logout User


Add Degree (admin)
    ${degree}=         Set Variable  Kone- ja tuotantotekniikan perustutkinto
    ${searchterm}=     Set Variable  kone
    Login User   ${admin_user}   ${admin_pw}   ${admin_firstname}   teacher
    Add Degree   ${degree}   ${searchterm}
    Logout User


Add Teacher (admin)
    ${degree}=        Set Variable     Kone- ja tuotantotekniikan perustutkinto
    Login User   ${admin_user}   ${admin_pw}   ${admin_firstname}   teacher
    Add Teacher As Admin     ${degree}
    Logout User
    Login User                         ${test_teacher_email}  ${admin_pw}  ${test_teacher_firstname}  teacher
    Change Password                    ${admin_pw}   ${test_teacher_pw}
    Logout user


Login Logout (teacher)
    Login User  ${test_teacher_email}  ${test_teacher_pw}  ${test_teacher_firstname}  teacher
    Logout User


Change Password (teacher)
    ${temp_pw}=       Set Variable    ${test_teacher_pw}abc123!
    Login User        ${test_teacher_email}  ${test_teacher_pw}  ${test_teacher_firstname}  teacher
    Change Password   ${test_teacher_pw}  ${temp_pw}
    Logout User
    Login User        ${test_teacher_email}  ${temp_pw}  ${test_teacher_firstname}  teacher
    Change Password   ${temp_pw}  ${test_teacher_pw}
    Logout User
    Login User        ${test_teacher_email}  ${test_teacher_pw}  ${test_teacher_firstname}  teacher


Add Workplace And Supervisor (teacher)
    Login User     ${test_teacher_email}  ${test_teacher_pw}  ${test_teacher_firstname}  teacher
    Add Workplace And Supervisor
    Logout User
    Login User  ${test_supervisor_email}  ${default_sv_pw}  ${test_supervisor_firstname}  supervisor
    Change Password      ${default_sv_pw}   ${test_supervisor_pw}
    Logout User


Login Logout (supervisor)
    Login User  ${test_supervisor_email}  ${test_supervisor_pw}  ${test_supervisor_firstname}  supervisor
    Logout User


Change Password (supervisor)
    ${temp_pw}=       Set Variable  ${test_supervisor_pw}abc123!
    Login User        ${test_supervisor_email}  ${test_supervisor_pw}  ${test_supervisor_firstname}  supervisor
    Change Password   ${test_supervisor_pw}  ${temp_pw}
    Logout User
    Login User        ${test_supervisor_email}  ${temp_pw}  ${test_supervisor_firstname}  supervisor
    Change Password   ${temp_pw}  ${test_supervisor_pw}
    Logout User
    Login User        ${test_supervisor_email}  ${test_supervisor_pw}  ${test_supervisor_firstname}  supervisor


Add Customer (teacher)
    ${degree}=                 Set Variable  Kone- ja tuotantotekniikan perustutkinto
    ${searchterm}=             Set Variable  kone
    Login User     ${test_teacher_email}  ${test_teacher_pw}  ${test_teacher_firstname}  teacher
    Add Customer
    Logout User
    # change password from default
    Login User         ${test_customer_email}  ${default_customer_pw}  ${test_customer_firstname}  customer
    Change Password    ${default_customer_pw}  ${test_customer_pw}
    Logout User


Change Password (customer)
    ${temp_pw}=       Set Variable  ${test_customer_pw}abc123!
    Login User         ${test_customer_email}  ${default_customer_pw}  ${test_customer_firstname}  customer
    Login User        ${test_customer_email}  ${test_customer_pw}  ${test_customer_firstname}  customer
    Change Password   ${test_customer_pw}  ${temp_pw}
    Logout User
    Login User        ${test_customer_email}  ${temp_pw}  ${test_customer_firstname}  customer
    Change Password   ${temp_pw}  ${test_customer_pw}
    Logout User
    Login User        ${test_customer_email}  ${test_customer_pw}  ${test_customer_firstname}  customer
    Logout User


Login Logout (customer)
    Login User  ${test_customer_email}  ${test_customer_pw}  ${test_customer_firstname}  customer
    Logout User


Navigation (teacher)
    Go To Loginpage
    Login User     ${test_teacher_email}  ${test_teacher_pw}  ${test_teacher_firstname}  teacher
    Go To Degreespage
    Go To FrontPage   teacher
    Go To Profilepage
    Go To Jobpage
    Go To Contractpage
    Logout User


Navigation (customer)
    Login User        ${test_customer_email}  ${test_customer_pw}  ${test_customer_firstname}  customer
    Go To Profilepage
    Go To FrontPage   customer
    Logout User


Navigation (supervisor)
    Login User  ${test_supervisor_email}  ${test_supervisor_pw}  ${test_supervisor_firstname}  supervisor
    Go To Profilepage
    Go To FrontPage   supervisor
    Logout User


Forgotten Password (all usertypes)
    Forgotten Password Case  ${test_teacher_email}
    Forgotten Password Case  ${test_supervisor_email}
    Forgotten Password Case  ${test_customer_email}


Forgotten Password Invalid Input
    Forgotten Password Invalid Email   testi.com
    Forgotten Password Invalid Email   testi@
    Forgotten Password Invalid Email   testi@test
    Forgotten Password Invalid Email   .yahoo
    Forgotten Password Invalid Email   testi@testi@testi@testi.com


Forgotten Password SQL-injections
    Forgotten Password Invalid Email   1=1';
    Forgotten Password Invalid Email   ' OR 1=1
    Forgotten Password Invalid Email   OR 1=1'
    Forgotten Password Invalid Email   OR 1=1;
    Forgotten Password Invalid Email   OR 1=1';
    Forgotten Password Invalid Email   OR ""=""
    Forgotten Password Invalid Email   ; SELECT *;


# UNFINISHED
# Modify Degree (teacher)
#     ${degree}=                 Set Variable  Kone- ja tuotantotekniikan perustutkinto
#     ${searchterm}=             Set Variable  kone
#     ${new_degreename}=         Set Variable  ${degree}.test
#     Login User                 ${test_teacher_email}  ${test_teacher_pw}  ${test_teacher_firstname}  teacher
#     Modify Degree Information  ${degree}  ${new_degreename}  ${searchterm}    aa    bb


Review Degree (customer)
    Login User  ${test_customer_email}  ${test_customer_pw}  ${test_customer_firstname}  customer
    Review Degree As Customer
    Logout User


Review Degree (supervisor)
    Login User  ${test_supervisor_email}  ${test_supervisor_pw}  ${test_supervisor_firstname}  supervisor
    Review Degree As Supervisor
    Logout User


# UNFINISHED
# Review Degree (teacher)
#     Login User     ${test_teacher_email}  ${test_teacher_pw}  ${test_teacher_firstname}  teacher
#     Review Degree As Teacher
#     Logout User
