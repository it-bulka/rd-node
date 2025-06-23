# Folder-based Router (à la Next.js App Router)

This project implements a file system-based router similar to the Next.js App Router, built with plain Node.js.

## Installation
```bash
git clone https://github.com/it-bulka/rd-node
cd hw-2
npm install
```

## Start
```
npm run start
```

## Structure

- All route handlers are located in the `routes/` directory.
- Each subdirectory adds a segment to the URL path.
- A `route.js` (or `route.ts`) file within that directory is the final handler for that path.

Example:
```
routes/
├── books/
│ ├── route.js → GET /books
│ └── [id]/ → dynamic id parameter
│ └── route.js → GET /books/42
```

**Folders named with square brackets (e.g. `[id]`) indicate dynamic parameters.**

> Example: `/books/[id]/route.js` → `GET /books/42`

**Important:** Within a single route path, all dynamic segment names must be unique.

## HTTP Layer & Route Handling

- Each `route.js` (or `route.ts`) file exports functions for HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE`.  
  Any HTTP method not exported will automatically return a **405 Method Not Allowed** response.

- In a route file, you should only handle the HTTP layer:
    - **Parse the request** (body, query parameters, etc.)
    - **Call the appropriate service** for business logic/data processing
    - **Formulate and send the response** back to the client

- All data operations (CRUD) are handled in the `/services/*.js` (or `/services/*.ts`) files.  
  These operations read from and write to a `db.json` file.

### Allowed Methods via file routes.js(ts)
    'GET', 'POST', 'PUT', 'PATCH', 'DELETE'

### Method Enhancements

For convenience in requests methods, the request object (`req`) is augmented with additional properties:
- `body`
- `prams`
- `query`
- `answer`

##### Details:
- **params**:  
  An object that contains dynamic route parameters.  
  _Example_: `{ id } = req.params `

- **query**:  
  A string representation of the search parameters.  
  _Example_:
    `console.log(req.query) // "name=smth"`

- **answer**:  
  A helper function for sending responses to the client. Its signature is:
  ```js
  (statusCode: number, data: any) => void
  ```
  _Example_: 
    ```js
      res.answer(200, "book name")
    ````
  Method `answer` replaces duplication the following code via project:
    ```js
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = statusCode
    res.write(JSON.stringify(dataToSend))
    res.end()
    ```
  
#### Method Example in route.js

```js
export const GET = (req, res) => {
  const { id } = req.params;  // Dynamic URL parameter
  const query = req.query;    // Query string

  // Example: GET /books/42?name=John
  console.log(`Book ID: ${id}`);
  console.log(`Query: ${query}`);

  return req.answer(res, 200, { message: `Book with ID ${id}, query: ${query}` });
};
```


## Available Endpoints
> **Note:** The list below includes only the currently implemented endpoints.  
> You are free to add more by the folder and file naming rules described in the project structure.

### GET /books
- **Description**: Returns a list of books.

### GET /books/:bookId
- **Description**: Returns a book with `bookId`.
- **Path Parameters**: <br>
 `bookId` – ID of the book (string or number)

### POST /books
- **Description**: Creates a new book.
- **Body**:
  ```json
  {
    "title": "string",    // required
    "author": "string"    // required
  }
  ```
  
### DELETE /books/:bookId
- **Description**: Delete a book with `bookId`.
- **Path Parameters**: <br>
  `bookId` – ID of the book (string or number)




