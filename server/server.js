const PORT = process.env.PORT ?? 8000;
const express = require("express");
const cors = require("cors");
const server = express();
const pool = require("./db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

server.use(cors());
server.use(express.json());
const saltRounds = 10;

// get all
server.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    res.json(todos.rows);
  } catch (error) {
    console.error({ er: error });
  }
});

//create;
server.post("/todos", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(req.body);
  const id = uuidv4();
  try {
    const newToDo = await pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)`,
      [id, user_email, title, progress, date]
    );
    res.json(newToDo);
  } catch (err) {
    console.error("error", err);
  }
});

//edit
server.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const editToDo = await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;",
      [user_email, title, progress, date, id]
    );
    res.json(editToDo);
  } catch (err) {
    console.error(err);
  }
});

//delete
server.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1;", [id]);
  res.json(deleteTodo);
  try {
  } catch (error) {
    console.error(error);
  }
});

//signup
server.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedpassword = bcrypt.hashSync(password, salt);

  try {

    const signUp = await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
      [email, hashedpassword]);

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    res.json({ email, token });

  } catch (error) {
    // console.error(error);
    if(error) res.json({ errorDetail: error.detail });
  }
});

//login
server.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!users.rows.length) return res.json({ detail: "user doesn't exists!" });

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    if (success){
      res.json({ email: users.rows[0].email, token });
    } 
    else{
      res.json({ detail: "login failed" });
    } 
  } catch (error) {
    // console.error(error);
    res.json({ errorDetail: error.detail });
  }
});

server.listen(PORT, () => console.log(`server running at port ${PORT}`));
