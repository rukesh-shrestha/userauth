import createMailTransporter from "./createMailTransporter.js";

const sendVerificationEmail = (user) => {
  const transpoter = createMailTransporter();
  const mailOptions = {
    from: '"Rukesh Shrestha"',
    to: user.email,
    subject: "Verify Your Account - Action Required",
    html: `
    <p>Hello ${user.firstname[0].toUpperCase() + user.firstname.slice(1)},</p>

    <div>
        Thank you for signing up with our platform! We're excited to have you on board. To ensure the security of your account and complete the registration process, we kindly ask you to verify your account by clicking the link below:        

        <br>
        <br>
        
        
        <a href='${
          process.env.DOMAIN_NAME
        }/api/users/auth/verify-email?emailtoken=${
      user.emailtoken
    }' style="text-decoration:none">Verify Your Email</a>
        
        <br>
        <br>

        Once verified, you'll have full access to all the features and services we offer.If you did not sign up for an account on our platform, please disregard this email. Your account will not be activated until you verify it using the provided link.
        <br>    

        If you encounter any issues or have any questions, feel free to contact at info@shrestharukesh.com.np.<br>
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
      console.log("Verification Email Send");
    }
  });
};

export default sendVerificationEmail;
