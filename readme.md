# DevTinder API
authRouter
- POST / Signup
- POST / Login
- POST / Logout

profile router
- GET /Profile/view
- PATCH /Profile/edit
- PATCH /Profile/password

connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId


- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

- GET/connection
- GET/request/received
- GET/feed - Gets the feed 