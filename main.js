// Get current month and year
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Display initial calendar
displayCalendar(currentMonth, currentYear);

// Function to display the calendar
function displayCalendar(month, year) {
    const monthYearElement = document.getElementById('month-year');
    const calendarDaysElement = document.getElementById('calendar-days');

    // Display month and year
    monthYearElement.textContent = `${getMonthName(month)} ${year}`;

    // Display days of the month
    calendarDaysElement.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'empty');
        calendarDaysElement.appendChild(emptyDay);
    }

    for (let day = 1; day <= lastDay; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        dayElement.addEventListener('click', () => displayEvents(day, month, year));
        calendarDaysElement.appendChild(dayElement);
    }
}

// Function to get month name
function getMonthName(month) {
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    return months[month];
}

// Function to display events for a specific day
function displayEvents(day, month, year) {
    const eventListElement = document.getElementById('event-list');
    const eventInputElement = document.getElementById('event-input');
    const event = eventInputElement.value;

    if (event.trim() !== '') {
        // Find the corresponding event box for the clicked day
        const dayElement = document.querySelector(`.day:nth-child(${day})`);
        const eventBox = dayElement.querySelector('.event-box');

        // Display the event in the event box
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.textContent = `${getMonthName(month)} ${day}, ${year}: ${event}`;
        eventBox.appendChild(eventElement);

        eventInputElement.value = '';
    }
}

// Function to add event button click handler
function addEvent() {
    const dayElements = document.getElementsByClassName('day');
    for (let i = 0; i < dayElements.length; i++) {
        dayElements[i].classList.remove('selected');
    }
}

// Function to submit information to the user
function submitInfo() {
    const eventListElement = document.getElementById('event-list');
    const eventElements = eventListElement.querySelectorAll('.event');

    // Collect all events and display them
    let info = "Events:\n";
    eventElements.forEach((eventElement) => {
        info += `- ${eventElement.textContent}\n`;
    });

    // Display the information
    alert(info);
}