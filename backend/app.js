// Initialize dotenv
require('dotenv').config();

// Load express config file
const app = require('./express.config');

// Start server
const port = app.get('port');
app.listen(port, () => console.log(`Server listening on port ${port}`));
