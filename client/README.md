# cms-angular
* npm install
* yarn create strapi-app cms-angular_strapi --quickstart
* yarn develop


## create a token
https://blog.logrocket.com/how-to-create-an-api-with-strapi/
* download Documentation on plugins.

### Setting up permissions
Strapi has two roles by default that are used to control access to content: public and authenticated. 
The public role is for an unauthenticated user while the authenticated role is for — you guessed it — an authenticated use.
* /auth/local/register - registration of user
* /auth/local - authentication user

try to insert wrong pwd,exist user or too many attempts on /register.

here you can see the users:
* http://localhost:1337/admin/plugins/content-manager/collectionType/plugins::users-permissions.user


