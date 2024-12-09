import BackgroundShadow from '@/components/background/BackgroundShadow/BackgroundShadow';
import { modalState } from '@/recoil/modal/modal';
import { useRecoilState } from 'recoil';
import './ConfirmModal.scoped.scss';
import { CommonButton } from '@yeong/ui';

export default function ConfirmModal() {
  const [modal] = useRecoilState(modalState);
  return (
    <BackgroundShadow>
      <div className="default-modal-container">
        <p className="confirm-text">{modal.text}</p>
        <div className="button-container">
          <CommonButton onClick={modal.clickOkButton} variant="outline">
            확인
          </CommonButton>
          <CommonButton onClick={modal.clickCalcenButton} variant="outline">
            취소
          </CommonButton>
        </div>
      </div>
    </BackgroundShadow>
  );
}
