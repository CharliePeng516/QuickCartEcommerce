import connectDB from '@/config/db';
import { getAuth } from '@clerk/nextjs/server';
import Address from '@/models/Address';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address } = await request.json();

    const validation = addressSchema.safeParse(address);

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

    const newAddress = await Address.create({
      ...validation.data,
      userId,
    });

    return NextResponse.json({
      success: true,
      message: 'Address added successfully',
      newAddress,
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
