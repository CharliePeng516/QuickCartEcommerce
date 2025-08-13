import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image
            className="w-28 md:w-32"
            src={assets.logo}
            alt="logo"
          />
          <ul className="mt-6 text-sm list-disc list-inside">
            <li>
              QuickCart is your trusted partner
              for fast, reliable, and
              user-friendly online shopping.
            </li>
            <li>
              We make online shopping fast, easy,
              and reliable.
            </li>
            <li>
              We provide great products and a
              smooth experience every time you
              shop with us.
            </li>
          </ul>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">
              Company
            </h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link
                  className="hover:underline transition"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline transition"
                  href="/all-products"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline transition"
                  href="/about"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  className="hover:underline transition"
                  href="#"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">
              Get in touch
            </h2>
            <div className="text-sm space-y-2">
              <p>+61-0413608688</p>
              <p>charliepeng516@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © Charlie All Right
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
