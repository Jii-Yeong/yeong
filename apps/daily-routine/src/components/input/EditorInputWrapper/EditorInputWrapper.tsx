import EditorInput from '@/components/input/EditorInput/EditorInput';
import './EditorInputWrapper.scoped.scss';
import { CommonButton } from '@yeong/ui';

type EditorInputWrapperProps = {
  editorValue: string;
  setEditorValue: (value: string) => void;
  clickSubmitButton: () => void;
  clickCancelButton: () => void;
};

export default function EditorInputWrapper({
  editorValue,
  setEditorValue,
  clickCancelButton,
  clickSubmitButton,
}: EditorInputWrapperProps) {
  return (
    <div className="todo-input-container">
      <EditorInput value={editorValue} setValue={setEditorValue} />
      <div className="control-button">
        <CommonButton onClick={clickSubmitButton} variant="outline">
          입력
        </CommonButton>
        <CommonButton onClick={clickCancelButton} variant="outline">
          취소
        </CommonButton>
      </div>
    </div>
  );
}
