

export default function handler(req, res) {
    if (req.method === 'POST') {
      const { username, password } = req.body;
  
      if (username === 'admin' && password === 'password') {
        res.status(200).json({ success: true, message: 'Giriş başarılı' });
      } else {
        res.status(401).json({ success: false, message: 'Kullanıcı adı veya şifre hatalı' });
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  