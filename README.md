# HNG-Backend-Task-1

### How to make request using this api

To begin you first need to know the available endpoints:
#### 1. /api
    This endpoint uses both the `POST` and `GET` method. The `POST` method can be used to create a new user, while the `GET` method can be used to get a list of details this repo, passing parameters of `slack_name` and `track` will give you customised responses based on the values you passed to the parameters.

    For the `POST` methos, you will need to have the following information passed as it will be necessary for the next endpoint:
    => username
    => password
    => firstname
    => lastname
    => DOB
    => email
    => gender
    => address
    => phone

    The phone number you will use will automatically be your ID. Make sure you start with your country's code (eg: +234).

### 2. /api/user_id
    This endpoint returns a specific user based on the user's ID which is the phone number a user used to create his/her account. Therefore in place of `user_id`, pass in your desired phone number