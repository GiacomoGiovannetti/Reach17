# Reach 17

## Node.Js Project by Giacomo Giovannetti

### REST API for an education provider

## :bookmark_tabs: Index

- [About the project](#floppy_disk-about-the-project)
- [Installation](#inbox_tray-installation) 
- [API Documentation](#mag-api-documentation) 
- [Libraries](#books-libraries) 
- [License](#page_facing_up-license) 
- [Issues](#warning-issues) 
- [Contact Me](#email-contact-me)

## :floppy_disk: About the project
The scope of this project was to create an API to organize and recall the courses provided by the name of the course , the course type or the university in which it takes place. 
The API is based on 3 Schemas: 
- Course type -> defines the type of the course
- University -> contains the name of the University
- Course -> data of the course : name , type, universities that provide it. 

Using the correct [endpoints](#mag-api-documentation) you can Create, Read, Update or Delete (CRUD). Using queries is possible to search through the courses. 

For this course were used Node.Js with Express.Js framework and MongoDB as database. 


## :inbox_tray: Installation

In order to install the API Node.Js is required and you may need an online Database, i suggest MongoDB Atlas. 

- You don't have  Node.Js ? No problem, download it here: [Node.Js](https://nodejs.org/en/download).

- Need an online Database ? Login of create an account on [MongoDB Atlas ](https://www.mongodb.com/atlas/database), create your database, go to Connect -> Drivers and save the connection string provided we will need it later.

After those steps you are all set up

### 1 - Clone the repository 

```
git clone https://github.com/GiacomoGiovannetti/Reach17.git
```

### 2 -  Install the dependencies 
```
npm install
```

### 3 - Start the server
```
npm start
```
or run it in development mode:
```
npm run dev
```

### 4 - Connect to your MongoDB 
If it doesn't exist create a `.env` file and insert the environment variables, there is a `.env_example` to help you do it. 

### 5 - Test it with a client
You can use something like Postman([download it here!](https://www.postman.com/downloads/)) or Insomnia, to begin to use the API, simply by typing: 
```
localhost:8081/desiredEndpoint
```

## :mag: API documentation
### Course Type

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| POST| /api/coursetype/ | create a new course type | 
| PATCH | /api/coursetype/:id | modify a course type |
| DELETE | /api/coursetype/:id | delete a course type |
| GET | /api/coursetype/ | get all course types |
| GET | /api/coursetype/:id | get a single course type |

### University

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| POST| /api/university/ | create a new university | 
| PATCH | /api/university/:id | modify a university |
| DELETE | /api/university/:id | delete a university |
| GET | /api/university/ | get all universities |
| GET | /api/university/:id | get a single university |

### Course

| Method | Endpoint | Result |
| ------ | -------- | ------ |
| POST| /api/course/ | create a new course | 
| PATCH | /api/course/:id | modify a course |
| DELETE | /api/course/:id | delete a course |
| GET | /api/course/ | get all courses |
| GET | /api/course/:id | get a single course |
| GET | /api/course/pertype/:typeId | get all courses of a type |
| GET | /api/course/peruniversity/:universityId | get all courses of a university |
| GET | /api/course/pertypeanduniversity/:typeId/:universityId | get all courses of a type in a university |

## :books: Libraries
- [Express.Js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Http-Status-Codes](https://github.com/prettymuchbryce/http-status-codes#readme)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [Validator.js](https://github.com/validatorjs/validator.js)
- [Morgan](https://github.com/expressjs/morgan#readme)
- [Helmet](https://helmetjs.github.io/)
- [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize#readme)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest#readme)

## :page_facing_up: License

- [MIT](https://choosealicense.com/licenses/mit/)

## :warning: Issues

At the moment the project should run without problems. In case you find some issues let me know!


## :email: Contact me

- My Linkedin Profile: [Linkedin](https://www.linkedin.com/in/giacomogiovannetti/)

- My email if you have any questions: giovannettii.giacomo@gmail.com