import http from "http";
import { IncomingMessage, ServerResponse } from "http";

function serverListener(req: IncomingMessage, res: ServerResponse) {
  res.write("Connect bot template"); //write a response to the client
  res.end(); //end the response
}

//create a server object:
http.createServer(serverListener).listen(8080); //the server object listens on port 8080
