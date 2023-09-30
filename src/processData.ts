type Record = {
    'Position ID': string;
    Time: string;
    'Time Out': string;
    'Timecard Hours (as Time)': string;
    'Pay Cycle Start Date': string;
    'Employee Name': string,
    'File Number': number
}

type MapValue = {
    timeIn: Date,
    timeOut: Date
}

export default function processData ({csvData, EmployeeWorked1To10Hours, EmployeeWorkedFor7ConsecutiveDays, EmployeeWorkedMoreThan14Hours}){
    const EmployeeWorkingDays = new Map<string,MapValue[]>();

    csvData.forEach((record: Record) => {

        const timeIn:any = new Date(record.Time)
        const timeOut:any = new Date(record['Time Out']);
        
        if(timeOut<timeIn)return;

        const shiftHours = (timeOut-timeIn)/ (60*60*1000);

        
        const key = `${record['Employee Name']} at position ${record['Position ID']}`;

        // a) who has worked for 7 consecutive days.
        // b) who have less than 10 hours of time between shifts but greater than 1 hour
        if(!EmployeeWorkingDays.has(key)){
            EmployeeWorkingDays.set(key, []);
        }
        EmployeeWorkingDays.get(key).push({timeIn,timeOut});

        // c) Who has worked for more than 14 hours in a single shift
        if(shiftHours>14)
        EmployeeWorkedMoreThan14Hours.add(key);

    });

    // a) who has worked for 7 consecutive days.
    // b) who have less than 10 hours of time between shifts but greater than 1 hour
    EmployeeWorkingDays.forEach((days, employee) => {
        let workedFor7ConsecutiveDays = false;
        let isDifferenceBetweenShift1to10 = true;
        let count=1;

        for(let i=1 ; i<days.length ; i++){

            //=============================================================
            // a) who has worked for 7 consecutive days.
            const prevDayLogoutDay:number = days[i-1].timeOut.getDate();
            const newLoginDay:number = days[i].timeIn.getDate();
            const newLogoutDay:number = days[i].timeOut.getDate();

            // if again login on same date
            if(prevDayLogoutDay===newLoginDay && newLoginDay===newLogoutDay)continue;

            if(newLoginDay-prevDayLogoutDay===1 || newLogoutDay-newLoginDay===1){
                count++;
            }
            else{
                count = 1;
            }
            if(count==7){
                workedFor7ConsecutiveDays = true;
            }

            //=============================================================
            // b) who have less than 10 hours of time between shifts but greater than 1 hour
            const lastLogout:any = days[i-1].timeOut;
            const newLogin:any = days[i].timeIn;
            const diff = (newLogin-lastLogout)/(60*60*1000);
            
            if(diff<1 && diff>=10)isDifferenceBetweenShift1to10 = false;

        }
        if(workedFor7ConsecutiveDays){
            EmployeeWorkedFor7ConsecutiveDays.add(employee);
        }
        if(isDifferenceBetweenShift1to10){
            EmployeeWorked1To10Hours.add(employee);
        }
    });
}