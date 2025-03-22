import { getDictionary } from "@/i18n";

// 功能说明组件 - 连接钱包图标
const ConnectFeatureIcon = () => (
    <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    </div>
);

// 功能说明组件 - 余额图标
const BalanceFeatureIcon = () => (
    <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
    </div>
);

// 功能说明组件 - 赎回图标
const RedeemFeatureIcon = () => (
    <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
);

// 渲染功能说明部分
export const RenderFeatureExplanation = ({ lng }: { lng: string }) => {
    const t = getDictionary(lng);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full mx-auto mt-12 relative z-10">
            <h2 className="text-2xl font-bold text-center text-indigo-800 mb-8">{t.featureTitle}</h2>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                    <ConnectFeatureIcon />
                    <h3 className="text-lg font-semibold mb-2 text-indigo-700">{t.feature1Title}</h3>
                    <p className="text-gray-600">{t.feature1Desc}</p>
                </div>

                <div className="text-center">
                    <BalanceFeatureIcon />
                    <h3 className="text-lg font-semibold mb-2 text-indigo-700">{t.feature2Title}</h3>
                    <p className="text-gray-600">{t.feature2Desc}</p>
                </div>

                <div className="text-center">
                    <RedeemFeatureIcon />
                    <h3 className="text-lg font-semibold mb-2 text-indigo-700">{t.feature3Title}</h3>
                    <p className="text-gray-600">{t.feature3Desc}</p>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-500 text-sm">{t.securityNote}</p>
                <a href="https://epochx.network" className="inline-block mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    {t.learnMore} →
                </a>
            </div>
        </div>
    )
};