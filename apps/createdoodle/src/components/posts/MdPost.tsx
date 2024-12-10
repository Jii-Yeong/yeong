'use client';

import 'katex/dist/katex.min.css';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import './MdPost.scss';

type MdPostProps = {
  markdownText: string;
};

export default function MdPost({markdownText}: MdPostProps) {
  return (
    <div className="md-post bg-white rounded-2xl p-[24px] sm:p-16 w-full lg:max-w-[1000px]">
      <Markdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          img(props) {
            return (
              <img
                src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/${props.src}`}
                alt={`${props.alt}`}
              />
            );
          },
          code(props) {
            const {children, className, node, ref, ...rest} = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                style={a11yDark}
                PreTag="div"
                language={match[1]}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
          ol(props) {
            return <ol>{props.children}</ol>;
          },
          blockquote(props) {
            return (
              <div className="left-line flex flex-row items-center my-[8px]">
                <p className="px-[8px] text-[#999999] leading-8">
                  {props.children}
                </p>
              </div>
            );
          },
        }}>
        {markdownText}
      </Markdown>
    </div>
  );
}
