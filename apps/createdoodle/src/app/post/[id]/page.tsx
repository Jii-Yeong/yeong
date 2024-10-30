'use client';

import {getPostMd} from '@/api/post.api';
import MdPost from '@/components/posts/MdPost';
import {useParams} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';

export default function Post() {
  const [markdownText, setMarkdownText] = useState('');
  const {id} = useParams();

  const getMarkdownText = useCallback(async () => {
    const text = await getPostMd(String(id));
    setMarkdownText(text);
  }, [id]);

  useEffect(() => {
    getMarkdownText();
  }, [getMarkdownText]);

  return (
    <div className="flex flex-col items-center">
      <MdPost markdownText={markdownText} />
    </div>
  );
}
