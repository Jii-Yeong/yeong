import AddButton from '@/components/button/AddButton/AddButton';
import { useState } from 'react';
import TodoInput from '../TodoInput/TodoInput';
import './CategoryInput.scoped.scss';
import { CommonButton } from '@yeong/ui';

type CategoryInput = {
  setCategoryValue: (name: string) => void;
};

export default function CategoryInput({ setCategoryValue }: CategoryInput) {
  const [isClick, setIsClick] = useState(false);

  const handleClickCancelButton = () => {
    setIsClick(false);
  };

  const handleClickAddButton = () => {
    setIsClick(true);
  };
  return (
    <div className="category-input">
      {isClick ? (
        <div className="default-input">
          <div className="todo-input-wrapper">
            <TodoInput buttonText="추가" setTodoItemValue={setCategoryValue} />
          </div>
          <CommonButton
            onClick={handleClickCancelButton}
            variant="outline"
            className="text-md"
          >
            취소
          </CommonButton>
        </div>
      ) : (
        <AddButton text="카테고리 추가" clickAddButton={handleClickAddButton} />
      )}
    </div>
  );
}
