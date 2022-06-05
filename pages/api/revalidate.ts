import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('HOLA', _req.body);
  const {event, url} = JSON.parse(_req.body);

  console.log(event, url);

  if (event === 'revalidate_date') {
    await res.unstable_revalidate(url);
  }

  return res.status(200).json({revalidated: true});
}
