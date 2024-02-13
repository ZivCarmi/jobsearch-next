import { NextResponse } from "next/server";

import { verify } from "./server/utils/jwt";

const seekerRoutes = ["/api/seeker", "/api/upload/resume", "/myaccount"];
const employerRoutes = ["/api/employer", "/managepanel", "/hire"];

export const config = {
  matcher: [
    "/api/jobs/:path*",
    "/api/employer/:path*",
    "/api/seeker/:path*",
    "/api/upload/:path*",
    "/login",
    "/register",
    "/myaccount/:path*",
    "/managepanel/:path*",
    "/complete-registration",
    "/hire",
    "/jobs",
    "/jobs/:path*/apply",
  ],
};

const middleware = async (request) => {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  console.log("In middleware", pathname);

  // Authenticated users that visit the login and register pages will be redirected to home page.
  if (pathname === "/login" || pathname === "/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }

  try {
    const { userInfo } = await verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = userInfo._id;
    const userType = userInfo.type;
    const isUserVerified = userInfo.verified;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("uid", userId);
    requestHeaders.set("utype", userType);

    const isEmployerRoute = employerRoutes.some((route) =>
      route.startsWith(pathname)
    );

    const isSeekerRoute = seekerRoutes.some((route) =>
      route.startsWith(pathname)
    );

    if (isSeekerRoute) {
      // Employer that try to visit seeker routes
      if (userType !== "seeker") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (
        userType === "seeker" &&
        pathname !== "/api/seeker" &&
        !isUserVerified
      ) {
        return NextResponse.redirect(
          new URL("/complete-registration", request.url)
        );
      }
    }

    if (isEmployerRoute) {
      // Seeker that try to visit employer routes
      if (userType !== "employer") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (
        userType === "employer" &&
        pathname !== "/api/employer" &&
        !isUserVerified
      ) {
        return NextResponse.redirect(
          new URL("/complete-registration", request.url)
        );
      }
    }

    if (pathname === "/complete-registration" && isUserVerified) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.log("in catch");
    if (request.method === "GET") {
      console.log("in request get");
      if (pathname.startsWith("/api/jobs") || pathname.startsWith("/jobs")) {
        console.log("passed, in /jobs if");

        return NextResponse.next();
      }
    }

    // Unauthenticated users that visit protected routes will be redirected to the login page.
    return NextResponse.redirect(
      new URL(`/login?from=${request.url}`, request.url)
    );
  }
};

export default middleware;
