import { NextRequest } from "next/server";
import { createI18nMiddleware } from 'next-international/middleware'
import { fallbackLng, languages } from "@/i18n/settings";


const I18nMiddleware = createI18nMiddleware({
    locales: languages,
    defaultLocale: fallbackLng
})

export const config = {
    matcher: [
        // 匹配所有路径，除了静态文件和API路由
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

export function middleware(req: NextRequest) {

    return I18nMiddleware(req);

} 