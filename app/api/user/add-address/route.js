import connectDB from '@/config/db';
import { getAuth } from '@clerk/nextjs/server';
import Address from '@/models/Address';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const addressSchema = z.object({
  fullName: z.string().min(1, 'Your name is required'),
  phoneNumber: z.string().min(1, 'PhoneNumber is required'),
  pincode: z.string().min(1, 'Pin/Zip code is required'),
  area: z.string().min(1, 'Your Area is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address } = await request.json();

    const validation = addressSchema.safeParse(address);

    if (!validation.success) {
      // Return a 400 Bad Request response with validation errors
      // You can customize the error response as needed
      // console.error('Validation failed:', validation.error.errors);
      // console.error('User ID:', userId);
      // console.error('Request body:', address);  
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
