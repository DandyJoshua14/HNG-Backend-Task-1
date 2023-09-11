import express from "express";

const app = express();

const date = new Date().getDay()
console.log(date)
let day;

const utd = new Date().getUTCDate()
console.log("UTC: ", utd)
function validateUTC() {
    const currentUTC = new Date().getTime();
    const twoMinutesInMilliseconds = 2 * 60 * 1000; // 2 minutes in milliseconds
    const minAllowedTime = currentUTC - twoMinutesInMilliseconds;
    const maxAllowedTime = currentUTC + twoMinutesInMilliseconds;
    const currentTime = new Date().getTime();
    return currentTime >= minAllowedTime && currentTime <= maxAllowedTime;
  }

function definePath(path) {
    console.log(`You are now using the ${path} route`)
}

switch (date) {
    case 0:
        day = "Sunday"
        break;
    case 1:
        day = "Monday"
        break;
    case 2:
        day = "Tuesday"
        break;
    case 3:
        day = "Wednesday"
        break;
    case 4:
        day = "Thursday"
        break;
    case 5:
        day = "Friday"
        break;
    case 6:
        day = "Saturday"
        break;
    default:
        day = "Today is a great day"
        break;       
}


                
app.get("/api", (req, res, next) => {
    const slack_name = req.query.slack_name || "Dandy Joshua"
    const current_day = day
    const utc_time = new Date()
    const track = req.query.track || "Backend"
    const github_file_url = "https://github.com/DandyJoshua14/HNG-Backend-Track/blob/main/index.js"
    const github_repo_url = "https://github.com/DandyJoshua14/HNG-Backend-Track.git"
    const status_code = 200
    const isUTCValid = validateUTC();
    
  if (!isUTCValid) {
    res.status(500).json({ error: "UTC time is not within the specified range." });
  } else {
    res.json({
      slack_name,
      current_day,
      utc_time,
      track,
      github_file_url,
      github_repo_url,
      status_code
    });
  }
       
    definePath(req.path)
})


    const listener = app.listen(3000, () => {
        console.log("Application is listening on port " + listener.address().port);
    })
export default app