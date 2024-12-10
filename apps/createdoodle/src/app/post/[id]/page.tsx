import {getPostMd} from '@/api/post.api';
import MdPost from '@/components/posts/MdPost';

interface PostProps {
  params: {
    id: string;
  };
}

export default async function Post({params}: PostProps) {
  const text = await getPostMd(String(params.id));

  return (
    <div className="flex flex-col items-center w-full">
      <MdPost markdownText={text} postId={params.id} />
    </div>
  );
}
