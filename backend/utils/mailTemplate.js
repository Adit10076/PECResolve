exports.createThankYouEmail = (userName) => `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; color: #333;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #002b36; color: #ffffff; text-align: center; padding: 20px; font-size: 24px;">
        PECResolve
      </div>
      <!-- Content -->
      <div style="padding: 20px; font-size: 16px; line-height: 1.6;">
        <p>Dear ${userName || "User"},</p>
        <p>
          Thank you for contacting PECResolve. We’ve received your message and appreciate you taking the time to reach out to us.
        </p>
        <p>
          Our team is reviewing your submission, and we will get back to you as soon as possible. If your query requires urgent attention, please
          don't hesitate to mention it, and we’ll prioritize your request accordingly.
        </p>
        <p>
          In the meantime, feel free to explore our 
          <a href="#" style="color: #007bff; text-decoration: none;">FAQs</a> or 
          <a href="#" style="color: #007bff; text-decoration: none;">Privacy Policy</a> for more information.
        </p>
        <p>
          Thank you for trusting PECResolve to assist you. We’re here to ensure your experience is smooth and hassle-free.
        </p>
        <p>Warm regards,</p>
        <p><strong>The PECResolve Team</strong></p>
      </div>
      <!-- Footer -->
      <div style="background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 14px; color: #666;">
        <p>
          <a href="https://pec-resolve-frontend.vercel.app/" style="color: #007bff; text-decoration: none;">Visit our Website</a> | 
          <a href="mailto:pecresolve@gmail.com" style="color: #007bff; text-decoration: none;">Contact Us</a>
        </p>
        <p>&copy; ${new Date().getFullYear()} PECResolve. All rights reserved.</p>
      </div>
    </div>
  </div>
`;
