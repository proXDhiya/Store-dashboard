// Initialize dotenv
require('dotenv').config();

// Load express config file
const app = require('./config/express/express.config');

// set health check route
app.use('/health', require('./config/health/health.config'));

// Start server
const port = app.get('port');
app.listen(port, () => console.log(`Server listening on port ${port}`));
