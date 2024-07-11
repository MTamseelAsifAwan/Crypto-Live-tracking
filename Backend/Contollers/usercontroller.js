import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../Models/user.js";

const JWT_KEY = "tamseelasif";

const uservalidator = {
  async user_register(req, res, next) {
  const register_schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmpassword: Joi.string().valid(Joi.ref('password')).required()
  });

  const { error } = register_schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password } = req.body;
  try {
    const usernameinuse = await users.exists({ username });
    const emailinuse = await users.exists({ email });
    if (usernameinuse) return res.status(400).send("Username already exists");
    if (emailinuse) return res.status(400).send("Email already exists");

    const hashpassword = await bcrypt.hash(password, 10);
    const usertoregister = new users({
      username,
      email,
      password: hashpassword
    });

    const Token = jwt.sign({ username: usertoregister.username }, JWT_KEY);
    // Save the token in the database
    await users.updateOne({ username }, { $set: { token: Token } });
    // Save the token in the cookie
    res.cookie('token', Token, { expires: new Date(Date.now() + 60 * 60 * 1000) }); // 1 hour expiration
    console.log(Token);
    const user = await usertoregister.save();

    return res.status(200).json({ message: "Saved successfully", user });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Not saved Server Error");
  }
},

async user_login(req, res) {
  const userloginschema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required()
  });

  const { error } = userloginschema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;
  try {
    const user = await users.findOne({ username });
    if (!user) return res.status(400).send('Invalid username');

    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) return res.status(400).send('Invalid password');

    // Check if a token already exists for the user
    const existingToken = await users.findOne({ username, token: { $exists: true } });
    if (existingToken) {
      // Return the existing token
      res.cookie('token', existingToken.token, { expires: new Date(Date.now() + 60 * 60 * 1000) }); // 1 hour expiration
      console.log(existingToken.token);
      return res.status(200).json({ message: "Login Successfully", user });
    } else {
      // Generate a new token
      const Token = jwt.sign({ username: user.username }, JWT_KEY);
      // Save the token in the database
      await users.updateOne({ username }, { $set: { token: Token } });
      // Save the token in the cookie
      res.cookie('token', Token, { expires: new Date(Date.now() + 60 * 60 * 1000) }); // 1 hour expiration
      console.log(Token);
      return res.status(200).json({ message: "Login Successfully", user });
    }
  } catch (error) {
    console.log("Server Failed", error);
    return res.status(500).send("Not Logged in - Internal Server Error");
  }
}
};

export default uservalidator;