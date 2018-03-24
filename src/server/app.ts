import express from "express"

let exp = express();
let router = express.Router();

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

exp.use('/', router);
exp.use("/", express.static("src"));

export default exp
