"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const Papa = __importStar(require("papaparse"));
const processData_1 = __importDefault(require("./processData"));
// Specify the path to your CSV file
const csvFilePath = './data.csv';
fs.readFile(csvFilePath, 'utf8', (err, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (err) {
        console.error('Error reading the CSV file:', err);
        return;
    }
    // Parse the CSV data using PapaParse
    yield Papa.parse(data, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
            // The parsed CSV data is available in results.data
            const csvData = results.data;
            if (!csvData) {
                console.log('failed to parse data or csv file is empty');
                return;
            }
            const EmployeeWorked1To10Hours = new Set();
            const EmployeeWorkedFor7ConsecutiveDays = new Set();
            const EmployeeWorkedMoreThan14Hours = new Set();
            (0, processData_1.default)({ csvData, EmployeeWorked1To10Hours, EmployeeWorkedFor7ConsecutiveDays, EmployeeWorkedMoreThan14Hours });
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
}));
//# sourceMappingURL=index.js.map