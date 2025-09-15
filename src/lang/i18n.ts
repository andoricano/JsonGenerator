import ko from './ko.json';
import en from './en.json';

export type Lang = 'ko' | 'en';
export type LangKey = keyof typeof ko;

const resources: Record<Lang, typeof ko> = { ko, en };

let currentLang: Lang = 'ko';

export function t(key: LangKey): string {
    return resources[currentLang][key];
}

export function setLang(lang: Lang) {
    currentLang = lang;
}

export function getLang(): Lang {
    return currentLang;
}