import { Embed } from "eris";
import { ShazamMatch } from "./api/jsonRoutes";
import pkg from '../../package.json';
import * as os from 'node:os';
import { DbReminder } from "./db";

export const Translation = (text: string) => {
    return {
        description: `\`\`\`${text}\`\`\``,
        color: 0x608EEE,
        thumbnail: { url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png' }
    } as Embed;
}
export const OcrEmbed = (text: string) => {
    return {
        description: `\`\`\`${text}\`\`\``,
        color: 0xFFFF00,
        thumbnail: { url: 'https://media.discordapp.net/attachments/1138818819670933524/1141836922336063519/google-cloud-icon-400w.png?width=1514&height=1514' }
    } as Embed;
}
export const Shazam = (match: ShazamMatch) => {
    return {
            title: match.metadata.title,
            url: match.weburl,
            author: { name: match.metadata.artist },
            color: 0x0099FF,
            image: {url: match.metadata.coverart},
            footer: { text: 'Powered by Shazam', icon_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Shazam_icon.svg/2048px-Shazam_icon.svg.png' }
    } as Embed;
}

export const PingEmbed: Embed = {
    color: 0xFFFFFF, // white
    title: 'Pong!',
    type: 'rich',
    fields: [{ name: 'Version', value: `\`${pkg.version}\`` }, { name: 'Server', value: `\`${os.hostname()}\`` } ]
};

export const ReminderList = (list: string[]): Embed => {
    return {
        color: 0xFFFFFF, // white
        title: 'Reminders',
        type: 'rich',
        description: list.join('\n')
    }
}

export const ReminderPing = (reminder: DbReminder): Embed => {
    return {
        color: 0x90EE90,
        type: 'rich',
        description: `:bell: \`${reminder.info}\``
    };
}

export const BasicMessage = (text: string): Embed => {
    return {
        color: 0xFFFFFF, // white
        type: 'rich',
        description: text
    }
}

export const ErrorEmbed = (problem: string): Embed => {
    return {
        color: 0xD30000, // white
        type: 'rich',
        description: problem
    }
}