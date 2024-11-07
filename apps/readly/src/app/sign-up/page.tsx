'use client';

import { signUpByDefaultMutation } from '@/service/auth.service';
import { getLoginPage } from '@/utils/route.utils';
import { CommonButton, CommonInput } from '@yeong/ui';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  id: string;
  password: string;
  verifyPassword: string;
  nickname: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutateAsync } = signUpByDefaultMutation();
  const router = useRouter();

  function replaceInputValue(e: InputEvent) {
    const element = e.target as HTMLInputElement;
    element.value = element.value.replace(/[^A-Za-z0-9]+$/gi, '');
  }

  const submitSignUpData: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({
      nickname: data.nickname,
      password: data.password,
      user_id: data.id,
    });
    router.push(getLoginPage());
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form
        onSubmit={handleSubmit(submitSignUpData)}
        className="flex flex-col gap-y-[26px] w-[400px]"
      >
        <h1 className="text-lg font-bold">회원가입</h1>
        <CommonInput
          placeholder="아이디"
          {...register('id', {
            required: '아이디는 필수 입력값 입니다.',
            onChange: replaceInputValue,
            minLength: {
              value: 6,
              message: '아이디는 6자 이상 입력하여야 합니다.',
            },
          })}
          alertText={errors.id?.message}
        />
        <CommonInput
          placeholder="비밀번호"
          {...register('password', {
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상 입력하여야 합니다.',
            },
            required: '비밀번호는 필수 입력값 입니다.',
            onChange: replaceInputValue,
          })}
          alertText={errors.password?.message}
          type="password"
        />
        <CommonInput
          placeholder="비밀번호 확인"
          {...register('verifyPassword', {
            required: '비밀번호 확인은 필수 입력값 입니다.',
            validate: (value, formValues) =>
              value === formValues.password || '비밀번호가 일치하지 않습니다.',
            onChange: replaceInputValue,
          })}
          alertText={errors.verifyPassword?.message}
          type="password"
        />
        <CommonInput
          placeholder="닉네임"
          {...register('nickname', {
            required: '닉네임은 필수 입력값 입니다.',
            maxLength: {
              value: 8,
              message: '닉네임은 8자 이하로 입력가능합니다.',
            },
          })}
          alertText={errors.nickname?.message}
        />
        <CommonButton
          text="회원가입"
          type="submit"
          className="bg-main border-transparent text-[18px] text-white font-bold"
        />
      </form>
    </div>
  );
}
