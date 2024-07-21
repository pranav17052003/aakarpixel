import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Make sure that the `/api/webhooks/(.*)` route is not protected here
const isPublicRoute = createRouteMatcher(['/', '/api/webhooks/clerk'])
export default clerkMiddleware((auth, req)=>{
  if(!isPublicRoute(req))auth().protect();
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};