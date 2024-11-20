import { CommonToast, useToast } from '../../../index.ts';

export default function CommonToaster() {
  const { toasts } = useToast();

  return (
    <div className="absolute right-0 top-[16px] flex flex-col gap-y-[16px]">
      {toasts?.map((toast, index) => {
        return <CommonToast key={toast.id} {...toast} />;
      })}
    </div>
  );
}
