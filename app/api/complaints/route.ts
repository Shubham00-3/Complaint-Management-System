import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Complaint from '@/lib/models/Complaint';
import { requireAuth, requireAdmin } from '@/lib/auth';
import { sendNewComplaintEmail } from '@/lib/email';

// GET /api/complaints - Get all complaints (admin only)
export async function GET(request: NextRequest) {
  try {
    requireAdmin(request);
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    // Build filter query
    const filter: any = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (priority && priority !== 'all') {
      filter.priority = priority;
    }

    const complaints = await Complaint.find(filter).sort({ dateSubmitted: -1 });

    return NextResponse.json(
      { complaints },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get complaints error:', error);
    
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === 'Unauthorized' ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch complaints', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/complaints - Create a new complaint (authenticated users)
export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    await connectDB();

    const body = await request.json();
    const { title, description, category, priority } = body;

    // Validate required fields
    if (!title || !description || !category || !priority) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create complaint
    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
      userId: user.userId,
      userEmail: user.email,
    });

    // Send email notification to admin
    try {
      await sendNewComplaintEmail({
        title: complaint.title,
        category: complaint.category,
        priority: complaint.priority,
        description: complaint.description,
        userEmail: complaint.userEmail,
        dateSubmitted: complaint.dateSubmitted.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Continue even if email fails
    }

    return NextResponse.json(
      {
        message: 'Complaint submitted successfully',
        complaint,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create complaint error:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create complaint', details: error.message },
      { status: 500 }
    );
  }
}

