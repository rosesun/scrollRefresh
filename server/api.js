"use strict";
const express = require('express');
const router = express.Router();


router.get('/api/moreData', (req, res) => {
    let currPage = req.query.page;
    currPage = parseInt(currPage) + 1;
    let data = {
        success: true,
        dataList: [],
        // dataList: [
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 },
        //     { 'name': 123 }
        // ]
    }
    res.send(data);
});
router.get('/api/refresh',(req, res) => {
    let data = {
        success: true,
        dataList: [
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},
            {'name':'下拉刷新'},

        ]
    };
    res.send(data);
})
module.exports = router;
