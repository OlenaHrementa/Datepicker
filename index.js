// Dark-light mode
let dark_mode_toggle = document.querySelector('.dark-switch')

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('dark')
    document.querySelector('body').classList.toggle('light')
}
// calendar
let calendar = document.querySelector('.datepicker')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.datepicker-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month and choose date
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        let days = document.querySelectorAll('.datepicker-days div');
        
        days.forEach(div => {
            div.addEventListener('click', () => {
                reset_choice();
                div.classList.add('day-mark');
            })
        })
        function reset_choice() {
            days.forEach(div => {
                div.classList.remove('day-mark');
            })
        }

        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1

            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_picker = calendar.querySelector('#month-picker')
let currDate = new Date()
let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#previous-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#previous-month').onclick = () => {
    --curr_month.value
    if (curr_month.value < 0) {
        curr_month.value = 11
        curr_year.value--
    }
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-month').onclick = () => {
    ++curr_month.value
    if (curr_month.value > 11) {
        curr_month.value = 0
        curr_year.value++
    }
    generateCalendar(curr_month.value, curr_year.value)
}
