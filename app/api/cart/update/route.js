import connectDB from '@/config/db';
import { getAuth } from '@clerk/nextjs/server';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const cartDataSchema = z.record(z.number().int().min(0));

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    const { cartData } = await request.json();

    const validation = cartDataSchema.safeParse(cartData);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.errors.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(userId);

    user.cartItems = validation.data;

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Cart updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
