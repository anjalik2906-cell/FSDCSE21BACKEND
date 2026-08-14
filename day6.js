// const fs =require('fs');
// fs.writeFileSync('day6.txt','this is day 6 of node js');
// console.log("file created successfully");
// let data=fs.readFileSync('day6.txt','utf-8');
import fs from 'fs';
const fileName ='student.txt';
async function createFile() {
    try {
        await fs.promises.writeFile(fileName, 'Name: Anjali\n email: anjalk.2906@gmail.com\n');
        console.log("File created successfully");
    } catch (error) {
        console.error("Error creating file:", error);
    }
}
async function readFile() {
    try {
        const data = await fs.promises.readFile(fileName, 'utf-8');
        console.log("File contents:", data);
    }
    catch (error) {
        console.error("Error reading file:", error);
    }