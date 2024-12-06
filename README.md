# QA Mastery  

## Description  
User management project focused on QA with Cypress, Node.js/Express (Jest), MongoDB (Docker), and GitHub Actions for testing and code quality. 

Project developed as a study in the QA (Quality Assurance) subject of the Full-stack PUC Postgraduate Program and exported from the "all-studies" repository due to the use of Github Actions and its continuous integration.

---

## Technologies Used  
### Front-end  
- React  
- Cypress (for testing)  

### Back-end  
- Node.js  
- Express  
- Jest (unit and integration tests)  

### Database  
- MongoDB (Docker)  

### QA and CI/CD  
- Cypress  
- Jest  
- ESLint  
- GitHub Actions  

---

## Features  
- **User management (CRUD):** Create, view, update, and delete users.  
- **Comprehensive QA focus:**  
  - Front-end automated tests with Cypress.  
  - Back-end unit, integration, and system tests with Jest.  
  - Security and code quality analysis.  
  - Continuous integration with GitHub Actions.  

---

## How to Run the Project  

### Prerequisites  
Ensure you have the following installed:  
- Node.js (>= 16.x)  
- Docker and Docker Compose  

### Steps  

1. **Set up the environment:**  
   - Create a `.env` file with the necessary environment variables. Use `.env.example` as a reference.  

2. **Start MongoDB in Docker:**  
   - Start your MongoDB container using the following command:  
   ```bash
   docker run --name mongodb -d -p 27017:27017 mongo

3. Install dependencies:
    ```bash
    cd user-api
    npm install
    ```

    ```bash
    cd ../user-admin
    npm install
    ```

4. Run the application:
- backend and front-end
    ```bash
    run start

5. Access the application in your browser:
- Front-end: http://localhost:3000
- API: http://localhost:5000

---

## Testing
### Front-end Testing (Cypress)
Run automated front-end tests:
    ```bash
    npm run cypress

### Back-end Testing (Jest)
Run unit and integration tests:
    ```bash
    npm test

---

## CI/CD and Code Quality
This repository uses GitHub Actions for:
- Automated test pipelines.
- Security and code quality analysis with ESLint and other tools.

---

## Contributing
Feel free to open issues and submit pull requests. Contributions are always welcome!

---

## License
This project is licensed under the MIT License.
