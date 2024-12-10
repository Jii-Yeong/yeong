'use client';

import {getPostMd} from '@/api/post.api';
import MdPost from '@/components/posts/MdPost';
import PostSkeleton from '@/components/skeleton/PostSkeleton';
import {useParams} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';

export default function Post() {
  const [markdownText, setMarkdownText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const {id} = useParams();

  const getMarkdownText = useCallback(async () => {
    setIsLoading(true);
    const text = await getPostMd(String(id));
    setMarkdownText(text);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    getMarkdownText();
  }, [getMarkdownText]);

  return (
    <div className="flex flex-col items-center w-full">
      {isLoading ? <PostSkeleton /> : <MdPost markdownText={markdownText} />}
    </div>
  );
}
