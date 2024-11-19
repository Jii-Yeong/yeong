import { createContext, useRef } from 'react';
import { CommonToast, useToast } from '../../../index.ts';

type CommonToasterContextType = {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setIsShow: (isShow: boolean) => void;
};

export const CommonToasterContext = createContext<CommonToasterContextType>({
  setTitle: () => {},
  setDescription: () => {},
  setIsShow: () => {},
});

export default function CommonToaster() {
  const { toasts } = useToast();
  const toastRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      {toasts?.map((toast, index) => {
        return (
          <CommonToast
            key={toast.id}
            {...toast}
            index={index}
            height={toastRef.current?.offsetHeight}
            ref={toastRef}
          />
        );
      })}
    </div>
  );
}
