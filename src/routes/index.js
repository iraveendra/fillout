const express = require('express');
const { fetchAndFilterResponses, applyFilters } = require('../controllers/formResponsesController');

const router = express.Router();

router.get('/:formId/filteredResponses', async (req, res) => {
    const { formId } = req.params;
    const { filters, limit, offset = '0', ...otherQueryParams } = req.query;
    
    // Use default limit of 150 if limit is not provided, cannot be parsed, or is <= 0
    const parsedLimit = Math.max(1, parseInt(limit, 10) || 150);
    const parsedOffset = parseInt(offset, 10) || 0;

    try {
        const { data, status, error } = await fetchAndFilterResponses(formId, otherQueryParams);
        if (error) {
            return res.status(status).send({ error });
        }

        let filteredResponses = data.responses;
        // Apply filters if provided
        if (filters) {
            try {
                filteredResponses = applyFilters(data.responses, filters);
            } catch (e) {
                return res.status(400).send({ error: "Invalid filter format." });
            }
        }

        // Calculate totalResponses based on the filtered results
        const totalResponses = filteredResponses.length;

        // Apply pagination logic
        filteredResponses = filteredResponses.slice(parsedOffset, parsedOffset + parsedLimit);
        
        // Calculate pageCount, considering the limit
        const pageCount = Math.ceil(totalResponses / parsedLimit);

        return res.status(200).json({
            responses: filteredResponses,
            totalResponses,
            pageCount
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
