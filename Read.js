const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create transport for email sending
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Send email with verification link
app.post('/register', (req, res) => {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  const email = req.body.email;

  const verificationLink = `https://your-website.com/verify?token=${verificationToken}`;

  transporter.sendMail({
    to: email,
    subject: 'Verify Your Account',
    text: `Click here to verify your account: ${verificationLink}`
  });

  res.json({ success: true });
});
app.post('/add-product', (req, res) => {
  const { name, price, description, images } = req.body;
  const newProduct = new Product({ name, price, description, images });
  newProduct.save().then(() => res.json({ success: true }));
});
app.post('/checkout', (req, res) => {
  const { totalAmount } = req.body;
  let discount = 0;

  if (totalAmount > 499) {
    discount = totalAmount * 0.10; // 10% off
  }

  res.json({ totalAmount: totalAmount - discount, discountApplied: discount });
});
