import {CATEGORY_LIST} from '@/constants/category.constants';
import {Icon} from '@iconify/react/dist/iconify.js';

type DefaultSidebarProps = {
  isShow?: boolean;
  onClickClose: () => void;
};

export default function DefaultSidebar({
  isShow,
  onClickClose,
}: DefaultSidebarProps) {
  return (
    <div
      className="fixed w-[300px] h-screen bg-white p-[16px] transition-all"
      style={{left: isShow ? '0' : '-300px'}}>
      <div className="w-full">
        <Icon
          icon="eva:menu-arrow-outline"
          onClick={onClickClose}
          width={35}
          className="float-right cursor-pointer"
        />
      </div>
      <div>
        {CATEGORY_LIST.map((item) => (
          <div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
