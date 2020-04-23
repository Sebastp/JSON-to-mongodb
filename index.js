const mongoose = require('mongoose')
const models = require('./mongo/game.model.js')
const fs = require('fs')
import { Types } from 'mongoose'

const MONGODB_URL = 'MONGODB URL STRING'

mongoose
  .connect(MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB')

    fs.readFile('FILE PATH STRING', 'utf8', (err, data) => {
      const postsArr = JSON.parse(data)
      console.log('opened file')

      for (var i = 0; i < postsArr.length; i++) {
        const currPost = postsArr[i]
        if (
          currPost.post_type == 'question' &&
          currPost.post_content &&
          currPost.post_content.length &&
          currPost.post_status == 'publish'
        ) {
          const newRecord = new models.Game({
            _id: new Types.ObjectId(),
            oldId: currPost.ID,
            topics: [],
            name: currPost.post_name.trim(),
            description: currPost.post_title.trim(),
            answer: currPost.post_content.trim(),
            usersKnewAnswer: 0,
            usersDidntKnowAnswer: 0,
            votesBalance: 0,
            type: 'trivia',
            createdAt: new Date(currPost.post_date).toISOString(),
          })
          console.log(newRecord)

          newRecord.save().catch((err) => {
            console.log('err newRecord; ', err)
            throw new ApolloError('Something went wrong')
          })
        }
      }
    })
  })
  .catch((err) => {
    console.error(err)
  })
