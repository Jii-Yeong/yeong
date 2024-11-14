import { CommonChip, CommonChipProps } from '@yeong/ui';
import { useRouter, useSearchParams } from 'next/navigation';

type BookCategoryChipProps = {
  path?: string;
} & CommonChipProps;

export default function BookCategoryChip({
  path = '/',
  ...rest
}: BookCategoryChipProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const clickCategoryChip = (value: string) => {
    currentParams.set('category_id', value);
    router.push(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}${path}?${currentParams.toString()}`,
    );
  };

  return (
    <div>
      <CommonChip onClick={clickCategoryChip} {...rest} />
    </div>
  );
}
