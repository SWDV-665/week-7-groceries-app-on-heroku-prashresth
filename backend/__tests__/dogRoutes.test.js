const request = require('supertest');
const app = require('../app');

/*
* Below are some unit test for the routes. I did not write test for CUD operations because
* I couldn't find how to mock services in nodeJS.
*/

describe('Route tests', () => {

    const testId = '60314dd0afca6f6b734cd866';
    const nonExistentTestId = '10314dd0afca6f6b734cd864';
    const testName = 'momo';

    it('should get list of dog records with no query params', async () => {
        const res = await request(app)
            .get('/api/dogs');
        validateSuccess(res)
        expect(res.body).toHaveProperty('listings');
        expect(res.body.listings.length).not.toBe(0);
        expect(res.body.currentPage).toBe(null); // no query params
        expect(res.body.pages).toBe(null); // no query params
    });

    it('should get list of dog records with query params', async () => {
        const res = await request(app)
            .get('/api/dogs?page=1&size=12');
        validateSuccess(res);
        expect(res.body).toHaveProperty('listings');
        expect(res.body.listings.length).not.toBe(0);
        expect(res.body.currentPage).not.toBe(null); // no params
        expect(res.body.pages).not.toBe(null); // no params
    });

    it('should get a dog record by id', async () => {
        const res = await request(app)
            .get(`/api/dogs/${testId}`);
        validateSuccess(res);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBe(1);
    });

    it('should not get a dog record by non-existent id', async () => {
        const res = await request(app)
            .get(`/api/dogs/${nonExistentTestId}`);
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('code');
        expect(res.body.message).toBe('Dog record not found.');
    });

    it('should not get a dog record by invalid id', async () => {
        const res = await request(app)
            .get(`/api/dogs/${nonExistentTestId}a`);
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toContain('Argument passed');
    });

    it('should not get a dog record by name', async () => {
        const res = await request(app)
            .get(`/api/dogs/search/${testName}`);
        validateSuccess(res)
        expect(res.body).toHaveProperty('data');
        expect(res.body.data.length).toBe(1);
    });

    function validateSuccess(res) {
        expect(res.statusCode).toEqual(200);
    }

});