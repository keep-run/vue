/**
 * Created by wang on 2017/7/5.
 */
var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    publisher: String
});
mongoose.model('books',BookSchema);