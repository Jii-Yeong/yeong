export const getPostMd = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/posts/${id}.md`);
  return response.text();
};
