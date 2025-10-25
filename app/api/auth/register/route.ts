import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    console.log('Registration attempt started');
    await connectDB();
    console.log('Database connected');

    const body = await request.json();
    console.log('Request body:', { email: body.email, name: body.name });
    const { email, password, name, role } = body;

    // Validate required fields
    if (!email || !password || !name) {
      console.log('Validation failed: missing fields');
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    console.log('Creating new user...');
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: role || 'user', // Default to 'user' if not specified
    });
    console.log('User created successfully:', user.email);

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000 || error.code === 11001) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to register user', details: error.message },
      { status: 500 }
    );
  }
}

