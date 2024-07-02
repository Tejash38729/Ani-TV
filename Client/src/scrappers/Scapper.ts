import axios from 'axios';
import cheerio from 'cheerio';

export default async function scrapeWebsite(url: string) {
try {
    const response = await axios.get(url);
    if (response.status === 404) return 
        const $ = cheerio.load(response.data);
        const iframes: string[] = [];
        $('iframe').each((_,element) => {
            const iframeSrc = $(element).attr('src');
            if (iframeSrc) {
                iframes.push(iframeSrc);
            }
        });
    return iframes[0]
    } catch (error) {
        console.error('Error:', error);
    }
}


