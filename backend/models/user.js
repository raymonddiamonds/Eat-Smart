var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
	name: String,
	quantity: Number
})

var UserSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String, },
  location: String,
  budget: Number,
  pantryitems: [IngredientSchema]
})

UserSchema.plugin(passportLocalMongoose); //this takes the passport local mongoose package we required and add a bunch of method that comes with the package into our schema

module.exports = mongoose.model("User", UserSchema);
