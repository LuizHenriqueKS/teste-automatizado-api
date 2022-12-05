class AuthController {

  users = [
    { email: 'test', password: '1234' }
  ];

  tokens = [];

  async login({ email, password }) {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      const token = "token_" + (Math.random() + "").substring(3);
      this.tokens.push(token);
      return { ok: true, token };
    } else {
      return { ok: false, message: 'User not found' };
    }
  }

  async validateAuth(req, res) {
    const [_, token] = req.headers['authorization'].split(' ');
    const validToken = this.tokens.includes(token);
    if (!validToken) {
      res.status(401).json({ ok: false, message: 'Invalid token' });
    }
    return validToken;
  }

}

module.exports = new AuthController();