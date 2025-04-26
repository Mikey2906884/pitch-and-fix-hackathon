- <ins>HTML Bugs w/ Fixes:</ins>

  - All files are missing meta tags:

    - viewport meta tag for responsive design
    - Internet Explorer version meta tag
    - **_Fix:_** added meta tags to html files.

  - All files have incorrect font awesome links

    - **_Fix:_** added correct links

  - All files call out the wrong class for font awesome icons

    - **_Fix:_** corrected "fas", "far", and "fab" to "fa"

  - index.html and products.html call out wrong name for font awesome half
    stars, and each page did not have the half star at the end of the rating for
    Bluetooth Speaker

    - **_Fix:_** corrected "fa-star-half-alt" to "fa-star-half" and moved half
      stars for Bluetooth Speakers to end of rating

  - index.html has the links to the css files organized differently.

    - **_Fix:_** Reorganized the links listed in the index.html to match the order of files within the css folder.

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

  - The products.html needed the correct relative path in the src for the image logo container.

    - **_Fix:_** the path in the src is now "../images/ShopEase-logo.svg"

  - The scripts found at the bottom of the products.html were out of order. One of the closing tags was misspelled.

    - **_Fix:_** I reorganized the scripts to match the order of the files within the js folder. I corrected the closing tag from "script src='../js/cart.js' /scrip" to "script src='../js/cart.js' /script"

  - product-detail.html:102 incorrect input type "text" is called out

    - **_Fix:_** updated input type to "number"

  - products.html:145-147 Rewrote the div quantity controls

    - **_Fix:_** Deleted the two buttons and set the "input" element's attribute "Value" to 0 and attribute "Min" to 0. The buttons were unnecessary, since you could increase and decrease the amount within the input area.

  - products.html:157 This button was missing a data-product-price attribute

    - **_Fix:_** added the attribute data-product-price and set it to $99.99

  - products.html:186 The Reviews button was missing the data-tab attribute.

    - **_Fix:_** added the data-tab attribute to this button and named it reviews

  - products.html:212-241 The table was missing a table tag

    - **_Fix:_** Moved all table rows and their corresponding headers and data inside of a table body.

  - products.html:278 review content div is missing closing tag

    - **_Fix:_** closed the div

  - products.html:420-438 The product-card structure was needing to be corrected.

    - **_Fix:_** Restructured the product-card for product2 to match the product-card structure of product3 and product4. Separated the product image and product details in their respective div tags. Changed the button to be an Add to Cart button with the respective attributes

  - products.html:506 facebook social link missing closing anchor tag

    - **_Fix:_** closed the anchor

  - products.html:19 and cart.html: 19 logo image link called out
    incorrectly

    - **_Fix:_** corrected the link

  - products.html:30 product anchor was not called out as active page to
    match home page

    - **_Fix:_** added "active" class to anchor tag

  - products.html:541 The "../js/cart.js" script was typed twice inside products.html

    - **_Fix:_** Deleted the second script. Made sure the structure of js scripts matched the alphabetical listing of the files inside the js folder.

- <ins>CSS Bugs w/ Fixes:</ins>

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

- <ins>PITCH-AND-FIX-HACKATHON Bugs w/ Fixes:</ins>

  - cart.css is saved as "cat.css". This does not properly link the stylessheet to the web page.

    - **_Fix:_** updated name of file to "cart.css"

  - products.html is saved as "product-detail.html". This does not properly link the products.html page to the index.html page.

    - **_Fix:_** updated name of file to "products.html"
