import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    await connectDB();
    console.log('MongoDB connection successful!');
    
    return NextResponse.json(
      { message: 'MongoDB connection successful!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('MongoDB connection failed:', error);
    
    return NextResponse.json(
      { 
        error: 'MongoDB connection failed', 
        details: error.message,
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}
