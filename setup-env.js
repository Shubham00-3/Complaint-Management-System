/**
 * Quick Setup Script - Run this to create your .env file
 * Usage: node setup-env.js
 */

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🚀 Complaint Management System - Environment Setup\n');
console.log('This script will help you create your .env file.\n');

const questions = [
  {
    key: 'MONGODB_URI',
    question: 'Enter your MongoDB connection string: ',
    default: 'mongodb+srv://complaintuser:password@cluster0.s8s2vqk.mongodb.net/complaint-management?retryWrites=true&w=majority'
  },
  {
    key: 'JWT_SECRET',
    question: 'Enter JWT secret (or press Enter for auto-generated): ',
    default: require('crypto').randomBytes(32).toString('base64')
  },
  {
    key: 'SENDGRID_API_KEY',
    question: 'Enter SendGrid API Key: ',
    default: 'SG.your-api-key'
  },
  {
    key: 'SENDGRID_FROM_EMAIL',
    question: 'Enter SendGrid sender email: ',
    default: 'noreply@example.com'
  },
  {
    key: 'ADMIN_EMAIL',
    question: 'Enter admin notification email: ',
    default: 'admin@example.com'
  },
  {
    key: 'NEXT_PUBLIC_APP_URL',
    question: 'Enter app URL (press Enter for localhost): ',
    default: 'http://localhost:3000'
  }
];

async function askQuestion(q) {
  return new Promise((resolve) => {
    rl.question(q.question, (answer) => {
      resolve(answer.trim() || q.default);
    });
  });
}

async function setup() {
  const env = {};
  
  for (const q of questions) {
    const answer = await askQuestion(q);
    env[q.key] = answer;
    console.log(`✓ ${q.key} set\n`);
  }
  
  // Create .env file content
  const envContent = `# MongoDB Connection
MONGODB_URI=${env.MONGODB_URI}

# JWT Secret
JWT_SECRET=${env.JWT_SECRET}

# SendGrid Email Configuration
SENDGRID_API_KEY=${env.SENDGRID_API_KEY}
SENDGRID_FROM_EMAIL=${env.SENDGRID_FROM_EMAIL}
ADMIN_EMAIL=${env.ADMIN_EMAIL}

# Application URL
NEXT_PUBLIC_APP_URL=${env.NEXT_PUBLIC_APP_URL}
`;

  // Write .env file
  fs.writeFileSync('.env', envContent);
  console.log('\n✅ .env file created successfully!\n');
  console.log('📝 File location: .env\n');
  console.log('🚀 Next steps:');
  console.log('   1. Review the .env file');
  console.log('   2. Run: npm run dev');
  console.log('   3. Open: http://localhost:3000\n');
  
  rl.close();
}

setup().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});

