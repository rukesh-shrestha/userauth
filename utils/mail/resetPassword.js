import createMailTransporter from "./createMailTransporter.js";

const sendResetPasswordMail = (user) => {
  const transpoter = createMailTransporter();
  const mailOptions = {
    from: '"Rukesh Shrestha"',
    to: user.email,
    subject: "Password Reset - Action Required",
    html: `
    <p>Hello ${user.firstname[0].toUpperCase() + user.firstname.slice(1)},</p>

    <div>
    We received a request to reset your password for your account. If you did not make this request, please ignore this email; your password will not be changed.

    To reset your password, please click on the link below:       

        <br>
        <br>
        
        
        <a href='${
          process.env.DOMAIN_NAME
        }/api/users/auth/reset-password?resettoken=${
      user.resettoken
    }' style="text-decoration:none">Reset Your Password</a>
        
        <br>
        <br>

        Please note that this link is valid for the next 30 minutes. After this time, you'll need to request another password reset.
        <br>    

        If you encounter any issues, feel free to contact at info@shrestharukesh.com.np.<br>
        We're here to help!
        <br>
        <br>     

        Thank you for using the system.
        <br>
        <br>      

        
        Best Regards,<br>
        Rukesh Shrestha
        
        
    </div>
    `,
  };

  transpoter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(503).json({
        status: "error",
        data: {
          error: error.messsage,
        },
      });
    } else {
      console.log("Reset Email Send");
    }
  });
};

export default sendResetPasswordMail;
