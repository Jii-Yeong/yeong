export const getPostMd = async (id: string) => {
  const response = await fetch(`http://localhost:3001/posts/${id}.md`);
  return response.text();
};
