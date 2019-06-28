const currentDate = new Date();

const nths = (day) => {
    if(day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

// Obtaining the date
getDateFormat = (date) => {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "July", "August", "September", "October", "November", "December"
    ];
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" 
    ]
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const dayIndex = date.getDay();
    const year = date.getFullYear();
    const nth = nths(day);
    const formattedDate = days[dayIndex]+' '+day+nth+' of '+months[monthIndex]+', '+year;
    return formattedDate;
}

const newDate = getDateFormat(currentDate);
document.getElementById('date').innerHTML = newDate;

// Getting the quotes
let xhr = new XMLHttpRequest();
xhr.open("GET", "quotes/quotes.json", true);
xhr.onload = () => {
    if(xhr.status>=200 && xhr.status<400) {
        let data = JSON.parse(xhr.responseText),
            q = data.quotes,
            random = Math.floor(Math.random() * q.length);
        document.getElementById('content').innerHTML = q[random].quote;
        document.getElementById('author').innerHTML = q[random].author;
    }
};
xhr.onerror = () => {
    console.log("Something went wrong...")
}

xhr.send();