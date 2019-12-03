const http = require ('http') ; 

const port = process.env.PORT || 3000  

const server = http.createServer((req, resp) => {
  resp.statusCode = 200 
  resp.setHeader('Content-Type', 'text/html') ; 
  resp.end('<h1>Hello World</h1>') ; 
    }); 
    
    server.listen(port, () => {
      console.log(`Server is running at port` + port) ; 
      }) ; 
