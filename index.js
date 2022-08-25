// Your code here
 let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour:row[3],
        timeInEvents: [],
        timeOutEvents:[]
    }
 }
function createEmployeeRecords(employeeRowData){
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}
function createTimeInEvent(employee,dateStamp) {
let [date,hour] = dateStamp.split(' ')
employee.timeInEvents.push({
    type:'TimeIn',
    hour: parseInt(hour,10),
    date,
})
        return employee
}

function createTimeOutEvent(employee,datestamp) {
    let[date,hour] = datestamp.split(' ')
    employee.timeOutEvents.push({
        type:'TimeOut',
        hour: parseInt(hour,10),
        date,
    })
    return employee
}

function hoursWorkedOnDate(employee,soughtdate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtdate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtdate
    })
        return (outEvent.hour - inEvent.hour) /100
}

function wagesEarnedOnDate(employee,dataSought) {
let rawwage = hoursWorkedOnDate(employee, dataSought) * employee.payPerHour
return parseFloat(rawwage.toString())
}

function allWagesFor(employee){
  let eligbleDates = employee.timeInEvents.map(function(e){
    return e.date
  })
  let payable = eligbleDates.reduce(function(memo, d){
    return memo + wagesEarnedOnDate(employee, d)
  }, 0)
 
  return payable 
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

function calculatePayroll(arrayOfEmployeeRecords){
return arrayOfEmployeeRecords.reduce(function(memo,rec){
    return memo + allWagesFor(rec)
},0)
}