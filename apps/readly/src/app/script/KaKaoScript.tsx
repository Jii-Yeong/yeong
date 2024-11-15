'use client';

import Script from 'next/script';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KaKaoScript() {
  const onLoad = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
  };

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      async
      onLoad={onLoad}
    />
  );
}
