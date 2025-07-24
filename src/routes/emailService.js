// services/emailService.js

const nodemailer = require('nodemailer');

// Create transporter - Configure with your email service
const createTransporter = () => {
  return nodemailer.createTransport({
    // For Gmail
    service: 'gmail',
    auth: { 
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your app password
    },
    // For other services like Outlook, Yahoo, etc.
    // host: 'smtp.gmail.com',
    // port: 587,
    // secure: false,
  });
};

// Send connection request email
const sendConnectionRequestEmail = async (toUser, fromUser) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toUser.emailId,
      subject: `New Connection Request from ${fromUser.firstName} - Dev Tinder`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #60A5FA; margin: 0;">   &lt;&gt;DevTinder&lt;/&gt;</h1>
              <p style="color: #666; margin: 5px 0;">Connect with fellow developers</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: #333; margin-top: 0;">New Connection Request!</h2>
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Hi <strong>${toUser.firstName}</strong>,
              </p>
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                <strong>${fromUser.firstName} ${fromUser.lastName || ''}</strong> is interested in connecting with you on Dev Tinder!
              </p>
              ${fromUser.about ? `
                <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #e91e63; margin: 15px 0;">
                  <p style="margin: 0; color: #666; font-style: italic;">"${fromUser.about}"</p>
                </div>
              ` : ''}
            </div>
            
            <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #333; margin-top: 0;">Profile Summary:</h3>
              <ul style="color: #555; padding-left: 20px;">
                ${fromUser.skills && fromUser.skills.length > 0 ? `
                  <li><strong>Skills:</strong> ${fromUser.skills.join(', ')}</li>
                ` : ''}
                ${fromUser.age ? `<li><strong>Age:</strong> ${fromUser.age}</li>` : ''}
                ${fromUser.gender ? `<li><strong>Gender:</strong> ${fromUser.gender}</li>` : ''}
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #555; margin-bottom: 20px;">
                Ready to make a new connection? Check out their profile and respond:
              </p>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/requests" 
                 style="background-color: #e91e63; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 0 10px;">
                View Requests
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #888; font-size: 14px;">
              <p>This email was sent because someone expressed interest in connecting with you on Dev Tinder.</p>
              <p>If you don't want to receive these emails, you can update your notification preferences in your account settings.</p>
            </div>
          </div>
        </div>
      `,
      text: `
        Hi ${toUser.firstName},
        
        ${fromUser.firstName} ${fromUser.lastName || ''} is interested in connecting with you on Dev Tinder!
        
        ${fromUser.about ? `About them: "${fromUser.about}"` : ''}
        
        Skills: ${fromUser.skills ? fromUser.skills.join(', ') : 'Not specified'}
        Age: ${fromUser.age || 'Not specified'}
        
        Visit ${process.env.FRONTEND_URL || 'http://localhost:5173'}/requests to view and respond to this connection request.
        
        Best regards,
        Dev Tinder Team
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Connection request email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending connection request email:', error);
    return { success: false, error: error.message };
  }
};

// Send connection status update email
const sendConnectionStatusEmail = async (toUser, fromUser, status) => {
  try {
    const transporter = createTransporter();
    
    const isAccepted = status === 'accepted';
    const statusText = isAccepted ? 'accepted' : 'rejected';
    const statusColor = isAccepted ? '#4caf50' : '#f44336';
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: fromUser.emailId,
      subject: `Connection Request ${statusText.charAt(0).toUpperCase() + statusText.slice(1)} - Dev Tinder`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #e91e63; margin: 0;">Dev Tinder</h1>
              <p style="color: #666; margin: 5px 0;">Connect with fellow developers</p>
            </div>
            
            <div style="background-color: ${isAccepted ? '#e8f5e8' : '#ffebee'}; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: ${statusColor}; margin-top: 0;">Connection Request ${statusText.charAt(0).toUpperCase() + statusText.slice(1)}!</h2>
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Hi <strong>${fromUser.firstName}</strong>,
              </p>
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                <strong>${toUser.firstName} ${toUser.lastName || ''}</strong> has <strong>${statusText}</strong> your connection request.
              </p>
            </div>
            
            ${isAccepted ? `
              <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #333; margin-top: 0;">🎉 Great news!</h3>
                <p style="color: #555;">You can now start chatting and collaborating together. Check out their profile and send them a message!</p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/connections" 
                   style="background-color: #4caf50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                  View Connections
                </a>
              </div>
            ` : `
              <div style="background-color: #fff9c4; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #333; margin-top: 0;">Keep exploring!</h3>
                <p style="color: #555;">Don't worry, there are many other developers waiting to connect with you. Keep swiping and find your perfect match!</p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/feed" 
                   style="background-color: #e91e63; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                  Continue Exploring
                </a>
              </div>
            `}
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #888; font-size: 14px;">
              <p>This email was sent to notify you about your connection request status on Dev Tinder.</p>
            </div>
          </div>
        </div>
      `,
      text: `
        Hi ${fromUser.firstName},
        
        ${toUser.firstName} ${toUser.lastName || ''} has ${statusText} your connection request on Dev Tinder.
        
        ${isAccepted ? 
          `Great news! You can now start chatting and collaborating together. Visit ${process.env.FRONTEND_URL || 'http://localhost:3000'}/connections to view your connections.` :
          `Don't worry, there are many other developers waiting to connect with you. Visit ${process.env.FRONTEND_URL || 'http://localhost:3000'}/feed to continue exploring.`
        }
        
        Best regards,
        Dev Tinder Team
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Connection ${status} email sent successfully:`, result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error(`Error sending connection ${status} email:`, error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendConnectionRequestEmail,
  sendConnectionStatusEmail
};