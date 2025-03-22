import { Root } from '@/client/root'

export const runtime = 'edge';

export default async function RootURL({
  params,
}: {
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params

  return (
    <Root lng={lng} />
  )
}
