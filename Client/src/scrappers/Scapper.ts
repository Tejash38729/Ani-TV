import axios from 'axios';
import cheerio from 'cheerio';




// Function to fetch and scrape data
export default async function scrapeWebsite(url: string) {
try {
        // Fetch HTML content from the URL
        const response = await axios.get(url);

        // Load HTML content into Cheerio
        const $ = cheerio.load(response.data);

        // Example: Extracting iframes from the webpage
        const iframes: string[] = [];
        $('iframe').each((index, element) => {
            const iframeSrc = $(element).attr('src');
            if (iframeSrc) {
                iframes.push(iframeSrc);
            }
        });
    // console.log('Iframes:', iframes);
    return iframes[0]
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the scraping function

