<?php

namespace Drupal\stanford_components\TwigExtension;

use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Class StanfordComponentsTwigExtension.
 */
class StanfordComponentsTwigExtension extends \Twig_Extension {

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'stanford_components';
  }

  /**
   * {@inheritdoc}
   */
  public function getFilters() {
    return [
      new \Twig_SimpleFilter('openlink', [$this, 'openLink']),
      new \Twig_SimpleFilter('closelink', [$this, 'closeLink']),
      new \Twig_SimpleFilter('first_char', [$this, 'firstChar']),
      new \Twig_SimpleFilter('get_img_src', [$this, 'getImgSrc']),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFunctions() {
    return [
      new \Twig_SimpleFunction('openlink', [$this, 'openLink']),
      new \Twig_SimpleFunction('closelink', [$this, 'closeLink']),
      new \Twig_SimpleFunction('first_char', [$this, 'firstChar']),
      new \Twig_SimpleFunction('get_img_src', [$this, 'getImgSrc']),
    ];
  }

  /**
   * Build a link in a basic render array without the closing <a> tag.
   *
   * @param array|string $original_link
   *   Render array of a link field, url, or link html.
   * @param array $attributes
   *   Key value pair of attributes to set on the link.
   *
   * @return array|null
   *   Render array or null if no link.
   */
  public function openLink($original_link, $attributes = []) {
    // Make sure we have a string.
    $original_link = render($original_link);
    $trimmed = trim(strip_tags($original_link));

    // Empty.
    if (!$trimmed) {
      return NULL;
    }

    $dom = new \DOMDocument('1.0', 'UTF-8');
    $dom->loadHTML($original_link);

    // Get all links.
    /** @var \DOMNodeList $link */
    $link = $dom->getElementsByTagName('a');
    if ($link->length) {
      /** @var \DOMElement $link_element */
      $link_element = $link->item(0);

      // Set title attribute if none exits.
      if (!$link_element->getAttribute('title')) {
        $link_element->setAttribute('title', $trimmed);
      }

      // Append attributes to retain field settings.
      foreach ($attributes as $key => $value) {
        $existing_attribute = $link_element->getAttribute($key);
        $existing_attribute .= " $value";
        $link_element->setAttribute($key, trim($existing_attribute));
      }

      // Get html.
      $link_html = $dom->saveHTML($link_element);
    }
    else {
      if (!isset($attributes['title'])) {
        $attributes['title'] = $trimmed;
      }

      if (substr($trimmed, 0, 1) == '/') {
        global $base_url;
        $trimmed = $base_url . $trimmed;
      }
      $url = Url::fromUri($trimmed);
      $url->setOptions(['attributes' => $attributes]);
      $link_html = Link::fromTextAndUrl(strip_tags($original_link), $url)
        ->toString()
        ->getGeneratedLink();
    }

    return ['#markup' => substr($link_html, 0, strpos($link_html, '>') + 1)];
  }

  /**
   * Gets the closing tag for the link.
   *
   * @param mixed $original_link
   *   Render array, string or null.
   *
   * @return array|null
   *   Render array of the closing <a> tag.
   */
  public function closeLink($original_link) {
    return $this->openLink($original_link) ? ['#markup' => '</a>'] : NULL;
  }

  /**
   * Gets the very first letter of the item.
   *
   * @param mixed $item
   *   Render array, string, or null.
   *
   * @return array|null
   *   Render array with the drop cap letter or null if no letter is there.
   */
  public function firstChar($item) {
    $item = render($item);
    $firstchar = substr(trim(strip_tags($item)), 0, 1);
    return $firstchar ? $firstchar : NULL;
  }

  /**
   * Parse the item to get an actual image url.
   *
   * @param mixed $item
   *   Render array or string of the image field/url.
   *
   * @return null|string
   *   Url to image.
   */
  public function getImgSrc($item) {
    $item = render($item);

    if (strpos($item, '<img') !== FALSE) {
      $dom = new \DOMDocument('1.0', 'UTF-8');
      $dom->loadHTML($item);
      /** @var \DOMNodeList $images */
      $images = $dom->getElementsByTagName('img');
      return $images->item(0)->getAttribute('src');
    }

    $trimmed = trim(strip_tags($item));
    return $trimmed ? $trimmed : NULL;
  }

}
