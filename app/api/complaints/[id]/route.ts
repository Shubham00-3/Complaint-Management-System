import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Complaint from '@/lib/models/Complaint';
import { requireAdmin } from '@/lib/auth';
import { sendStatusUpdateEmail } from '@/lib/email';

// PATCH /api/complaints/[id] - Update complaint (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAdmin(request);
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Get the old complaint to compare status
    const oldComplaint = await Complaint.findById(id);
    if (!oldComplaint) {
      return NextResponse.json(
        { error: 'Complaint not found' },
        { status: 404 }
      );
    }

    const oldStatus = oldComplaint.status;

    // Update complaint
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return NextResponse.json(
        { error: 'Complaint not found' },
        { status: 404 }
      );
    }

    // Send email notification if status changed
    if (oldStatus !== status) {
      try {
        await sendStatusUpdateEmail({
          title: complaint.title,
          oldStatus,
          newStatus: status,
          updatedDate: new Date().toLocaleDateString('en-US', {
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
    }

    return NextResponse.json(
      {
        message: 'Complaint updated successfully',
        complaint,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update complaint error:', error);
    
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === 'Unauthorized' ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update complaint', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/complaints/[id] - Delete complaint (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    requireAdmin(request);
    await connectDB();

    const { id } = await params;

    const complaint = await Complaint.findByIdAndDelete(id);

    if (!complaint) {
      return NextResponse.json(
        { error: 'Complaint not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Complaint deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete complaint error:', error);
    
    if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === 'Unauthorized' ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to delete complaint', details: error.message },
      { status: 500 }
    );
  }
}

