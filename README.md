
SERVER ROUTES

--- Base URL /products ---
HTTP METHOD  | Route                              | Description                  | JSON
-------------| -----------------------------------| ---------------------------- | ----- |
GET          | `/getAllProducts`                  | All Products list            |
GET          | `/:id`                             | Get Poduct by Id             |
GET          | `/owner`                           | Get Poduct by owner          |
POST         | `/NewProduct`                      | New product                  |
PUT          | `/edit/:id`                        | Edit Products by Id          |
PUT          | `/updateStock/:id`                 | Product Stock                |
DELETE       | `/delete/:id`                      | Delete Products by Id        |
--- Base URL /recipes ---
HTTP METHOD  | Route                              | Description                  | JSON
-------------| -----------------------------------| ---------------------------- | ----- |
GET          | `/getAllRecipes`                   | All Recipes list             |
GET          | `/owner`                           | Get Recipes by owner         |
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
--- Base URL /upload ---
HTTP METHOD  | route                              | Description                     | JSON
-------------| -----------------------------------| ----------------------------    | ----- |
POST         | `/image`                           | Image with Cloudinary           |
--- Base URL /cart ---
HTTP METHOD  | route                              | Description                         | JSON
-------------| -----------------------------------| ----------------------------        | ----- |
POST         | `/createCart`                      | Create cart                         |
GET          | `/getCart/:cart_id`                | Get cart by id                      |
PUT          | `/editQuantity/:cart_id`           | Edit  quantity of products by de ID |
DELETE       | `/delete/:cart_id`                 | Delete user by Id  (admin)          |