# LoginApplication

### Technologies used:
- Angular for frontend
- Java Spring Boot for backend
- MySQL for database

### Database Setup
- Start your MySQL server
- Navigate to project directory where loginApp.sql is located: `cd [Project Directory]`
- Run the following cmd to create and populate the database:
`mysql -u [Your Username] -p loginApp < loginApp.sql`

### Run App
Backend:
- `cd demo`
- Build project: `mvn clean install`
- Start backend server: `./mvnw spring-boot:run`

Frontend:
- `cd login-app`
- Start frontend server: `ng serve --open`