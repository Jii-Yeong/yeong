import {getPostMd} from '@/api/post.api';
import MdPost from '@/components/posts/MdPost';
import {POST_LIST} from '@/constants/post-list.constants';

interface PostProps {
  params: {
    id: string;
  };
}

export default async function Post({params}: PostProps) {
  const text = await getPostMd(String(params.id));
  const currentPost = POST_LIST.find((item) => item.id === params.id);

  return (
    <>
      <title>{currentPost?.title}</title>
      <div className="flex flex-col items-center w-full">
        <MdPost markdownText={text} postInfo={currentPost} />
      </div>
    </>
  );
}
