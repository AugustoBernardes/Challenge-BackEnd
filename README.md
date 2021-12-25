# [Mestres da web](https://mestresdaweb.com.br) Challenge

>Status: Finished ✔️

### That's a challenge created by Mestres da web, and this is my code solving this problem 💡 Objective was to create a movie theater sistem using NodeJs.
---
## Sistem functions 
+ Validate login, and create a JWT token
+ Validate data received with JOI
+ Add a new movie
+ Delete movie
+ Update movie status
+ Save a image on a cloud service
---
## Routes

+ GET - /newmovies  ```(Receive a JSON with all the new movies added)```
+ GET - /aprovedmovies  ```(Receive a JSON with all the aproved movies)```
+ POST - /login   ```(Make the login and create a JWT token)```
+ POST - /update/:id   ```(Update the status of the movie to aproved)```
+ POST - /addmovie   ```(Add movie on data base)```
+ DELETE - /remove/:id  ```(Remove movie from database)```
---
## Observations 
+ Challenge [Read.me](https://github.com/Mestres-da-Web/desafio-backend-pleno)
+ To dowload the packages use NPM install
+ You can change the NPM start to node instead nodemon
+ Don't forget to change the file (.env_example) to (.env )
+ On .env put all your variables 
+ Server will run in localhost !
+ [Video](https://youtu.be/K4Ed9e4aH-c) explaining the sistem working
---
## Technologies Used:

+ [NodeJs](https://nodejs.org/en/)
+ [MongoDB](https://docs.mongodb.com)
+ [Jwt](https://jwt.io)

---
# Dependencies
```bash
  $ npm install body-parser
  
  $ npm install mongoose

  $ npm install nodemon
  
  $ npm install dotenv
  
  $ npm install express
  
  $ npm install cloudinary
  
  $ npm install cookie-parser
  
  $ npm install cors
  
  $ npm install joi
  
  $ npm install jsonwebtoken
  
  $ npm install multer
```
---

<h2 align='center'>author</h2>
<div align='center'>
  Made with ❤️ by <a href="https://github.com/AugustoBernardes">Augusto</a>
</div>
