@api
Feature: Basic VIUpal sample tests
  In order to make sure behat testing works
  As a Drupal developer
  I need to be able to write absolute basic tests and have them pass

  Scenario: Searching for "user login"
    Given I am an anonymous user
    Then I should see "User login"

  Scenario: Create users
    Given users:
      | name     | mail            | status |
      | Joe User | joe@example.com | 1      |
    And I am logged in as a user with the "administrator" role
    When I visit "admin/people"
    Then I should see the link "Joe User"

  Scenario: Login as a user created during this scenario
    Given users:
      | name      | status |
      | Test user |      1 |
    When I am logged in as "Test user"
    Then I should see the link "Log out"

  Scenario: Create a term
    Given I am logged in as a user with the "administrator" role
    When I am viewing a "panopoly_categories" term with the name "My tag"
    Then I should see the heading "My tag"

  Scenario: Create many terms
    Given "panopoly_categories" terms:
      | name    |
      | Tag one |
      | Tag two |
    And I am logged in as a user with the "administrator" role
    When I go to "admin/structure/taxonomy/panopoly_categories"
    Then I should see "Tag one"
    And I should see "Tag two"