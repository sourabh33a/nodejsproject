use("curdDB")

// db.createCollection("courses1")

// db.courses1.insertMany([
//     {
//       "name": "webdevvv",
//       "type": "advance",
//       "duration": "1 month"
//     },
//     {
//       "name": "webdevvv",
//       "type": "premium",
//       "duration": "3 months"
//     },
//     {
//       "name": "webdevvv",
//       "type": "trial",
//       "duration": "7 days"
//     },
//     {
//       "name": "webdevvv",
//       "type": "enterprise",
//       "duration": "1 year"
//     }
//   ]
//   )
//   let a = db.courses1.findOne({type:"premium"})

//   console.log(a)

// db.courses1.updateOne({duration:"1 month"},{$set:{duration:"2 months"}})
db.courses1.deleteOne({duration:"1month"})