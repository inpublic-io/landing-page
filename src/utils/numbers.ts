const thousands = 4;
const millions = 7;
const billions = 10;

export const formatNumber = (source: number): string => {
    const inString = source.toString();
    const length = inString.length;

    // TODO turn units into maps and iterate through them
    if (length >= billions) {
        const afterChar = inString.substring(length - (billions - 1), length - (billions - 2))
        return inString.substring(0, length - (billions - 1)) + (afterChar === "0" ? "" : "." + afterChar) + "B";
    } else if (length >= millions) {
        const afterChar = inString.substring(length - (millions - 1), length - (millions - 2))
        return inString.substring(0, length - (millions - 1)) + (afterChar === "0" ? "" : "." + afterChar) + "M"
    } else if (length >= thousands) {
        const afterChar = inString.substring(length - (thousands - 1), length - (thousands - 2))
        return inString.substring(0, length - (thousands - 1)) + (afterChar === "0" ? "" : "." + afterChar) + "K"
    }
    return inString;
}