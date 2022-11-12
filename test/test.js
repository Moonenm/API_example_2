const express = require('express');

const request =require ('supertest');

describe('get campus', () => {
    it('should get all campussen', async () => {
     await request('https://campus-api-example.netlify.app')
        .get('/.netlify/functions/api/campus')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
    });
});