# hex2rgb
PHP function that translates a #HEX code into RGB values


# #HEX-2-RGB

[![License](http://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)

### PHP function that turns your #HEX code into RGBA values

Detailed Explaination
------------
* Insert a valid HEX code <?php $color_rgb = hex2rgb('#32323c'); ?>

* Function determins if HEX code is a string and if it has 3 or more characters

* Uses PHP function hexdec('#32323c') to create an array of colors

* Result:
```php
Array (
  [0] => 50
  [1] => 50
  [2] => 60
)
```
