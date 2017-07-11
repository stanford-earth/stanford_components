<?php

namespace Drupal\stanford_components\TwigExtension;

use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\Component\Utility\Xss;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Class StanfordComponentsTwigExtension.
 */
class StanfordComponentsTwigExtension extends \Twig_Extension {

  /**
   * Used for getting $_GET parameters.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  protected $requestStack;

  /**
   * StanfordComponentsTwigExtension constructor.
   *
   * @param \Symfony\Component\HttpFoundation\RequestStack $requestStack
   *   Drupal::request()
   */
  public function __construct(RequestStack $requestStack) {
    $this->requestStack = $requestStack;
  }

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
      new \Twig_SimpleFilter('md5', [$this, 'md5']),
      new \Twig_SimpleFilter('field_count', [$this, 'fieldCount']),
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
      new \Twig_SimpleFunction('get_param', [$this, 'getParam']),
      new \Twig_SimpleFunction('md5', [$this, 'md5']),
      new \Twig_SimpleFunction('field_count', [$this, 'fieldCount']),
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

  /**
   * Get parameter from $_GET.
   *
   * @param string $name
   *   Parameter key.
   * @param mixed $default
   *   The default value if the parameter key does not exist.
   * @param bool $deep
   *   If true, a path like foo[bar] will find deeper items.
   *
   * @return mixed|null
   *   Value of the parameter or null if nothing.
   */
  public function getParam($name, $default = NULL, $deep = FALSE) {
    $value = $this->requestStack->getCurrentRequest()->query->get($name, $default, $deep);
    return Xss::filter($value);
  }

  /**
   * Get an md5 of an item.
   *
   * @param mixed $item
   *   Something to get an md5 hash for.
   *
   * @return string
   *   Md5 of serialized item.
   */
  public function md5($item) {
    return md5(serialize($item));
  }

  /**
   * Since there's no way to get number of field items in twig, we do this.
   *
   * @param mixed $item
   *   Field item render array.
   *
   * @return int
   *   Number of field items.
   */
  public function fieldCount($item) {
    // Only 1 field in the region.
    if (count($item) == 1) {
      $field_key = key($item);

      // Only when its an actual field.
      if (isset($item[$field_key]['#theme']) && $item[$field_key]['#theme'] == 'field') {
        /** @var \Drupal\Core\Field\FieldItemList $items */
        $items = $item[$field_key]['#items'];
        return $items->count();
      }
    }
    // The item is the field render array.
    elseif (is_array($item) && isset($item['#theme']) && $item['#theme'] == 'field') {
      /** @var \Drupal\Core\Field\FieldItemList $items */
      $items = $item['#items'];
      return $items->count();
    }
    return count($item);
  }

}
