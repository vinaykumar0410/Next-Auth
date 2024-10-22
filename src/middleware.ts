import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/' || path === '/login' || path === '/logout'  || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || ''

    if(isPublicPath && token) return NextResponse.redirect(new URL('/profile',request.nextUrl))

    if(!isPublicPath && !token) return NextResponse.redirect(new URL('/login',request.nextUrl))
}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/logout',
    '/profile',
    '/profile/:id',
    '/verifyemail'
  ]
}