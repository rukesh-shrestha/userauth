
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

`CONNECTION_DATABASE_STRING`

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

### User Signup

  #### /api/users/auth/signup `POST` 


| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email address |
| `firstname` | `string` | **Required**. Your first name |
| `lastname` | `string` | **Required**. Your last name |
| `password` | `string` | **Required**. Your password |
| `confirmpassword` | `string` | **Required**. Re-type password |


Response `ERROR`
- Missing Required Field `400`
- Invalid Email Found `400`
- User Already Exist `401`
- Password Do Not Match `400`
- Invalid Email Found `400`
- Password Must be Strong `400`

Response `SUCCESS`
- Verification Email Send `200`

### User Sign In

#### /api/users/auth/signin `POST`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. Your email address |
| `password` | `string` | **Required**. Your password |



Response
- Token `200 - success`
- User not authorized [password or email doesnot match] `401 - Validation Error`




## Authors

- [@Rukesh Shrestha](https://shrestharukesh.com.np)

