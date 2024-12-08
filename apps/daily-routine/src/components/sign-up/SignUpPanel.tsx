import DefaultInput from '@/components/input/DefaultInput/DefaultInput';
import {
  CONFIRM_PASSWORD_MESSAGE,
  EMAIL_CONFIRM_MESSAGE,
  PASSWORD_CONFIRM_MESSAGE,
} from '@/constants/auth-confirm-message.constants';
import { signUpWithPassword } from '@/supabase/auth';
import { getRootPage } from '@/utils/page.utils';
import { emailRegex } from '@/utils/regexp.utils';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthPanel from '../panel/AuthPanel/AuthPanel';
import './SignUpPanel.scoped.scss';

export default function SignUpPanel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [wrongEmailText, setWrongEmailText] = useState(
    EMAIL_CONFIRM_MESSAGE.emptyEmail
  );
  const [wrongPasswordText, setWrongPasswordText] = useState(
    PASSWORD_CONFIRM_MESSAGE.emptyPassword
  );
  const [wrongPasswordConfirmText, setWrongPasswordConfirmText] = useState(
    CONFIRM_PASSWORD_MESSAGE.emptyPasswordConfirm
  );
  const [isWrongEmail, setWrongEmail] = useState(false);
  const [isWrongPassword, setWrongPassword] = useState(false);
  const [isWrongPasswordComfirm, setWrongPasswordConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSetEmail = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setEmail(element.value);

    if (!element.value) {
      setWrongEmail(true);
      setWrongEmailText(EMAIL_CONFIRM_MESSAGE.emptyEmail);
    } else if (!emailRegex.test(element.value)) {
      setWrongEmail(true);
      setWrongEmailText(EMAIL_CONFIRM_MESSAGE.unstyledEmail);
    } else {
      setWrongEmail(false);
    }
  };

  const handleSetPassword = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setPassword(element.value);

    if (!element.value) {
      setWrongPassword(true);
      setWrongPasswordText(PASSWORD_CONFIRM_MESSAGE.emptyPassword);
    } else if (element.value.length < 6) {
      setWrongPassword(true);
      setWrongPasswordText(PASSWORD_CONFIRM_MESSAGE.wrongPasswordLength);
    } else {
      setWrongPassword(false);
    }
  };
  const handleSetPasswordConfirm = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setPasswordConfirm(element.value);

    if (!element.value) {
      setWrongPasswordConfirm(true);
      setWrongPasswordConfirmText(
        CONFIRM_PASSWORD_MESSAGE.emptyPasswordConfirm
      );
    } else if (password !== element.value) {
      setWrongPasswordConfirm(true);
      setWrongPasswordConfirmText(
        CONFIRM_PASSWORD_MESSAGE.notMathPasswordConfirm
      );
    } else {
      setWrongPasswordConfirm(false);
    }
  };

  const handleClickSignUpButton = () => {
    if (
      !email ||
      !password ||
      !passwordConfirm ||
      isWrongEmail ||
      isWrongPassword ||
      isWrongPasswordComfirm
    )
      return;

    signUpWithPassword(email, password).then(() => {
      alert(
        '해당 이메일로 회원가입 확인 메일을 보내드렸으니 확인 부탁드립니다.'
      );
    });
  };

  const handleClickChangePage = () => {
    navigate(getRootPage());
  };

  return (
    <AuthPanel
      clickSubmitButton={handleClickSignUpButton}
      clickChangePage={handleClickChangePage}
      authButtonText="회원가입"
      changePageText="아이디가 있으신가요? 로그인 하러가기"
    >
      <DefaultInput
        inputValue={email}
        changeInput={handleSetEmail}
        height={40}
        placeholder="이메일"
        type="email"
        isWrong={isWrongEmail}
        wrongText={wrongEmailText}
      />
      <DefaultInput
        inputValue={password}
        changeInput={handleSetPassword}
        height={40}
        placeholder="비밀번호"
        type="password"
        isWrong={isWrongPassword}
        wrongText={wrongPasswordText}
      />
      <DefaultInput
        inputValue={passwordConfirm}
        changeInput={handleSetPasswordConfirm}
        height={40}
        placeholder="비밀번호 확인"
        type="password"
        isWrong={isWrongPasswordComfirm}
        wrongText={wrongPasswordConfirmText}
      />
    </AuthPanel>
  );
}
