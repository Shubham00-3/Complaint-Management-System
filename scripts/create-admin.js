/**
 * Script to create an admin user
 * 
 * Usage:
 * 1. Make sure MongoDB is configured in .env.local
 * 2. Run: node scripts/create-admin.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function createAdmin() {
  try {
    // Load environment variables
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in environment variables');
      console.log('Please create a .env.local file with MONGODB_URI');
      process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Define User schema inline for this script
    const UserSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      role: { type: String, enum: ['user', 'admin'], default: 'user' },
    });

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Get admin details
    console.log('📝 Create Admin User\n');
    const name = await question('Enter admin name: ');
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password (min 6 chars): ');

    if (!name || !email || !password) {
      console.error('❌ All fields are required');
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('❌ Password must be at least 6 characters');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.error(`❌ User with email ${email} already exists`);
      process.exit(1);
    }

    // Hash password
    console.log('\n🔒 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'admin',
    });

    console.log('\n✅ Admin user created successfully!');
    console.log(`\nAdmin Details:`);
    console.log(`- Name: ${admin.name}`);
    console.log(`- Email: ${admin.email}`);
    console.log(`- Role: ${admin.role}`);
    console.log(`\nYou can now login at https://complaint-shubham-management-system.vercel.app/login\n`);

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    rl.close();
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();
