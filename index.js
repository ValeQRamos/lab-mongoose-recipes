const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then( () => {

    const vegan = new Recipe({
      title: 'Green Power',
      level: 'Easy Peasy',
      ingredients: ['bananas','mango','pineapple chunks','spirulina powder'],
      cuisine: 'International',
      dishType: 'drink',
      duration: 2,
      creator: 'Scott Jurek',
      created: '05/22/2015'
    })
    vegan.save()
    console.log(`Recipe: ${vegan.title}`)
    return Recipe.insertMany(data)
  })
  .then( allRecipies => {
    return allRecipies.forEach(recipe =>{console.log(`Recipe: ${recipe.title}`) })
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:100})
  })
  .then(() => {
    console.log('the rigatoni recipe is correct now')
    return Recipe.deleteOne({title:'Carrot Cake'})
  })
  .then(() => {
    console.log('Carrot Cake removed')
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
