const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://www.gall.nl/zoeken/?q=bacardi";
  await page.goto(url);

  //await page.screenshot({path: 'example.png'});

  const productsOnPage = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.c-product-tile")).map(products => ({
      title: products.querySelector('h6.product-tile__title').textContent.trim(),
      price: products.querySelector('.price__value').textContent.trim(),
      image: products.querySelector('div.product-tile__image-container img').src
    }))
  );

  console.log(productsOnPage)

  await browser.close();
})();

// TODO: Check why map does not return an array in Safari Devtools

// get the titles
// Array.from(document.querySelectorAll('div.c-product-tile h6.product-tile__title')).map((partner) => partner.innerText.trim())

// get the prices
// Array.from(document.querySelectorAll('div.c-product-tile .price__value')).map((price) => price.innerText.trim())

// get the images
// Array.from(document.querySelectorAll('div.c-product-tile div.product-tile__image-container img')).map((imgURL) => imgURL.src)