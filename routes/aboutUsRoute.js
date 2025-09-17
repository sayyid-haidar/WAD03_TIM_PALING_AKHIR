const express = require('express');
const router = express.Router();

// GET /api - API information
router.get('/', (req, res) => {
    res.json({
        message: 'API Endpoints',
        version: '1.0.0',
        endpoints: [
            { path: '/api/data', method: 'GET', description: 'Get sample data' },
            { path: '/api/data', method: 'POST', description: 'Create new data' },
            { path: '/api/stats', method: 'GET', description: 'Get statistics' },
            { path: '/api/health', method: 'GET', description: 'Health check' }
        ]
    });
});

module.exports = router;