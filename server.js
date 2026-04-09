const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.static("public"));
app.use(express.json());

let db = [];

if (fs.existsSync("data.json")) {
  db = JSON.parse(fs.readFileSync("data.json"));
}

app.post("/add", (req, res) => {
  const { userId, channel, role, date } = req.body;

  db.push({
    userId,
    channel,
    role,
    date: new Date(date).getTime()
  });

  fs.writeFileSync("data.json", JSON.stringify(db, null, 2));

  res.json({ msg: "تمت الإضافة ✔" });
});

app.post("/count", (req, res) => {
  const { userId, fromDate, role } = req.body;

  const from = new Date(fromDate).getTime();

  const result = db.filter(x =>
    x.userId === userId &&
    x.date >= from &&
    (!role || x.role === role) &&
    (x.channel === "1327591433024176148" || x.channel === "1327594383926624276")
  );

  res.json({ count: result.length });
});

app.listen(process.env.PORT || 3000);