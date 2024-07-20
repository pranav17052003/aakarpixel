// middleware.ts or middleware.js

import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';

// Define Clerk middleware
const clerkHandler = clerkMiddleware({
  // Add other configuration options if necessary
});

// Middleware function
export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const publicRoutes = ['/', '/api/webhooks/clerk', '/api/webhooks/stripe'];
  const { pathname } = req.nextUrl;

  // Check if the route is public
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next(); // Allow public routes
  }

  // Apply Clerk middleware
  return clerkHandler(req, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
