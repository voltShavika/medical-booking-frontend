## Medical Booking Frontend

#### Installation

- `npm install`
- `npm run dev`
- Backend is linked in `api.js`, you change change the baseURL


There are following routes

- / -> login
- /register -> registration
- /dashboard
- /book-appointment
- /edit-appointment
- /doctors


Following are protected url, login is need otherwise redirected to login page

- dashboard
- book-appointment
- edit-appointment
- doctors


To Book appointment

1. Select doctor name
2. Available dates in next 7 days will be shown
3. Selected Date
4. Available time slots will be shown, Each time slot is 1 hour long
