import { NextResponse } from "next/server";



export function middleware(request) {
    console.log("Request Pathname:", request.nextUrl.pathname);
    if (request.nextUrl.pathname != '/login') {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    else if (request.nextUrl.pathname == '/login') {
        return NextResponse.json({ Success: 'This is the next url' })
    }
}



export const config = {
    matcher: ["/userlist/:path*"]
}