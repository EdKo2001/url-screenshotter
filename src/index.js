const fs = require("fs");
const path = require("path");
const { setTimeout } = require("node:timers/promises");

const puppeteer = require("puppeteer");

// List of URLs to take screenshots of
const urlList = [
  {
    url: "https://example.com/",
    post_date: "2023-12-18 12:42:37",
  },
];

(async () => {
  // Check if the 'images' folder exists, create it if not
  const imagesFolderPath = path.join(__dirname, "../images");
  if (!fs.existsSync(imagesFolderPath)) {
    fs.mkdirSync(imagesFolderPath);
    console.log("Created 'images' folder.");
  }

  // Launch a headless browser
  const browser = await puppeteer.launch();

  // Sort the urlList array based on the post_date property
  urlList.sort((a, b) => {
    // Extract post dates from strings and convert them to Date objects
    const dateA = new Date(a.post_date);
    const dateB = new Date(b.post_date);

    // Compare the dates
    return dateA - dateB;
  });

  try {
    // Loop through URLs and take screenshots
    for (let i = 0; i < urlList.length; i++) {
      const urlData = urlList[i];
      const page = await browser.newPage();

      // Emulate desktop viewport
      await page.setViewport({ width: 1920, height: 1080 });

      // Navigate to the URL
      await page.goto(urlData.url);

      // Wait for the page to load completely
      await page.waitForSelector("body");

      // Wait for 0.5 second for initial content to load
      await setTimeout(500);

      // Scroll to the bottom of the page
      await page.evaluate(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
      });

      // Scroll to the top of the page
      await page.evaluate(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });

      // Wait for all images to load
      await page.evaluate(async () => {
        const selectors = Array.from(document.querySelectorAll("img"));
        await Promise.all(
          selectors.map((img) => {
            if (img.complete) return;
            return new Promise((resolve, reject) => {
              img.addEventListener("load", resolve);
              img.addEventListener("error", reject);
            });
          })
        );
      });

      // Wait for images to fully load
      await setTimeout(1000);

      // Generate a filename based on the post date
      const postDate = urlData.post_date.split(" ")[0];
      let screenshotPath = path.join(imagesFolderPath, `${postDate}.jpg`);

      // Check if the file already exists
      let counter = 1;
      while (fs.existsSync(screenshotPath)) {
        // Append a counter to the filename to ensure uniqueness
        screenshotPath = path.join(
          imagesFolderPath,
          `${postDate} (${counter}).jpg`
        );
        counter++;
      }

      // Take screenshot
      await page.screenshot({ path: screenshotPath, fullPage: true });

      console.log(
        `${i + 1} out of ${urlList.length}; Screenshot taken from ${
          urlData.url
        }`
      );

      // Close the page to free up resources
      await page.close();
    }
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();
