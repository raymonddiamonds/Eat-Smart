const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const IngredientSchema = new Schema({
	name: String,
	quantity: Number
})


const PantrySchema = new Schema({
	username: { type : String , unique : true, required:true},
	password: {type:String, required:true},
	location: String,
	budget: Number,
	pantryitems: [IngredientSchema]
});
//pantryItems contains subdocuments -> schema objects


const Pantry = mongoose.model('Pantry',PantrySchema);
//every time this coder makes a new pantry, make it in the colletion pantry with the PantrySchema

module.exports = Pantry;
//var myPantry = new Pantry({});