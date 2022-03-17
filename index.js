const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false
  });

  const page = await browser.newPage();
  
  const searchTerm = "Apple";
  await page.goto(
      "https://www.alza.cz/search.htm?exps=" + searchTerm
  );
  
  const productsHandles = await page.$$('#boxes > .box');
  let bestsellers = []

  for (const producthandle of productsHandles) { 
  
      const code = await page.evaluate(el => el.querySelector(".code").textContent, producthandle)

      const title = await page.evaluate(el => el.querySelector("div.fb > a").textContent, producthandle)

      const img = await page.evaluate(el => el.querySelector(".js-box-image").getAttribute("data-src"), producthandle)

      const price = await page.evaluate(el => el.querySelector(".c2").textContent, producthandle)

      const itemsInStock = await page.evaluate(el => el.querySelector(".postfix").textContent, producthandle)

      
       bestsellers.push({code,title,img, price, itemsInStock})
    }

    await page.click("#ui-id-4");
    console.log(bestsellers);

    
})()




