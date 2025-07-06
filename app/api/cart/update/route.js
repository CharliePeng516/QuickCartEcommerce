import connectDB from '@/config/db';
import { getAuth } from '@clerk/nextjs/server';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const { cartData } = await request.json();

    await connectDB();

    const user = await User.findById({ userId });

    user.cart = cartData;

    await user.save();

    NextResponse.json(
      {
        success: true,
        message: 'Cart updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
