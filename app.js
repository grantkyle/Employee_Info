const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// ID number for employees, starting at 1
let id = 1
// Empty array for the employees
let allEmployees = []

// Grabbing JS files for all employees and rendering them into HTML
const mainHTML = require("./templates/main")
const managerHTML = require("./templates/manager")
const engineerHTML = require("./templates/engineer")
const internHTML = require("./templates/intern")
let html = ""

// Question function for questions for ALL employees
function askQuestion() {
    inquirer.prompt({
        type: "list",
        message: "What do you want to do?",
        choices: ["add manager", "add engineer", "add intern", "quit"],
        name: "addEmployee"
    }).then(function (input) {
        switch (input.addEmployee) {
            case "add manager":
                addManager()
                break

            case "add engineer":
                addEngineer()
                break
            case "add intern":
                addIntern()
                break
            case "quit":
                makeHTML()
                return

        }
    })
}

function makeHTML() {

    for (let index = 0; index < allEmployees.length; index++) {
        if (allEmployees[index].getRole() === "Manager") {
            html = html + managerHTML(allEmployees[index])
        } else if (allEmployees[index].getRole() === "Engineer") {
            html = html + engineerHTML(allEmployees[index])
        }
        else if (allEmployees[index].getRole() === "Intern") {
            html = html + internHTML(allEmployees[index])
        }
    }
    let finalHTML = mainHTML(html)
    fs.writeFile("./index.html", finalHTML, function (error) { })
}

function addManager() {
    inquirer.prompt([{
        type: "input",
        message: "What is your name?",
        name: "employeeName"

    }, {
        type: "input",
        message: "What is your email?",
        name: "employeeEmail"
    }, {
        type: "input",
        message: "What is your office number?",
        name: "employeeOfficeNumber"
    }]).then(function (input) {
        let manager = new Manager(input.employeeName, id++, input.employeeEmail, input.employeeOfficeNumber)
        allEmployees.push(manager)

        // for (let index = 0; index < allEmployees.length; index++) {

        //     if (allEmployees[index].getRole()==="Manager"){
        //         html=html+managerHTML(allEmployees[index])
        //     }
        // }

        console.log(allEmployees)
        console.log(html)
        askQuestion();
    })
}

function addEngineer() {
    inquirer.prompt([{
        type: "input",
        message: "What is your name?",
        name: "employeeName"

    }, {
        type: "input",
        message: "What is your email",
        name: "employeeEmail"
    }, {
        type: "input",
        message: "What is your Github?",
        name: "employeeGithub"
    }]).then(function (input) {
        let engineer = new Engineer(input.employeeName, id++, input.employeeEmail, input.employeeGithub)
        allEmployees.push(engineer)

        // for (let index = 0; index < allEmployees.length; index++) {

        //     if (allEmployees[index].getRole()==="Engineer"){
        //         html=html+engineerHTML(allEmployees[index])
        //     }
        // }

        console.log(allEmployees)
        console.log(html)
        askQuestion();
    })
}

function addIntern() {
    inquirer.prompt([{
        type: "input",
        message: "What is your name?",
        name: "employeeName"

    }, {
        type: "input",
        message: "What is your email",
        name: "employeeEmail"
    }, {
        type: "input",
        message: "What is your school?",
        name: "employeeSchool"
    }]).then(function (input) {
        let intern = new Intern(input.employeeName, id++, input.employeeEmail, input.employeeSchool)
        allEmployees.push(intern)

        // for (let index = 0; index < allEmployees.length; index++) {

        //     if (allEmployees[index].getRole()==="Intern"){
        //         html=html+internHTML(allEmployees[index])
        //     }
        // }

        console.log(allEmployees)
        console.log(html)
        askQuestion();
    })
}

askQuestion();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
