import express from "express";

const app = express();

const date = new Date().getDay()
console.log(date)
let day;

// Get the current UTC time
const currentUTC = new Date().toUTCString();

// Create a Date object for the current time
const currentTime = new Date(currentUTC);

// Define the allowed time window
const allowedHours = 2; // You can change this to your desired range

// Calculate the UTC time for the current time plus and minus the allowed hours
const maxTime = new Date(currentTime);

console.log(currentTime, currentUTC)

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
    res.json({
        slack_name: req.query.slack_name || "Dandy Joshua",
        current_day: day,
        utc_time: new Date().toUTCString(),
        track: req.query.track || "Backend",
        github_file_url:"j",
        github_repo_url: "https://github.com/DandyJoshua14/HNG-Backend-Task-1",
        status_code: 200
})
    definePath(req.path)
})


    const listener = app.listen(3000, () => {
        console.log("Application is listening on port " + listener.address().port);
    })
export default app