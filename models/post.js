const db = require('../config/database');

class Post {
  static async create(title, content, userId) {
    const [result] = await db.execute(
      'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
      [title, content, userId]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM posts');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, title, content) {
    const [result] = await db.execute(
      'UPDATE posts SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Post;