import Link from 'next/link';

export default function CommonHeader() {
  return (
    <div className="w-full bg-[#cac3f8b3] h-[60px] flex flex-row justify-between items-center px-[16px] fixed">
      <Link href="/" className="text-[24px] text-[#FFFFFF] font-bold">
        끄적끄적
      </Link>
    </div>
  );
}
