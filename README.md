
SERVER ROUTES

--- Base URL /products ---
HTTP METHOD  | Route                              | Description                  | JSON
-------------| -----------------------------------| ---------------------------- | ----- |
GET          | `/getAllProducts`                  | All Products list            |
GET          | `/:id`                             | Get Poduct Details by Id     |
POST         | `/NewProduct`                      | New product                  |
PUT          | `/edit/:id`                        | Edit Products by Id          |
DELETE       | `/delete/:id`                      | Delete Products by Id        |
--- Base URL /recipes ---
HTTP METHOD  | Route                              | Description                  | JSON
-------------| -----------------------------------| ---------------------------- | ----- |
GET          | `/getAllRecipes`                   | All Recipes list             |
POST         | `/NewRecipe`                       | New Recipe                   |
GET          | `/:id`                             | Get Recipe Details by Id     |
PUT          | `/edit/:id`                        | Edit Products by Id          |
DELETE       | `/delete/:id`                      | Delete Products by Id        |
--- Base URL /Auth ---
HTTP METHOD  | route                              | Description                     | JSON
-------------| -----------------------------------| ----------------------------    | ----- |
POST         | `/signup`                          | Signup user                     |
POST         | `/login`                           | Login user                      |
GET          | `/verify`                          | Verify Auth token               |
GET          | `/:id`                             | Get user Details by Id          |
PUT          | `/edit/:id`                        | Edit profile by Id (user/admin) |
DELETE       | `/delete/:id`                      | Delete user by Id  (admin)      |
GET          | `/role/:id`                        | Edit user roles (admin)         |
