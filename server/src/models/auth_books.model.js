import mongoose from 'mongoose'


const AuthBookSchema = mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Author'
  },
  bookId: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'Book'
  }
})

export default mongoose.model('AuthBook', AuthBookSchema)