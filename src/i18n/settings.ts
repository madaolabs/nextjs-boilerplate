export const fallbackLng = "en";
export const languages = [fallbackLng, "zh", "ar", 'bn', 'es', 'hi', 'ja', 'pa', 'pt', 'ru'];
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng) {
    return {
        // debug: true,
        supportedLngs: languages,
        fallbackLng,
        lng,
    };
}