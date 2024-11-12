var express = require("express");
var cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  const name = req.file?.originalname;
  const type = req.file?.mimetype;
  const size = req.file?.size;

  if (req.file) {
    res.json({
      name: name,
      type: type,
      size: size,
    });
  } else {
    res.json({ message: "Error no file uploaded." });
  }

  next();
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
