import { v2 as cloudinary } from 'cloudinary';
import { getAuth } from '@clerk/nextjs/server';
import authSeller from '@/lib/authSeller';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Product from '@/models/Product';
import { z } from 'zod';

// config cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  category: z.string().min(1, 'Category is required'),
  offerPrice: z.string().optional(),
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json(
        {
          success: false,
          message: 'You are not authorized to add products.',
        },
        { status: 401 }
      );
    }

    const formdata = await request.formData();
    const name = formdata.get('name');
    const description = formdata.get('description');
    const price = formdata.get('price');
    const category = formdata.get('category');
    const offerPrice = formdata.get('offerPrice');

    const validation = productSchema.safeParse({
      name,
      description,
      price,
      category,
      offerPrice,
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.errors.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    const files = formdata.getAll('images');

    if (!files || files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No images provided',
        },
        { status: 400 }
      );
    }

    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });
      })
    );

    const image = result.map((result) => result.secure_url);

    await connectDB();
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image,
      date: Date.now(),
    });

    return NextResponse.json({
      success: true,
      message: 'Upload successful',
      newProduct,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
