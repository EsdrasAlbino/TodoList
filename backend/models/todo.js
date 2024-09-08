import mongoose from "mongoose"

const todoSchema = mongoose.Schema({
  todoName: String,
  isComplete: Boolean,
  description: String,
  responsible: String,
  category: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString()
  },
  updatedAt: {
    type: Date,
    default: new Date().toISOString()
  }
})

export default mongoose.model('Todo', todoSchema)