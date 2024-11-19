import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CommonToastProps } from '../components/toast/CommonToast/CommonToast.tsx';

type ToastStateType = {
  toasts: CommonToastProps[];
};

const ACTION_TYPES = {
  ADD: 'ADD',
  DISMISS: 'dismiss',
  DELETE: 'DELETE',
} as const;

type ToastAction = {
  id: string;
  type: (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];
  props: CommonToastProps;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

let listeners: Dispatch<SetStateAction<ToastStateType>>[] = [];
let memoryState: ToastStateType = { toasts: [] };

const reducer = (state: ToastStateType, action: ToastAction) => {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      return {
        toasts: [...state.toasts, { ...action.props, id: action.id }],
      };
    }
    case ACTION_TYPES.DISMISS: {
      return {
        toasts: state.toasts.map((toast) => {
          if (toast.id === action.id) {
            return {
              ...toast,
              isShow: false,
            };
          }
          return toast;
        }),
      };
    }
    case ACTION_TYPES.DELETE: {
      return {
        toasts: state.toasts.filter((toast) => toast.id !== action.id),
      };
    }
    default:
      return memoryState;
  }
};

const dispatch = (
  id: ToastAction['id'],
  type: ToastAction['type'],
  props?: CommonToastProps,
) => {
  memoryState = reducer(memoryState, { id, type, props: { ...props } });
  listeners.forEach((listener) => listener(memoryState));
};

const toast = (props: CommonToastProps) => {
  const id = genId();
  dispatch(id, ACTION_TYPES.ADD, props);
};

const dismiss = (id: ToastAction['id']) => {
  dispatch(id, ACTION_TYPES.DELETE);
};

export const useToast = () => {
  const [toastState, setToastState] = useState<ToastStateType>(memoryState);

  useEffect(() => {
    listeners.push(setToastState);
  }, [toastState]);

  return {
    ...toastState,
    toast,
    dismiss,
  };
};
