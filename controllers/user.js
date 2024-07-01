const User = require('../models/user');

async function handleGetAllUsers (req,res) {
    try {
        const users = await User.find({});
        res.json(users);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
}

async function handleUpdateUser (req,res) {
    const { id } = req.params;
    const { name, mobile, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { 
            fullName: name, 
            email: email, 
            number: mobile }, 
            { new: true });
        res.json(user);
  } catch (error) {
        res.status(400).json({ error: error.message });
  }
}

async function handleDeleteUser (req,res) {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
  }
}


async function handleSearchUser(req,res) {
    const { name } = req.query;
    try {
        const users = await User.find({ fullName: new RegExp(name, 'i') });
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


async function handleUserSignin (req, res) {
    const { email, password } = req.body;
    try {
      const token = await User.matchPasswordAndGenerateToken(email, password);
  
      return res.json({login: 'User logged in successfully'}).cookie("token", token);
    } catch (error) {
      return res.json({
        error: "Incorrect Email or Password",
      });
    }
}

async function handleUserSignup (req, res) {
    const { fullName, email,password,number } = req.body;
    await User.create({
      fullName,
      email,
      password,
      number,
    });
    return res.status(201).json({ message: 'User created successfully' });;
}

async function handleUserFollow (req,res) {
    const { userId, followId } = req.body;
    try {
        const user = await User.findById(userId);
        const followUser = await User.findById(followId);

    if (!user || !followUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (user.following.includes(followId)) {
        return res.status(400).json({ error: 'Already following this user' });
    }

    user.following.push(followId);
    followUser.followers.push(userId);

    await user.save();
    await followUser.save();

    res.json({ message: 'User followed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleGetAllUsers,
    handleUpdateUser,
    handleDeleteUser,
    handleSearchUser,
    handleUserSignin,
    handleUserSignup,
    handleUserFollow,
}
