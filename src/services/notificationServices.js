// // notificationServices.js
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });


const sendAppointmentConfirmation = async ({ patientEmail, dieticianName, appointmentDate, meetLink }) => {
  try {
    const emailBody = `
      <h1>Appointment Confirmation</h1>
      <p>Dear ${dieticianName},</p>
      <p>Your appointment has been booked on ${appointmentDate.toString()}.</p>
      <p>Join the meeting using the following link: <a href="${meetLink}">${meetLink}</a></p>
    `;

    // Send the email
    await transporter.sendMail({
      from: 'your-email@gmail.com', // Sender address
      to: patientEmail,              // Recipient email
      subject: 'Appointment Confirmation',
      html: emailBody,
    });

    console.log('Appointment confirmation email sent successfully!');
  } catch (error) {
    console.error('Error sending appointment confirmation:', error);
    throw error; // Rethrow to handle in bookAppointment
  }
};

export { sendAppointmentConfirmation };
