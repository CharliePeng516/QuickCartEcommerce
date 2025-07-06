import connectDB from '@/config/db';
import { getAuth } from '@clerk/nextjs/server';
import Address from '@/models/Address';
import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { inngest } from '@/config/inngest';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } =
      await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Invalid data',
      });
    }

    // calculate price

    const amount = await items.reduce(
      async (total, item) => {
        const product = await Product.findById(
          item.product
        );
        if (!product) {
          throw new Error('Product not found');
        }
        return (
          total +
          product.offerPrice * item.quantity
        );
      },
      0
    );

    await inngest.send({
      name: 'order/created',
      data: {
        userId,
        items,
        amount:
          amount + Math.floor(amount * 0.02),
        address,
        date: Date.now(),
      },
    });

    // connect to database
    await connectDB();

    // clear user cart
    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
