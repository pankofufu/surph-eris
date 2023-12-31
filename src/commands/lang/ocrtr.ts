import Command from "../../classes/Command";
import { ocr, translate } from "../../modules/api/jsonRoutes";
import { ErrorResponse } from "../../modules/api/routes";
import { ErrorEmbed, Translation } from "../../modules/embeds";
import { getOptions, getmedia, reply, isSaneURL } from "../../modules/util";

export default {
    name: 'ocrtr',
    run: async (msg, args) => {

        const options = getOptions(args.join(' '));
        console.log(options);
        let langTo = options.options.to;
        if (!langTo) langTo = 'en';

        const url = await getmedia(msg);
        if (!url) { reply({embed: ErrorEmbed('Couldn\'t find anything to OCR.')}, msg); return; }
        if(!isSaneURL(url, ['jpeg', 'webp', 'jpg', 'png'])) { reply({embed: ErrorEmbed('Invalid media type.')}, msg); return; }
        let res = await ocr(url);
        if (!res.success) { res = res as ErrorResponse; reply({ embed: ErrorEmbed('There was an error OCRing your image.```' + res.reason + '```') }, msg); return; }
        
        const t_res = await translate(res.json.text, langTo);
        if (!t_res.success) { reply({embed: ErrorEmbed('There was an error translating your image. Please try again later.')}, msg); return; }
        reply({embed: Translation(t_res.json.text)}, msg);

    },
    options: { aliases: ['ocrtranslate'], usage: '<media>' }
} as Command