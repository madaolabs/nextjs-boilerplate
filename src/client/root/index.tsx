'use client'

import { Redeem } from "./components/Redeem";
// import IconButton from '@mui/material/IconButton';
// import XIcon from '@mui/icons-material/X';
// import Image from "next/image";
import { RenderFeatureExplanation } from "./components/FeatureExplanation";

export function Root({ lng }: { lng: string }) {
    // 装饰性波浪背景组件
    const WaveBackground = () => (
        <div className="absolute inset-0 overflow-hidden z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full opacity-20">
                <path fill="#818cf8" fillOpacity="1" d="M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full opacity-10">
                <path fill="#4f46e5" fillOpacity="1" d="M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,117.3C672,107,768,149,864,186.7C960,224,1056,256,1152,245.3C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
    );
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4 relative">
                <Redeem lng={lng} />
                <WaveBackground />
                {/* 装饰性元素 - 圆形 */}
                <div className="absolute top-1/4 left-10 w-12 h-12 rounded-full bg-purple-200 opacity-50 z-0"></div>
                <div className="absolute bottom-1/3 right-12 w-20 h-20 rounded-full bg-indigo-200 opacity-50 z-0"></div>
                <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-blue-200 opacity-40 z-0"></div>

            </div>
            {/* 功能说明部分 */}
            <RenderFeatureExplanation lng={lng} />
        </>
    )
}
