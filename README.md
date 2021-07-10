# TODAY - Frontend

## Background

The idea sparked from how I got through an intense coding bootcamp. It was mentally and emotionally challenging for 17 weeks. I often found myself writing to destress and then writing a list of steps to follow to organize my brain. I built an app that combines the tools that have been useful to me throughout the program. This is an app that lets a user post check-ins/blogs and lets a user create multiple lists. (Plus a bonus lofi playlist you could listen to :)

I named my app "Today", because it was a matter of getting things done, TODAY.

## Screenshots

#### Sign Up
![Sign Up](https://github.com/gamil91/today-frontend/blob/main/src/images/signUp.png)

#### Check In
![Check In](https://github.com/gamil91/today-frontend/blob/main/src/images/checkIn.png)

#### Home
![Home](https://github.com/gamil91/today-frontend/blob/main/src/images/home.png)

#### All Blogs
![All Blogs](https://github.com/gamil91/today-frontend/blob/main/src/images/allBlogs.png)

#### To-Do List
![To-Do List](https://github.com/gamil91/today-frontend/blob/main/src/images/toDoList.png)


## Technology Used

- Ruby on Rails
- Javascript
- React
- React Router
- Redux
- JSON Web Token
- React Bootstrap
- JSX
- CSS

## Features & Highlights

- Create, Read, Update, and Delete a User
- Create, Read, Update, and Delete a Blog
- Create, Read, and Delete a Like
- Create, Read, Update, and Delete a Comment
- Create, Read, Update, and Delete a List
- Create, Read, Update, and Delete a Task

#### Log In/Sign Up/Update User Profile

- A user signs up with a name, email, password, and a password confirmation.
- A user has to have a unique email.
- Log in validates email and password match an entry in the database.
- Log in and Sign up provide user a token and store it in local storage. 
- If logged in, token handles refresh to keep the user logged in.
- User is able to update their name and password.

#### Check-ins/Blogs

- A user can post check-ins/blogs.
- A user can choose to upload a photo along with their post.
- When a user uploads a picture, the image file is then sent to a third party image management platform, called Cloudinary.
- Cloudinary will respond back with a URL of the uploaded image and the URL will be store in the database.
- A user can choose between posting a check-in/blog publicly or privately.
- A user can either edit or delete a check-in/blog after it is posted.
- A user can view all public check-ins by other users.
- A user can view all public check-ins by a specific user by cicking on other user's name.  

#### Likes/Comments

- A user can like or unlike public check-ins.
- A user can post a comment on public check-ins. 
- A user can either edit or delete a comment after it is posted.

#### To-do Lists

- A user can create multiple lists.
- A user can edit or delete a list after it is posted.
- A user can create tasks under each list.
- A user can edit or delete a task after it is posted.
- A user can mark a task done by checking the checkbox.
- A user can drag and drop a task to move a task within that list.
- A user can also move a task from one list to another.
- A user can also change the positions of the lists through drag and drop.

#### Misc

- A random advice is rendered in the home page. This is being fetched from a third party API (adviceslip.com)
- When the user clicks on Tunes on the Nav Bar, a soundcloud widget autoplays a lofi-playlist.
- This widget is draggable throughout different screens under /home route.

## Installation

#### Backend

https://github.com/gamil91/today-backend

- bundle install
- rails db:migrate
- rails db:seed
- rails s

#### Frontend

- npm install
- npm i react-router-dom
- npm i react-redux
- npm i redux-thunk
- npm i draggable
- npm i react beautiful dnd
- npm i react-bootstrap bootstrap
- npm i @fortawesome/react-fontawesome
- npm start

### Video Demo

https://www.loom.com/share/6388589da57b45b2ada143489c40fc9b?sharedAppSource=personal_library

### Site

https://today-fe.herokuapp.com/login

