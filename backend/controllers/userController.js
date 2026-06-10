import db from "../config/db.js";

// GET ALL USERS

const getUsers = (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
};

// GET SINGLE USER

const getUser = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM users WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result[0],
    });
  });
};

// CREATE USER

const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and Email required",
    });
  }

  const sql = "INSERT INTO users(name,email) VALUES (?,?)";

  db.query(sql, [name, email], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "User created",
      id: result.insertId,
    });
  });
};

// UPDATE USER

const updateUser = (req, res) => {
  const { id } = req.params;

  const { name, email } = req.body;

  const sql = "UPDATE users SET name=?, email=? WHERE id=?";

  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  });
};

// DELETE USER

const deleteUser = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  });
};

export { createUser, deleteUser, getUser, getUsers, updateUser };
