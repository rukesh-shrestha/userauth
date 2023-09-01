
# User Authentication
User  Authentication and Authorization API.

### Feature
- User can register/signin from google account.
- Email verification.
- Resetting password.
- Custom user registration & signin.
- Three user role.
- Role based permission.






## Run Locally

Clone the project

```
git clone git@github.com:rukesh-shrestha/userauth.git userauth
```
or
```
git clone https://github.com/rukesh-shrestha/userauth.git userauth
```

Go to the project directory

```bash
  cd userauth
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Before starting the serving add the below mention environmental variables. 


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DATABASE_CONNECTION_STRING`

`SESSION_SECRET_KEY`

`EMAIL_HOST`

`EMAIL_AUTH_USER`

`EMAIL_AUTH_PASSWORD`

`EMAIL_PORT`

`DOMAIN_NAME`

After adding the above mention variables. Now you can start the server. 

Start the server

```
npm run dev
```
## API Reference

#### Sign Up User

```http
  POST /api/1.0.0/users/auth/signup
```

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email address |
| `firstname` | `string` | **Required**. Your first name |
| `lastname` | `string` | **Required**. Your last name |
| `password` | `string` | **Required**. Your password |
| `confirmpassword` | `string` | **Required**. re-type password |


Response
- Email Verification send `200 - success`
- User Already Exist `400 - Error`
- Password do not match `401 - Validation Error`

#### Sign In User

```http
  POST /api/1.0.0/users/auth/signin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. Your email address |
| `password` | `string` | **Required**. Your password |



Response
- Token `200 - success`
- User not authorized [password or email doesnot match] `401 - Validation Error`




## Authors

- [@Rukesh Shrestha](https://shrestharukesh.com.np)
