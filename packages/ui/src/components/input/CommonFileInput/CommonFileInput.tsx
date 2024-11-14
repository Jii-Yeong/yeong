import { Icon } from '@iconify/react/dist/iconify.js';
import { UI_COLORS } from '../../../constants/color.constants.ts';
import { ChangeEvent, useState } from 'react';

type CommonFileInputProps = {
  onChange: (files: FileList | null) => void;
};

export default function CommonFileInput({ onChange }: CommonFileInputProps) {
  const [fileName, setFileName] = useState('');
  const handleChangeInput = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    const files = element.files;

    if (!files) return;
    onChange(element.files);

    const file = files[0];

    if (!file) return;
    setFileName(file.name);
  };

  return (
    <div className="h-[40px] bg-white border border-gray border-solid rounded-[8px]">
      <label
        htmlFor="common-file"
        className="p-[8px] flex flex-row items-center gap-x-[8px] cursor-pointer"
      >
        <Icon
          icon="line-md:file-filled"
          width={20}
          color={UI_COLORS.darkGray}
        />
        <p>{fileName || '파일 업로드'}</p>
      </label>
      <input
        type="file"
        id="common-file"
        className="hidden"
        onChange={handleChangeInput}
      />
    </div>
  );
}
