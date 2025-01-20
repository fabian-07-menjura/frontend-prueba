type Params = Promise<{ categoriaId: string }>;

export default async function page({ params }: { params: Params }) {
  const { categoriaId } = await params;
  console.log(categoriaId);
  return <div>page</div>;
}
