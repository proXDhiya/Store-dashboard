const router = require('express').Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Server is up and running'
    });
});

module.exports = router;
