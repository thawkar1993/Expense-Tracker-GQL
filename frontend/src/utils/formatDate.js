export function formatDate(timeStamp){
    const date = new Date(parseInt(timeStamp)); //Parse the timeStamp to ensure it is an integer.
    const options = { days: "2-digits", month: "short", year: "numeric"};
    return date.toLocaleDateString("en-US", options);
    //Output: "12 Dec 2025"
}