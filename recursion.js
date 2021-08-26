const puppeteer = require('puppeteer');

(async () => {
  
  // Searchterm for Gall  
  const searchTerm = "bacardi"
  // Extract data from current page
  const extractProducts = async url => {

      // Scrape the data we want  
      const page = await browser.newPage();
      await page.goto(url);
      //log
      console.log(`scraping: ${url}`) 
      const productsOnPage = await page.evaluate(() =>
      Array.from(document.querySelectorAll("div.c-product-tile")).map(products => ({
      title: products.querySelector('h6.product-tile__title').textContent.trim(),
      price: products.querySelector('.price__value').textContent.trim(),
      image: products.querySelector('div.product-tile__image-container img').src
      }))
    );
    await page.close();

    // Recursively scrape the next page
    if (productsOnPage.length < 1) {
      // Stop if no products are found
      return productsOnPage
     } else {
        // Go fetch products from next page
        const nextPageNumber = parseInt(url.match(/start=(\d+)$/)[1], 10) + 12;
        const nextUrl = `https://www.gall.nl/zoeken/?q=`+searchTerm+`&start=${nextPageNumber}`;

        return productsOnPage.concat(await extractProducts(nextUrl))
    }

  };

  const browser = await puppeteer.launch();
  //const url = "https://www.gall.nl/zoeken/?q=bacardi";
  const firstUrl = "https://www.gall.nl/zoeken/?q="+searchTerm+"&start=0";
  const products = await extractProducts(firstUrl);

  // TODO: Update a database with the result
  console.log(products)

  await browser.close();
})();