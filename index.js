import express from "express";
import {v4 as uuidv4} from 'uuid'
import { connect } from "./models.js";
import { User } from "./models.js";
connect();
const app = express();
const date = new Date().getDay()
let day;
let id = uuidv4()
const utd = new Date().getUTCDate()
console.log("UTC: ", utd)
console.log(date)
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




app.use(express.json())
app.get("/api", (req, res, next) => {
    const currentDate = new Date();
const year = currentDate.getUTCFullYear();
const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
const newday = String(currentDate.getUTCDate()).padStart(2, '0');
const hours = String(currentDate.getUTCHours()).padStart(2, '0');
const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
const formattedDate = `${year}-${month}-${newday}T${hours}:${minutes}:${seconds}Z`;    
const slack_name = req.query.slack_name || "Dandy Joshua"
const current_day = day
const utc_time = formattedDate
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

app.post('/api', async(req, res, next) => {
    if (req.body && req.body.username && req.body.password && req.body.firstname && req.body.lastname && req.body.phone && req.body.DOB && req.body.email && req.body.gender && req.body.address) {
    const { username, password, firstname, lastname, DOB, email, gender, address, phone } = req.body;
    // console.log(username, password, firstname, lastname, DOB, email, gender, address, phone);
    const user = await User.create({
      id, username, password, firstname, lastname, DOB, email, gender, address, phone
    })
    user.save()
    res.json({ message: "User successfully created", details: { id, username, password, firstname, lastname, DOB, email, gender, address, phone } });
  } else {
    res.status(500).json({ message: "An error occurred. Make sure you have all details filled" });
  }
})

app.get('/api/:user_id', async(req, res, next) => {
  const user = await User.findOne({phone: req.params.user_id})
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user });

})


// Update an existing user by user ID
app.put('/api/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body; // The updated data for the user

    // Use the updateOne method to update the user by ID
    const result = await User.updateOne({ phone: userId }, { $set: updatedData });
    
    if (result.nModified === 0) {
      return res.status(404).json({ message: 'User not found or no changes were made'});
    }
     
    res.json({ message: 'User updated successfully',  });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


    const listener = app.listen(3000, () => {
        console.log("Application is listening on port " + listener.address().port);
    })
export default app