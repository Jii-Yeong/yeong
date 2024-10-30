import { parseDomSizeValue } from '@/utils/string.utils'
import Image, { StaticImageData } from 'next/image'

type ProfileImageProps = {
  imageSrc?: string | StaticImageData
  size?: string | number
}

const defaultImageSrc = '/images/users/default-profile-image.webp'

export default function ProfileImage({
  imageSrc = defaultImageSrc,
  size = 30,
}: ProfileImageProps) {
  return (
    <div
      className="relative w-10 rounded-full overflow-hidden"
      style={{
        width: parseDomSizeValue(size),
        height: parseDomSizeValue(size),
      }}>
      <Image src={imageSrc} alt="profile-image" fill />
    </div>
  )
}
