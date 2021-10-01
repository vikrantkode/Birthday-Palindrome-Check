function reverseString(str) {
    var listOfChars = str.split('');
    // console.log(listOfChars);
    var reverseListOfChars = listOfChars.reverse();
    // console.log(reverseListOfChars);
    var reversedString = reverseListOfChars.join('');
    // console.log(reversedString);
    return reversedString;
}

function checkPalindrome(str) {
    var isPalindrome = reverseString(str);
    // console.log(isPalindrome)}
    if (isPalindrome === str) {
        return true;
    } else {
        return false;
    }
}

function convertDateToString(date) {
    if (date.day < 10) {
        var newDayStr = '0' + date.day;
    } else {
        var newDayStr = date.day.toString();
    }

    if (date.month < 10) {
        var newMonthStr = '0' + date.month;
    } else {
        var newMonthStr = date.month.toString();
    }

    var newYearStr = date.year.toString();
    var dateStr = {
        day: newDayStr,
        month: newMonthStr,
        year: newYearStr
    }

    return dateStr;
}

// console.log(convertDateToString(date))
function checkAllValidDateFormat(date) {

    var dateStr = convertDateToString(date);
    var DDMMYYYY = dateStr.day + dateStr.month + dateStr.year;
    var MMDDYYYY = dateStr.month + dateStr.day + dateStr.year;
    var YYYYMMDD = dateStr.year + dateStr.month + dateStr.day;
    var DDMMYY = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var MMDDYY = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var YYMMDD = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
    var arrOfDate = [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD]

    return arrOfDate;

}

function checkPalindromeForValidDateFormat(date) {
    var listOfPalindrome = checkAllValidDateFormat(date);
    var flag = false;
    for (let i = 0; i < listOfPalindrome.length; i++) {
        if (checkPalindrome(listOfPalindrome[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = month + 1;
            }
        }
    }   else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }
        if (month > 12) {
        month = 1;
        year = year + 1;
    }
        return {
            day: day,
            month: month,
            year: year
        }
}

function findNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var counter = 0;
    while(1) {
        counter++;
        var checkPalindrome = checkPalindromeForValidDateFormat(nextDate);
        if(checkPalindrome) {
            break;
        }
            nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

const bdayInput = document.querySelector('#birth-date');
const checkBtn = document.querySelector('#check-btn');
const outputDiv = document.querySelector('#output-div');


function clickHandler() {
    var bdayStr = bdayInput.value;
    if(bdayStr != '') {
    var listOfDate = bdayStr.split('-');

    var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
    }
    var checkPalindrome = checkPalindromeForValidDateFormat(date);

    if(checkPalindrome) {
        outputDiv.innerText = "Woahh...!your birthday is  a palindrome";
    }
    else {
        var [counter, nextDate] = findNextPalindromeDate(date);
        outputDiv.innerText = `next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} & you missed it by ${counter} days`
    }
    }
}
checkBtn.addEventListener('click', clickHandler)