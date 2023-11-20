const app = require('./app.js')
const config = require('./utils/config.js')

// Start the server
const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servers running on port ${PORT}`);
});