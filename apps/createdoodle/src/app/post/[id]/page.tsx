import { getPostMd } from '@/api/post.api';
import MdPost from '@/components/posts/MdPost';
import { POST_LIST } from '@/constants/post-list.constants';
import { Metadata } from 'next';

interface PostProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const currentPost = POST_LIST.find((item) => item.id === params.id);

  return {
    title: currentPost?.title || '끄적끄적',
    description: currentPost?.description || '',
    openGraph: {
      title: currentPost?.title || '끄적끄적',
      description: currentPost?.description || '',
      siteName: '끄적끄적',
      images: `${process.env.NEXT_PUBLIC_CLIENT_URL}/images/profile-image.png`,
      type: 'website',
    },
  };
}

export default async function Post({ params }: PostProps) {
  const text = await getPostMd(String(params.id));
  const currentPost = POST_LIST.find((item) => item.id === params.id);

  return (
    <>
      <title>{currentPost?.title || ''}</title>
      <div className="flex flex-col items-center w-full">
        <MdPost markdownText={text} postInfo={currentPost} />
      </div>
    </>
  );
}
