# Thai ID OCR App Assignment
Primary focus of mine was to build a robust **backend architecture**, to be transparent I didn't created frontend due to focus on backend. And I have run my backend on cloud based server, **codedamn**, due to lack of compatibility of system in using vision api.<br>
 **Contents of Readme:**
- Implemented functionalities
- How to run the application
- Result for sample input
 
# Backend functionalities 
1.Image processing and filtering of relevant data with help of Vision api.<br><br>
2.Focused on **error handling** and precise OCR reading from ID cards.<br><br>
3.Wrote write operations for pushing the data read from images.<br><br>
4.Implemented querying(**retrieving data** from) the Database, done through ID numbers <br><br>
5.**providing update and delete options** for further higher level of control over data as expected.<br><br>
5.**Hosted a live database** with proper schema, that'll save uploaded image data over the course of time.<br><br>
6.Got the expected result output for **3 sample ID cards**.

# How to run the application
## Project Setup

- Clone the project on your local
- Execute `npm install` on the same path as of your root directory of the downloaded project
- Create a `.env` file in the root directory and add the following environment variable
  - `PORT=<Any specified port>`
- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```{"development": {
    "username": "root",
    "password": "<Any password>",
    "database": "Flight_Search_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }}
```

- Once you've added your db config as listed above, go to the src folder from your terminal and execute `npx sequalize db:create`

- Then execute `npx sequelize db:migrate`


# Input and Result
![Input](https://github.com/schandu-eng/qoala-task-saurav/assets/76427228/e2ed7ef4-6001-4813-9472-331d3581b9dc) 
![Postman](https://github.com/schandu-eng/qoala-task-saurav/assets/76427228/e874a001-a6f3-493d-8e59-bd5c291ea64b) 
![DB writing](https://github.com/schandu-eng/qoala-task-saurav/assets/76427228/744c152c-3288-4aee-9c39-337affd9ce9c)
