const puppeteer = require('puppeteer'); //import puppeteer library

async function scrapeProduct(url) {
    const browser = await puppeteer.launch(); //wait for puppeteer to launch browser...
    const page = await browser.newPage(); //wait for puppeteer to load the page...
    await page.goto(url); //go to the url

    //image
    const [el] = await page.$x('//*[@id="content"]/article/header/div/div[2]/div/div[1]/figure/img'); //select the title from gall website
    const src = await el.getProperty('src');
    const imgURL = await src.jsonValue();

    //title
    const [el2] = await page.$x('//*[@id="content"]/article/header/div/div[1]/h1');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();
 
    //price
    const [el3] = await page.$x('//*[@id="content"]/article/header/div/div[2]/div/div[2]/div[1]/div/div/div');
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({imgURL, title, price}); //log the image to the terminal

    browser.close(); //close the puppeteer browser
}

scrapeProduct('https://www.gall.nl/bier-box-belgie-4x25%2F1x33cl-908045.html'); //run the function on a specific product url...