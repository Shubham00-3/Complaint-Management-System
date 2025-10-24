import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export interface NewComplaintEmailData {
  title: string;
  category: string;
  priority: string;
  description: string;
  userEmail: string;
  dateSubmitted: string;
}

export interface StatusUpdateEmailData {
  title: string;
  oldStatus: string;
  newStatus: string;
  updatedDate: string;
}

export async function sendNewComplaintEmail(data: NewComplaintEmailData) {
  if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL || !ADMIN_EMAIL) {
    console.warn('SendGrid not configured. Skipping email notification.');
    console.log('New Complaint Email:', data);
    return;
  }

  const msg = {
    to: ADMIN_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    subject: `New Complaint: ${data.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Complaint Submitted</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Title:</strong> ${data.title}</p>
          <p><strong>Category:</strong> ${data.category}</p>
          <p><strong>Priority:</strong> <span style="color: ${getPriorityColor(data.priority)};">${data.priority}</span></p>
          <p><strong>User Email:</strong> ${data.userEmail}</p>
          <p><strong>Date Submitted:</strong> ${data.dateSubmitted}</p>
          <p><strong>Description:</strong></p>
          <p style="background-color: white; padding: 15px; border-radius: 3px;">${data.description}</p>
        </div>
        <p style="margin-top: 20px; color: #666;">Please log in to the admin dashboard to review and manage this complaint.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('New complaint email sent successfully');
  } catch (error) {
    console.error('Error sending new complaint email:', error);
    throw error;
  }
}

export async function sendStatusUpdateEmail(data: StatusUpdateEmailData) {
  if (!SENDGRID_API_KEY || !SENDGRID_FROM_EMAIL || !ADMIN_EMAIL) {
    console.warn('SendGrid not configured. Skipping email notification.');
    console.log('Status Update Email:', data);
    return;
  }

  const msg = {
    to: ADMIN_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    subject: `Complaint Status Updated: ${data.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Complaint Status Updated</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Complaint:</strong> ${data.title}</p>
          <p><strong>Status Change:</strong></p>
          <p style="font-size: 18px;">
            <span style="color: #666;">${data.oldStatus}</span> 
            → 
            <span style="color: ${getStatusColor(data.newStatus)}; font-weight: bold;">${data.newStatus}</span>
          </p>
          <p><strong>Updated Date:</strong> ${data.updatedDate}</p>
        </div>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('Status update email sent successfully');
  } catch (error) {
    console.error('Error sending status update email:', error);
    throw error;
  }
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'High':
      return '#dc2626';
    case 'Medium':
      return '#f59e0b';
    case 'Low':
      return '#10b981';
    default:
      return '#666';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Resolved':
      return '#10b981';
    case 'In Progress':
      return '#3b82f6';
    case 'Pending':
      return '#f59e0b';
    default:
      return '#666';
  }
}

