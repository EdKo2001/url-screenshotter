# Web Page Screenshots with Puppeteer

This Node.js script uses Puppeteer to capture screenshots of web pages listed in the `urlList` array. It sorts the URLs based on their post dates and saves screenshots of each page in the `images` folder.

## Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager) to install dependencies

## Installation

1. Clone or download this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.

## Usage

1. Modify the `urlList` array in the `index.js` file to include the URLs you want to capture screenshots of.
2. Optionally, adjust viewport settings or screenshot options according to your requirements.
3. Run the script by executing `node index.js` in your terminal.
4. Screenshots will be saved in the `images` folder with filenames based on the post dates of the respective URLs.

## Additional Notes

- Ensure that Puppeteer is compatible with your system and installed dependencies.
- This script assumes that the URLs in `urlList` are accessible and loadable.
- Adjust the timeouts according to the loading times of your web pages to ensure accurate screenshots.
- Remember to handle errors gracefully and monitor console output for any issues during execution.

## License

This project is not intended for public distribution and is proprietary. All rights reserved.
