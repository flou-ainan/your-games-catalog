[`⬅ BACK`](./)

**Endpoints**

## USER routes

### Register
>Atempts to register a new user to the database with info provided on request body

Route: `dress/user/register`\
Method: POST

Request JSON Model:
```JSON
{
    "email":"user-email",
    "name":"user-name",
    "password":"user-password"
}
```
Response: a JWT
___
### Login
>Atempts to login testing Req info within database user info

Route: `dress/user/login`\
Method: POST\
JSON Model:
```JSON
{
    "email":"user-email",
    "password":"user-password"
}
```

3 - adress/user/edit         : PATCH

4 - adress/user/delete       : DELETE


### GAME routes


1 - adress/game/list         : GET

2 - adress/game/new          : POST

3 - adress/game/edit         : PATCH

4 - adress/game/id           : GET

5 - adress/game/delete       : DELETE
```