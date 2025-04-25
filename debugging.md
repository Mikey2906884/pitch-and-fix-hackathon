- <ins>HTML Bugs w/ Fixes:</ins>

  - All files are missing meta tags:

    - viewport meta tag for responsive design
    - Internet Explorer version meta tag
    - **_Fix:_** added meta tags to html files.

  - All files have incorrect font awesome links

    - **_Fix:_** added correct links

  - All files call out the wrong class for font awesome icons

    - **_Fix:_** corrected "fas", "far", and "fab" to "fa"

  - index.html and product-detail.html call out wrong name for font awesome half
    stars, and each page did not have the half star at the end of the rating for
    Bluetooth Speaker

    - **_Fix:_** corrected "fa-star-half-alt" to "fa-star-half" and moved half
      stars for Bluetooth Speakers to end of rating

  - index.html:22-28 has ids instead of classes for nav items

    - **_Fix:_** changed id to class for each li tag

  - index.html:151 product4 img tag is missing src link

    - **_Fix:_** added "images/product4.jpg" link

  - index.html:210 categories section grid container div is missing closing tag

    - **_Fix:_** closed the div

  - index.html:220 placeholder for email input in newsletter section has wrong
    closing quotes

    - **_Fix:_** changed single quote to double quote

  - index.html:263 facebook social-link in footer is missing closing anchor tag

    - **_Fix:_** closed the anchor

  - cart.html:171 product price div is missing closing tag

    - **_Fix:_** closed the div

  - The product-detail.html line 16 needed the correct relative path in the src for the image.
    - **_Fix:_** the path in the src is now "../images/ShopEase-logo.svg"

- <ins>CSS Bugs w/ Fixes:</ins>

  - cart.css is saved as "cat.css"

    - **_Fix:_** updated name to "cart.css"

  - responsive.css contained empty ruleset for newsletter button

    - **_Fix:_** removed empty ruleset

  - responsive.css .newsletter input ruleset for mobile view is causing
    mismatched box sizing between input and submit button
    - **_Fix:_** added ".newletter button" to ruleset to ensure the button
      receives the same sizing update as the input

- <ins>JS Bugs w/ Fixes:</ins>

  - cart.js:addToCart() price variable redundancy

    - **_Fix:_** removed redundancy and updated object callout to function
      parameter productPrice

  - cart.js:addToCart() product total needs to increase with product quantity.
    Did not contain functionality to increase the total with the quantity

    - **_Fix:_** added total increase functionality (and updated quantity
      increase to shorthand)

-
