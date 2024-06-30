const connectDB = require('./db'); 
connectDB().then(() => {
    console.log('Connection successful!');

  }).catch(error => {
    console.error('Connection failed:', error.message);
  });
  
