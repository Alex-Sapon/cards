export const shortWord = (word: string) => {
    if (word.length > 15) {
        return `${word.slice(0, 15)}...`;
    }

    return word;
}