const router = require("express").Router();
const User = require("../models/User");
const Pet = require("../models/Pet");

//add pet
router.post("/add", async(req, res) => {
    const newPet = new Pet(req.body);
    try {
        const savedPet = await newPet.save();
        res.status(200).json(savedPet)
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user pets
router.get("/userpets/:userId", async(req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        console.log("currentUser", currentUser)
        const userPets = await Pet.find({ userId: currentUser._id });
        console.log("userPets", userPets)

        res.status(200).json(userPets);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all pets for adoption
router.get("/adopt", async(req, res) => {
    try {
        const adoptPets = await Pet.find({ forAdopt: "yes" });
        console.log("adoptPets", adoptPets)
        res.status(200).json(adoptPets);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all missing pets
router.get("/missing", async(req, res) => {
    try {
        const missingPets = await Pet.find({ isMissing: "yes" });
        console.log("missingPets", missingPets)
        res.status(200).json(missingPets);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;