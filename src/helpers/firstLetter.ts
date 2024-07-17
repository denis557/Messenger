export const firstLetter = (name: string): string => {
    if(!name) return '';
    
    return name[0].toUpperCase();
}