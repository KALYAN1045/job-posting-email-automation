# Job Posting and Email OTP Automation Backend

This is a Node.js and Express.js backend for job posting and email OTP automation. It allows companies to post jobs, register users, and send OTPs via email for user verification. The backend is integrated with MongoDB and Nodemailer for email sending.

# Deployment:
🔴 Not Recommended: Vercel is takng time to send mails via NodeMailer (Try on your own free time) [Deployed Link](https://job-posting-email-automation-58k7-821lfmgy5.vercel.app/)


## Features
- User Registration with Email and Phone OTP Verification
- Job Posting by Companies
- JWT-based Authentication
- Email Automation using Nodemailer

## Running the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/KALYAN1045/job-posting-email-automation.git
cd your-repository
```

### 2. Install Dependencies
Make sure you have Node.js installed, then install the dependencies for the project.

```bash
cd client
npm install

cd ..

cd server
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project in both fronend,backend and add the following environment variables:

Frontend .env:

```bash
REACT_APP_API_URL=http://localhost:5000
```

Start the Frontend server

```bash
cd ./client
npm start
```

Backend .env:

```bash
# Backend Server
PORT=5000

# Frontend port
FRONTEND=https://localhost:3000 

# MongoDB Connection URI (Local or Atlas)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.39cbm4z.mongodb.net/<dbname>?retryWrites=true&w=majority&appName=Cluster0
FRONTEND=http://localhost:3000

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret

# Email Configuration for Nodemailer (use Gmail App password after creating 2FA )
# App password Demo: https://www.youtube.com/watch?v=MkLX85XU5rU&pp=ygUkaG93IHRvIGNyZWF0ZSBhbiBnb29nbGUgYXBwIHBhc3N3b3Jk
EMAIL=your-email@gmail.com
PASSWORD=your-email-password(App passowd)
```

### 4. Run the Backend Server

```bash
cd ./server
npm start
```

This will start the server on `http://localhost:5000`.

### 5. API Endpoints

- **POST** `/api/auth/register` - Register a new user and send OTPs.
- **POST** `/api/auth/verify-email-otp` - Verify the email OTP.
- **POST** `/api/auth/verify-phone-otp` - Verify the phone OTP and authenticate the user.
- **POST** `/api/jobs` - Post a new job (authentication required).

### 6. Test the Application

You can use a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to send requests to the API. Below are some example requests:

#### Register a User
```bash
POST http://localhost:5000/api/auth/register
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "companyName": "Acme Corp",
  "employeeSize": "50"
}
```

#### Verify Email OTP
```bash
POST http://localhost:5000/api/auth/verify-email-otp
{
  "email": "john.doe@example.com",
  "emailOtp": "123456"
}
```

#### Verify Phone OTP
```bash
POST http://localhost:5000/api/auth/verify-phone-otp
{
  "phone": "1234567890",
  "phoneOtp": "123456"
}
```

## Screenshots:
![Screenshot 2024-10-19 235840](https://github.com/user-attachments/assets/faf8bb17-392a-407a-aa80-1885f7dd7361)
![Screenshot 2024-10-19 235921](https://github.com/user-attachments/assets/4166e1dc-bc8e-4015-ad3b-af8da551300e)
![Screenshot 2024-10-19 235830](https://github.com/user-attachments/assets/b774c3b0-3d24-4b3e-8815-079a230d43ab)
![Screenshot 2024-10-19 235708](https://github.com/user-attachments/assets/91ca5cb0-97b2-457e-acc5-78563f062e6b)

