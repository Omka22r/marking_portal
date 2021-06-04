### Marking Portal

## Development STACK used:  React JS | Mongo DB | Node JS

##### Description

React Single page web application allows students to log in and submits answers to their assignments.Once an assignment is submitted it is visible to Instructor for grading it. After Instructor submits the grade students can view the score by logging In.

##### Steps to run the application locally:

1) Clone this git repo.
2) Make sure in the master branch.
3) In the root directory run command "docker-compose up --build".
4) Above command should start the application frontend at localhost:3000.

##### Features Done:

- Using React JS for the frontend.
- Using Node JS for the backend.
- Using Mongo DB Database.
- Creating 2 separate views for Instructor and Students.
- Dockerized the application to run it locally.
- When the application is initiated it creates 1 Instructor and 3 Student type users. All the 3 students are assigned 3 assignments with one question in each assignment.
- When a new Student is registered by the instructor 3 assignments with 3 questions in each assignment are assigned to the new student. 

##### Bonus Features Done:

- Authentication for Students and Instructors works.
- Also, Instructors as admins can add new students.
- Automatically send an email when all assignments of a student are graded.

###### Note: Send Email Button does not work instead email is automatically sent to "osidhu2@bcit.com" when all the assignments are graded.

