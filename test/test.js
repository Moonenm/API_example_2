const express = require('express');
const chai = require('chai');
const request =require ('supertest');

describe('get campus', () => {
    it('should get all campussen', function(done) {
        request('https://campus-api-example.netlify.app')
        .get('/.netlify/functions/api/campus')
        .expect(200)
        .expect('Content-Type', 'application/json')
        .expect(/{"message":".*","status":"success"}/,done);
    });
});