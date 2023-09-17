# SQL-Employee-Tracker
This project was created so users can manage their company's employee database by adding new employees, updating existing employee's roles, adding new departments and new roles to the database. This can come in handy for smaller businesses that need a quick way to check on employee salary or who that employee reports to, among other things!

This application utilizes the command-line to ask user's different questions based on their immediate needs- which takes that info and stores it in the database so that the information will persist.


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Troubleshooting](#troubleshooting)
* [Additional Information](#additional-information)

## Installation
* Clone repo to your local machine

* Make sure you have all required packages downloaded- if you are unsure, take a look at the "Credits" section in "Additional Information" to find the documentation on downloading those packages

* In the terminal, sign in to mysql with 'mysql -u root -p' and run 'source db/schema.sql;' to create database, then run 'quit;'

* Run 'node index.js' in the terminal

* Use the arrow keys on your keyboard to browse main menu options and the enter key to select

* Run '^C' (ctrl + C) to quit

* Run 'node index.js' to start up the application again

## Usage
Feel free to use this as you like, if you're 'tech-savvy' you could change the schema file to your personal needs so that when you run 'source db/schema.sql' you can have different table names and options on what information to fill your table with. If you already have things to insert into those tables you can update the seeds file as well.

Overall this is just a general database and if you can clone the repo you can change the files as you see fit.

Follow this link for a walkthrough video on this application's functionality:

<details> <summary> WALKTHROUGH VIDEO </summary>

https://drive.google.com/file/d/1YRFa6lu5FyLOHFJpKROIMTWAQk9N1mo4/view?usp=sharing

</details>

## Troubleshooting
* Make sure you have the correct packages installed and your server is connected/listening

* If you are experiencing connectivity issues within mysql, you may need to change host in index.js (line 15) to 'localhost'

* If you downloaded dotenv like i did- rename the .env.EXAMPLE file to .env and fill in the required fields

* If you chose not to use dotenv, you will need to replace process.env.DB_PASSWORD in index.js (line 18) with 'Your-MySQL-Password'


## Additional Information
> ### Repository Owner: PJ Rasmussen [whats-a-pj](https://github.com/whats-a-pj) 

<details>
<summary>Process Summary</summary>

</details>

<details>
<summary>Screenshots</summary>

</details>

<details>
<summary>Credits</summary>

Here is a list of packages I used

https://nodejs.org/en

https://www.npmjs.com/package/inquirer/v/8.2.4

https://www.npmjs.com/package/mysql2

https://www.npmjs.com/package/dotenv

https://www.npmjs.com/package/console.table

Websites I referenced

https://www.w3schools.com/sql/sql_select.asp

https://dev.mysql.com/doc/refman/8.0/en/insert.html

https://dev.mysql.com/doc/refman/8.0/en/creating-tables.html

https://dev.mysql.com/doc/refman/8.0/en/constraint-primary-key.html

https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html

https://patorjk.com/software/taag/#p=display&f=Graffiti&t=ASCII%20GENERATOR

I had help from CJ Sanders(TA), Jacek Hacking(TA) and a few different askBCS helpers to complete this assignment- as always, turns out I just had to add one line of code to get my initial set of questions working- but as I went along without using async/await functions, this assignment got much harder, this was an especially tough assignment as we didn't go over async/await and promises enough for me to understand how to use it. This application is a callback hell.

Had a tutor session with Juno Nguyen on 9/12 to study up on SQL and inquirer and run through my addData() issues so that user's can properly add to their database as opposed to only being able to view the data

</details>