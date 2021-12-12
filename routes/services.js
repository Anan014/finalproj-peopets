const router = require("express").Router();
const User = require("../models/User");
const Service = require("../models/Service");

//add service
router.post("/add", async(req, res) => {
    const newService = new Service(req.body);
    try {
        const savedService = await newService.save();
        res.status(200).json(savedService)
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user services
router.get("/userservice/:userId", async(req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        console.log("currentUser", currentUser)
        const userService = await Service.find({ userId: currentUser._id });
        console.log("userService", userService)

        res.status(200).json(userService);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all hotel services
router.get("/hotel", async(req, res) => {
    try {
        const hotelList = await Service.find({ servicetype: "hotel" });
        console.log("hotel", hotelList)
        res.status(200).json(hotelList);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;