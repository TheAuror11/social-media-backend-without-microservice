const express = require("express")
const { handleDeleteUser, 
        handleGetAllUsers, 
        handleUpdateUser, 
        handleSearchUser, 
        handleUserSignin,
        handleUserSignup,
        handleUserFollow} = require("../controllers/user")

const router = express.Router();

router.get("/", handleGetAllUsers);
router.put("/:id", handleUpdateUser);
router.delete("/:id", handleDeleteUser);
router.get("/search", handleSearchUser);
router.post("/signin", handleUserSignin);
router.post("/signup", handleUserSignup)
router.post("/follow", handleUserFollow)

module.exports = router;