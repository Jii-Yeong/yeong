import { useState } from 'react';
import './TodoInput.scoped.scss';
import { CommonButton, CommonInput } from '@yeong/ui';

type TodoInputProps = {
  setTodoItemValue: (text: string) => void;
  defaultInputValue?: string;
  buttonText: string;
  buttonFontSize?: string | number;
};

export default function TodoInput({
  setTodoItemValue,
  defaultInputValue = '',
  buttonText,
}: TodoInputProps) {
  const [inputText, setInputText] = useState(defaultInputValue);
  const [alertText, setAlertText] = useState('');

  const changeInput = (value: string) => {
    setInputText(value);
  };
  const clickTodoItemButton = () => {
    if (inputText.length <= 0) {
      setAlertText('카테고리 제목을 입력해주세요.');
      return;
    }
    setTodoItemValue(inputText);
  };

  const enterTodoItem = () => {
    if (inputText.length <= 0) {
      setAlertText('카테고리 제목을 입력해주세요.');
      return;
    }
    setTodoItemValue(inputText);
  };
  return (
    <div className="todo-input">
      <div className="input-container">
        <CommonInput
          value={inputText}
          onChangeValue={changeInput}
          onEnter={enterTodoItem}
          alertText={alertText}
          placeholder="카테고리 제목"
        />
      </div>
      <CommonButton
        onClick={clickTodoItemButton}
        className="text-md"
        variant="outline"
      >
        {buttonText}
      </CommonButton>
    </div>
  );
}
