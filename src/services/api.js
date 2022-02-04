const axios = require('axios').default;

export default {
    get: async (payload) => {
        const response = await axios({
            method: 'get',
            url: `https://api-dev.historik.com/yelp/businesses/search?latitude=${payload.latitude}&longitude=${payload.longitude}&categories=${payload.categories}`
        });
        if (response && response.data) {
            return response.data;
        } else {
            return 404
        }
    }
}