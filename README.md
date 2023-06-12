# Employee Tracker

## Description
After becoming more familiar with back-end processes, it was time to make my first database. The application began with the goal of creating a command-line application that can be used to manage a company's employee database. The application uses Node.js, Inquirer, and MySQL to create an interface that allows the user to manipulate the data in the database.
## Installation
All that is required to run the application is a command line tool with Node.js and MySQL installed.
## Usage
Upon downloading the application:
1. Open up it's root directory inside of your command line tool.
2. Load into MySQL by typing <strong>'mysql -u root -p'</strong> into the console.
3. Enter your password, then run the command <strong>'source ./db/schema.sql'</strong> into the console to create the database.
4. Once the database has been created, you can seed it with placeholder employee info by running the command <strong>'source ./db/seeds.sql'</strong>, if you wish.
5. Then, run the command <strong>'node index.js'</strong> inside the root and you will see the interface appear inside the command line.
6. You will see a list of options asking which one you would like to select. Use the arrow keys (either up or down) to select the action of your choice.
7. Depending on the action, you will either see the requested information appear, or you will be prompted for more information.
8. You can exit the database by selecting <strong>'Quit'</strong>.

## Tutorial
[Click here to be directed to the tutorial video](https://drive.google.com/file/d/1HsT6AV54jWjK-cN2l8ZciFdX0Kz7xvIj/view)
