<?php

use Drupal\DrupalExtension\Context\RawDrupalContext;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;

/**
 * Defines application features from the specific context.
 */
class FeatureContext extends RawDrupalContext implements SnippetAcceptingContext {

  /**
   * Initializes context.
   *
   * Every scenario gets its own context instance.
   * You can also pass arbitrary arguments to the
   * context constructor through behat.yml.
   */
  public function __construct() {
    error_reporting(0);
  }

  /* Custom context below that will fill a field and test for autocomplete responses */
  /**
   * @When I write :text into autocomplete field :field
   */
  public function iWriteTextIntoAutocompleteField($text, $field)
  {
    $el = $this->getSession()->getDriver()->getWebDriverSession()->element("xpath", $this->getSession()->getSelectorsHandler()->selectorToXpath('named_exact', array('field', $field)));
    $el->postValue(array('value' => array($text)));
    //now wait for the data to load
    sleep(5);
  }

}
