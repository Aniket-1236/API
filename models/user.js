const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  static async create(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    return result.insertId;
  }

  static async findByUsername(username) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  }
}

module.exports = User;