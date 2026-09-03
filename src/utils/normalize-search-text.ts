const DIACRITICS_PATTERN = /\p{Diacritic}/gu;

export function normalizeSearchText(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(DIACRITICS_PATTERN, '');
}
