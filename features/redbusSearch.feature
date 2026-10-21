@regression
Feature: Search buses on redBus
  As a redBus user
  I want to search for buses between two cities
  So that I can view available buses for my journey

  Background:
    Given user launches the redBus website

  @smoke @searchBus
  Scenario: Search buses for the configured route
    When user enters the configured departure city
    And user enters the configured destination city
    And user selects the configured journey date
    And user clicks on the Search buses button
    Then available buses should be shown for the configured route

  @routeForm
  Scenario: Select the configured route in the bus search form
    When user enters the configured departure city
    And user enters the configured destination city
    Then the configured route should be selected in the search form
