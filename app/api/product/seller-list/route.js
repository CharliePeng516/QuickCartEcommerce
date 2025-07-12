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
    }else{
      // console.log('User is a seller:', userId);
      await connectDB();
      // console.log('Connected to database', userId);
      const products = await Product.find({ userId});
      console.log('Products fetched:', products);
      return NextResponse.json({
        success: true,
        products,
      });
    }


  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
