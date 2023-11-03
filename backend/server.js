(
    () => {
        require('dotenv').config();
        require('./tracing');
        require('./app');
    }
)();
