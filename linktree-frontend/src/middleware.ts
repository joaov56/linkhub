import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes  = [{path: '/login', whenAuthenticated: 'redirect'}, {path: '/signup', whenAuthenticated: 'redirect'}, {path: '/pricing', whenAuthenticated: 'next'}] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get('token')

  console.log(request.cookies);
  

  if(!authToken && publicRoute){
    return NextResponse.next()
  }

  if(!authToken && !publicRoute){
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = '/dashboard';

    return NextResponse.redirect(redirectUrl);
  }

  if(authToken && !publicRoute){
    // Checar se o jwt está expirado
    // Se sim remover o cookie e redirecionar o usuário para o login

    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}