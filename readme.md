# REST API for working with a collection of contacts

## Commands to start the server:

- `npm start` - start server in production mode
- `npm run start:dev` - start server in development mode

## Endpoints for getting contacts :

    GET
    /contacts - get all contacts

> Query String:
>
> `page` - _integer, optional, default: 1_ - Specify which page to query.
>
> `limit` - _integer, optional, default: 20_ - Specify a quantity of items per page.
>
> `favorite` - _boolean, optional, default: false_ - Get only favorite items.

    GET
    /contacts/{contactId} - get a contact by id

    POST
    /contacts - add a new contact

    DELETE
    /contacts/{contactId} - delete a contact

    PUT
    /contacts/{contactId} - update a contact

    PATCH
    /contacts/{contactId}/favorite - add/remove a contact to/from the list of favorite contacts

## User authentication endpoints :

    POST
    /users/signup - Register a new user.

    POST
    /users/login - Log in an user.

    GET
    /users/logout - Log out the current user.

    GET
    /users/current - Get information about the current user.

    PATCH
    /users - Update a subscription of the current user. Available options: ['starter', 'pro', 'business'].

    PATCH
    /users/avatars - Update an avatar of the current user.

    GET
    /users/verify/:verificationToken - User email activation request.

    POST
    /users/verify - Request to resend an email with an account activation link.

## Schemas

### Contact Schema:

```js
{
  name: string().min(2).required(),
  email: string().email(),
  phone: string(),
  favorite: bool().default(false),
}
```

### User Schema:

```js
{
  email: string().required(),
  password: string().required(),
  subscription: string()
    .valid('starter', 'pro', 'business')
    .default('starter'),
  avatarURL: string()
    .required()
    .default(gravatar.url(email)),
  token: string().default(null),
  verify: bool().default(false),
  verificationToken: string().required(),
}
```
