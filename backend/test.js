const connectDB = require('./db'); 
connectDB().then(() => {
    console.log('Connection successful!');
    // You can add some code here to test database interactions if needed
  }).catch(error => {
    console.error('Connection failed:', error.message);
  });
  
