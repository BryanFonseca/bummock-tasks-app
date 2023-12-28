export function parseDate(dateString) {
    const parts = dateString.split("/");

    if (parts.length !== 3) throw new Error("Invalid date format");

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const dateObject = new Date(year, month, day);
    return dateObject;
}

export function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

export function isSomeDaysLess(date1, date2) {
    const truncatedDate1 = new Date(
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate() + 1
    );

    console.log(truncatedDate1);

    const truncatedDate2 = new Date(date2);
    truncatedDate1.setHours(0, 0, 0, 0);
    console.log(truncatedDate2);

    return truncatedDate1 < truncatedDate2;
}
