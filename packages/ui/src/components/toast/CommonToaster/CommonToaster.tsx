import { CommonToast, useToast } from '../../../index.ts';

export default function CommonToaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-[16px] right-0 flex flex-col gap-y-[16px]">
      {toasts?.map((toast, index) => {
        return <CommonToast key={toast.id} {...toast} />;
      })}
    </div>
  );
}
