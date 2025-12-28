// route user to analytics page 

import { NextResponse } from "next/server";

export default function middleware(req: Request) {
    return NextResponse.redirect(new URL('/dashboard/analytics', req.url));
}
