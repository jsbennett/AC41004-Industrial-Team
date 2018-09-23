var express = require("express");
var router = express.Router();
var farmService = require("../services/farmService.js");

router.get("/field/:fieldID", function(req, res, next) {
    farmService.GetCurrentFieldDetails(req).then(function(json) {
        res.render("field", { data: json });
    });
});

router.get("/soil/:fieldID", function(req, res, next) {
    farmService.GetCurrentFieldDetails(req).then(function(json) {
        res.render("soil", { data: json });
    });
});

router.get("/farm/:farmID", function(req, res, next) {
    farmService.GetFarmSummary(req).then(function(json) {
        res.render("farm", { data: json });
    });
});

router.get("/farmSummary/:farmID", function(req, res, next) {
    farmService.GetFarmSummary(req).then(function(json) {
        res.render("summary", { data: json });
    });
});

router.get("/weatherAnalysis/:farmID", function(req, res, next) {
    farmService.GetFarmAnalysis(req).then(function(json) {
        res.render("weatherAnalysis", { data: json });
    });
});

router.get("/cropAnalysis/:farmID", function(req, res, next) {
    farmService.GetFarmAnalysis(req).then(function(json) {
        res.render("cropAnalysis", { data: json });
    });
});

router.get("/", function(req, res, next) {
    res.render("index", {
        title: "FRM3D"
    });
});

router.get("/api/getField/:fieldID", function(req, res, next) {
    farmService.GetCurrentFieldDetails(req).then(function(json) {
        res.send(json);
    });
});

router.get("/api/getFarmSummary/:farmID", function(req, res, next) {
    farmService.GetFarmSummary(req).then(function(json) {
        res.send(json);
    });
});

router.get("/api/getFarmAnalysis/:farmID", function(req, res, next) {
    farmService.GetFarmAnalysis(req).then(function(json) {
        res.send(json);
    });
});

router.get("/api/getMarkers", function(req, res, next) {
    farmService.GetAllMarkers().then(function(json) {
        res.send(json);
    });
});

module.exports = router;
