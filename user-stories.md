# User Stories and Acceptance Criteria

## Check In

### Participant Check-In

As an event organizer
  I want to check in participants for activities
  So that I can track their attendance

```
  Scenario: Successful participant check-in
    Given there is an activity scheduled
    And there are registered participants
    When a activity is happening 
    And a participant arrives for the activity
    Then the participant should be checked in
    And their attendance should be recorded

  Scenario: Participant check-in with invalid registration
    Given there is an activity scheduled
    And there are registered participants
    When an unregistered participant arrives for the activity
    Then the participant should not be checked in
    And an error message should be displayed

  Scenario: Participant check-in with invalid event
    Given there is an activity scheduled
    And there are registered participants
    When a activity is not happening 
    And a participant arrives for the activity
    Then the participant should not be checked in
    And an error message should be displayed
```

### Attendance Calculation

  As an event organizer
  I want the system to calculate attendance automatically
  So that I can generate attendance reports

```
  Scenario: Calculate attendance for an activity
    Given there is an activity with checked-in participants
    When the activity ends
    Then the system should calculate the attendance for the activity
    And update the attendance records accordingly

  Scenario: Calculate attendance for multiple activities
    Given there are multiple activities with checked-in participants
    When the event ends
    Then the system should calculate the attendance for each activity
    And generate an overall attendance report for the event
```


### Attendance Reporting

  As an event organizer
  I want to generate attendance reports
  So that I can analyze participant attendance patterns

```
  Scenario: Generate attendance report for an activity
    Given there is an activity with calculated attendance
    When I request an attendance report for the activity
    Then the system should generate the attendance report
    And display the report with participant attendance details

  Scenario: Generate overall attendance report for an event
    Given there are multiple activities with calculated attendance
    When I request an overall attendance report for the event
    Then the system should generate the overall attendance report
    And display the report with participant attendance details for each activity
```

###  Activity Registration

As an event organizer
I want to register an activity
So that I can register participants to it and track their attendance

```
  Scenario: Registering a valid activity
    Given there is an activity to be registered
    When I enter with a valid activity in the registration form
    And confirm the registration of the activity
    Then the system should register the activity
    And display a message confirming the activity was added

  Scenario: Registering n invalid activity
    Given there is an activity to be registered
    When I enter with a activity in the registration form with a date/time schedule in the past
    And confirm the registration of the activity
    Then the system should not register the activity
    And display an error message saying the date/time of the activity is invalid
```


###  Activity Deletion

As an event organizer
I want to delete an activity
So that I can remove all its information from the system

```
  Scenario: Deleting an activity
    Given there is a registered activity
    When I select the activity
    And request its deletion
    Then the system should remove the activity
    And display an confirmation the activity was removed
```

###  Member Registration

As an event organizer
I want to register a member
So that I can added them in the activities 

```
```


###  Member Deletion

As an event organizer
I want to remove a member
So that I can remove all its information from the system

```
```

###  Participant Registration

As an event organizer
I want to register a participant in an activity
So that I track its attendance in the activity

```
```

###  Participant Removal

As an event organizer
I want to remove a participant from an activity
So that I cannot track its attendance in the activity

```
```





<!-- ## Login
### Access the application securely

As a user, I want to access the application securely, to protect my information

**Acceptance criteria**

```
Feature: Access

Scenario: Access denied
  Given I am not logged in
  When I navigate to access the application
  Then I see "Access denied"
  And I am unable to my secure information

Scenario: Access permitted
  Given I have logged in
  When I navigate to access the application
  Then I can access my secure information
```

### Navigate to log in

As a user, I want to navigate to the login form, so that I can enter my credentials

**Acceptance criteria**

```
Feature: Navigation

Scenario: Navigate to login
  Given I am not logged in
  When I visit the application
  Then I see a button to "Log in"
  When I select "Log in"
  Then I navigate to the log in screen
  And I see the screen name "Log in"

Scenario: Navigate to log out
  Given I am logged in
  When I visit the application
  Then I see a button to "Log out"
  When I select "Log out"
  Then I am logged out
  And I see a message of "Log out successful"

```

### Enter credentials

As a user, I want to enter my credentials, so I can submit the form

```
Feature: Form

Scenario: See form
  Given I have selected to "Login"
  When I am on the login screen
  Then I see a form field labelled "email"
  And I see a form field labelled "Password"
  And I see a button to "Submit"

Scenario: Enter valid email
  When I enter an email
  And the email has a prefix
  And the email has an @ symbol proceed the prefix
  And the email has a suffix
  And the suffix is a valid domain
  Then the email is valid
  And I see a message of "Email valid."

Scenario: Enter invalid email
  Given I have entered an email
  When the email is not valid
  Then I see a message of "Email invalid."

Scenario: Enter password
  When I enter a password
  Then the password is hidden as I type
  When the password is longer than 8 characters
  Then I see a message of "Password entered"

Scenario: submit form
  Given I have entered a valid email
  And I have entered a password
  When I select submit
  Then the form is submitted

Scenario: valid email and password
  Given I have entered a valid email
  And I have entered a matching password
  When the form is submitted
  Then I see a message of "Log in successful"

Scenario: invalid password
  Given I have entered an invalid password
  When I submit the form
  Then I see a message of "Password invalid"
  Then I see a link with text "Forgot your password?"

```

### Reset password

As a user, I want to reset my password, so that I recover access my account

```
Scenario: navigate to recovery
  Given I am not logged in
  When I navigate to the log in screen
  Then I see a link with text "Forgot your password?"
  When I click the link
  Then I navigate to reset my password

Scenario: Submit recovery form
  When I navigate to reset my password
  Then I see a form field labelled email
  And a button with text "Submit"
  And I see a message of "Submit your email to reset your password."
  When I enter an email
  And the email is valid
  And I submit the form
  Then the I see a message "Check your email for instructions."

Scenario: Receive email
  Given I have submitted the recovery form
  When I receive an email
  Then I see email text of "click the reset link to reset your password"
  And the email contains a reset link
  When I click the reset link
  Then I am directed to the application

Scenario: Set a new password
  Given I have received the recovery email
  And clicked the reset link
  When I am directed to the application
  Then I see a recovery form
  And I see a form field labelled "Password"
  And I see a button labelled "Submit"
  When I enter a new password
  Then I am able to submit the form
  When submit the form
  Then I am directed to log in

``` -->
