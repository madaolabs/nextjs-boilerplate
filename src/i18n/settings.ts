export const fallbackLng = "en";
export const languages = [fallbackLng, "zh", 'es', 'ja', 'ru', 'de'];

export function getOptions(lng = fallbackLng) {
    return {
        // debug: true,
        supportedLngs: languages,
        fallbackLng,
        lng,
    };
}