export const changeTimeZone = (date: string): string => {
    const formattedDate = new Date(date);

    const offset = 3;
    const utcDate = new Date(formattedDate.getTime() + offset * 60 * 60 * 1000);
    const isoString = utcDate.toISOString().replace('Z', '+03:00');
    const isoDate = new Date(isoString);

    return isoDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}