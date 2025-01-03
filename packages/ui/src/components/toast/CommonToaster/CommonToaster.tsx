import CommonToast from '#components/toast/CommonToast/CommonToast.tsx';
import { useToast } from '#hooks/useToast.tsx';

export default function CommonToaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-[16px] right-0 flex flex-col gap-y-[16px]">
      {toasts?.map((toast) => {
        return <CommonToast key={toast.id} {...toast} />;
      })}
    </div>
  );
}
