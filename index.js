import {  express  } from "express";
import {  pkg  } from "body-parser";
import {  router  } from "./routes/router.js";


const app = express();
const { json, urlencoded } = pkg;
const PORT = 3000;

app.use(json());
app.use(urlencoded({extended: true}));

app.listen(PORT, function() {
    console.log(`Listening to port ${PORT}`);
});

app.use("/", router);