import client from "@/lib/sanityClient";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 16px;
  padding: 32px;
`;

const Card = styled.div`
  padding: 32px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.05);
`;

export default function Home({ posts }) {
  console.log(posts);
  console.log("coucou");
  return (
    <Container>
      {posts.map((post) => {
        return (
          <Card key={post.id}>
            <h1>{post.title}</h1>

            <Image src={post.imageUrl} width={500} height={400} />
          </Card>
        );
      })}
      <Card>test</Card>
    </Container>
  );
}

export async function getStaticProps() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      'id': _id,
      slug,
      title,
      "imageUrl": mainImage.asset->url
    }
    `;
  const posts = await client.fetch(query);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
