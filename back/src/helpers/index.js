export function createDateFromFormat(dateString) {
    const parts = dateString.split("/");

    if (parts.length !== 3) throw new Error("Invalid date format");

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const dateObject = new Date(year, month, day);
    return dateObject;
}
