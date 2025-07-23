import { NextRequest, NextResponse } from 'next/server';
import {jwtVerify} from 'jose'
export async function middleware(req: NextRequest) {
  let token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone()
  const regex = /^\/blog\/[^\/]+$/;
  if (!token) {
    if (regex.test(url.pathname)) {
      url.searchParams.set('unauth', 'false');
      return NextResponse.rewrite(url);
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }
  try {
    //jwt.verify(token as string, process.env.JWT_SECRET??'');
    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? '');
    await jwtVerify(token, secret);
    //const response = NextResponse.next();
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/home/:path*','/blog/:path*','/user/:path*'],
};
