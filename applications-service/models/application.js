const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema(
  {
    company: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    path: String,
    href: String
  },
  {
    timestamps: true
  }
);

mongoose.model('Applications', ApplicationSchema);
module.exports = mongoose.model('Applications');
