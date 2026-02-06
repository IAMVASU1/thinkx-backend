const sendEmail = async ({ to, subject, message }) => {
  try {
    // 🔹 In real project, integrate Nodemailer / SendGrid
    console.log('📧 Email sent');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Message:', message);

    return true;
  } catch (error) {
    console.error('Email service error:', error.message);
    return false;
  }
};

export default sendEmail;
