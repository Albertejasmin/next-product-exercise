import Head from "next/head";

export default function Products({ product }) {
  return (
    <>
      <Head>
        <title>{product.id}</title>
      </Head>
      <h2>{product.productdisplayname}</h2>
      <p>{product.price},-</p>
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const api = "https://kea-alt-del.dk/t7/api/products/" + id;
  const res = await fetch(api);
  //  If no data - no page found
  if (res.status != 200) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();

  return {
    props: {
      product: data,
    },
  };
}
export async function getStaticPaths() {
  const api = "https://kea-alt-del.dk/t7/api/products";
  const res = await fetch(api);
  const data = await res.json();

  const paths = data.map((object) => {
    return { params: { id: String(object.id) } };
  });

  return {
    paths,
    fallback: false,
  };
}
