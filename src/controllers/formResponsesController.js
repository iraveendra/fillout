const axios = require('../config/axiosConfig');

const fetchAndFilterResponses = async (formId, query) => {
    try {
        const { data } = await axios.get(`/forms/${formId}/submissions`, { params: query });
        return { data, status: 200 };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { error: 'Form not found.', status: 404 };
        } else {
            console.error('Error fetching form responses:', error);
            throw error;
        }
    }
};

const applyFilters = (responses, filters) => {
    if (!filters) return responses; // No filtering if filters not provided
    const filterClauses = JSON.parse(filters);

    return responses.filter(response => {
        return filterClauses.every(filter => {
            const question = response.questions.find(q => q.id === filter.id);
            if (!question) return false; // Skip if the question ID doesn't match

            let value = question.value;
            switch (filter.condition) {
                case 'equals':
                    return value == filter.value;
                case 'does_not_equal':
                    return value != filter.value;
                case 'greater_than':
                    return new Date(value) > new Date(filter.value);
                case 'less_than':
                    return new Date(value) < new Date(filter.value);
                default:
                    return false; // Unknown condition
            }
        });
    });
};

module.exports = {
    fetchAndFilterResponses,
    applyFilters
};
