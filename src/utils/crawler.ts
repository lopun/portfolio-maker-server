import pup from "puppeteer";

export const crawler = async username => {
  try {
    const browser = await pup.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`https://github.com/${username}?tab=repositories`);
    await page.waitForSelector("#user-repositories-list");
    let result = new Array();
    const sections = await page.$$("#user-repositories-list > ul > li");
    for (const section of sections) {
      const title = await section.$eval("div.d-inline-block > h3 > a", a =>
        a.innerHTML.trim()
      );
      let language;
      const languageSection = await section.$("div > span.mr-3");
      if (languageSection) {
        language = await section.$eval("div > span.mr-3", span =>
          span.innerHTML.trim()
        );
      } else {
        language = "No Language";
      }
      const rawPage = await browser.newPage();
      await rawPage.goto(
        `https://raw.githubusercontent.com/${username}/${title}/master/README.md`
      );
      await rawPage.waitForSelector("pre");

      const markdown = await rawPage.$eval("pre", pre => pre.innerHTML);
      console.log(title, language, markdown);
      result.push({ title, language, markdown });
    }
    return result;
  } catch (error) {
    console.log("our error", error);
    return [];
  }
};
