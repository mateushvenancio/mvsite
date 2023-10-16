export default async function BlogPage({ params: { pid } }: any) {
    const response = await fetch(`http://localhost:3000/api/blog/${pid}`);
    const json = await response.json();
    console.log('json', json);

    return <div className="">BlogPage {pid}</div>;
}
