import { getAuth } from '@clerk/nextjs/server';
import authseller from '@/lib/authSeller';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = authseller(userId);

    if (!isSeller) {
      return NextResponse.json({
        success: false,
        message:
          'You are not authorized to view this page.',
      });
    }

    await connectDB();
    const products = await Product.find({});

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
