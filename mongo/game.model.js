import model from './model'
import { Schema, Types } from 'mongoose'

export const Game = model({
  name: 'Game',
  schema: {
    _id: {
      type: Schema.ObjectId,
      default: new Types.ObjectId(),
      required: true,
    },
    oldId: { type: String, trim: true, required: false },
    topics: [
      {
        type: String,
        lowercase: true,
        required: false,
      },
    ],
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    answer: { type: String, trim: true, required: true },
    usersKnewAnswer: { type: Number, default: 0, required: true },
    usersDidntKnowAnswer: { type: Number, default: 0, required: true },
    votesBalance: { type: Number, default: 0, required: true },
    affiliateUrl: { type: String, required: false },
    type: { type: String, lowercase: true, required: true },
    createdAt: {
      type: Date,
      default: new Date().toISOString(),
      required: true,
    },
  },
})
