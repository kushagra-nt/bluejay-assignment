import * as fs from 'fs';
import * as Papa from 'papaparse';
import processData from './processData';


// Specify the path to your CSV file
const csvFilePath = './data.csv';


fs.readFile(csvFilePath, 'utf8', async(err, data) => {
    if (err) {
    console.error('Error reading the CSV file:', err);
    return;
    }

    // Parse the CSV data using PapaParse
    await Papa.parse(data, {
    header: true, // Assumes the first row contains headers
    dynamicTyping: true, // Automatically convert numeric values
    complete: (results) => {
        // The parsed CSV data is available in results.data
        const csvData = results.data;

        if(!csvData){
            console.log('failed to parse data or csv file is empty');
            return;
        }
        const EmployeeWorked1To10Hours = new Set();
        const EmployeeWorkedFor7ConsecutiveDays = new Set();
        const EmployeeWorkedMoreThan14Hours = new Set();

        processData({csvData, EmployeeWorked1To10Hours, EmployeeWorkedFor7ConsecutiveDays, EmployeeWorkedMoreThan14Hours});

        console.log('employee who worked for 7 consecutive days');
        console.log(EmployeeWorkedFor7ConsecutiveDays);

        console.log('==============================================');
        console.log();
        
        console.log('employee who worked for more than total 1 hour and less than 10 hours');
        console.log(EmployeeWorked1To10Hours);
        
        console.log('==============================================');
        console.log();
        
        console.log('employee who worked more than 14 hour in single shift');
        console.log(EmployeeWorkedMoreThan14Hours);

    },
    error: (error) => {
        console.error('Error parsing CSV:', error.message);
    },
    });
});