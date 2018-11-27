/**
 * Mailer Utility
 * 
 */

class Mailer {
  static send(request, hash) {
    const transporter = request.mailer.createTransport({
      host: 'smtp.localhost',
      port: 587,
      secure: false,
      auth: {
        user: 'username',
        pass: 'password'
      }
    })
    transporter.sendMail({
      from: 'horizonsendgaming@gmail.com',
      to: request.body.email,
      subject: "From Horizon's End: Please Validate Your Email",
      html: `
        <div>
          <h1>Welcome to Horizon's End</h1>
          <p>To verify your recently created user account use the following link:</p>
          <a href="http://www.horizonsend.com/activate/${hash}">Activate your account.</a>
        </div>
      `
    })
    .then(console.log)
    .catch(console.error)
  }
}

module.exports = Mailer