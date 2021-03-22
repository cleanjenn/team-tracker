const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3002,
    //MySQL username
    user: 'root',
    //MySQL password
    password: '12345678',
    database: 'team'
});