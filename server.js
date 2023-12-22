//create HTTP Server

//import http module
const http = require("http");
const url = require("url");

//create HTTP server
const server = http.createServer((req, res) => {
  //find http req method
  // console.log("type of req is ",req.method)
  //find path of url
  // console.log("path of URL is ",req.url)
  //find query params
  //  console.log(url.parse(req.url,true).query)

  //get req handler
  if (req.method === "GET") {
    if (req.url === "/users") {
        res.end('All users')
    }
    if (req.url === "/products") {
        res.end("All products")
    }
  }
  //post req handler
  if (req.method === "POST") {
    if (req.url === "/create-user") {
        res.end("User created")
    }
    if (req.url === "/create-product") {
        res.end('Product created')
    }
  }
  //put req handler
  if (req.method === "PUT") {
    res.end("User modified")
  }
  //delete req handler
  if (req.method === "DELETE") {
    res.end("User deleted")
  }
});
//assgin a port number to server
server.listen(4500, () => console.log("server running on port 4500.."));
