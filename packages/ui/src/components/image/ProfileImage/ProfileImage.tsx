import { parseDomSizeValue } from '@yeong/utils/string';

type ProfileImageProps = {
  imageSrc?: string;
  size?: string | number;
};

export default function ProfileImage({
  imageSrc,
  size = 30,
}: ProfileImageProps) {
  return (
    <div
      className="relative w-10 rounded-full overflow-hidden border border-gray bg-white"
      style={{
        width: parseDomSizeValue(size),
        height: parseDomSizeValue(size),
      }}
    >
      {imageSrc && (
        <img src={imageSrc} alt="profile-image" className="w-full" />
      )}
    </div>
  );
}
