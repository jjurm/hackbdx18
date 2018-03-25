import express from "express"
import {GenericMsg} from "../messages";
import {processDfRequest} from "./dialogflow";
import bodyParser = require("body-parser");

let app = express();
let router = express.Router();

app.use(bodyParser.json());


/*const static_files = ["bundle.js", "style.css"];
for (let file of static_files) {
    router.get("/" + file, (req, res) => {
        res.sendFile(file, {root: __dirname})
    });
}*/
router.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname + "/.."})
});
router.get('/test', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
});

router.post("/dialogflow", (req, res) => {
    let request = req.body;
    console.log(request);
    let response = processDfRequest(request);
    console.log(response);
    res.json(response);
});

app.use('/', router);
app.use("/", express.static("src"));

export default app
