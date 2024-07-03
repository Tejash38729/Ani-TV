import axios from 'axios';
import cheerio from 'cheerio';

export default async function scrapeWebsite(url: string) {
try {
    const response = await axios.get(url);
    if (response.status === 404) return
        console.log(response.data) 
        const $ = cheerio.load(response.data);
        console.log($)
        const iframes: string[] = [];
        $('iframe').each((_,element) => {
            const iframeSrc = $(element).attr('src');
            if (iframeSrc) {
                iframes.push(iframeSrc);
            }
        });
    console.log(url)
    console.log(iframes)
    return iframes[0]
    } catch (error) {
        console.error('Error:', error);
    }
}


