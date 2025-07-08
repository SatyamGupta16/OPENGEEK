import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Add pathname to headers
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: '/:path*',
} 