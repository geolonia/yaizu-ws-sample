import { useState, useEffect } from 'react';
import { useQRCode } from 'next-qrcode';

function Qrcode(props: { url: string }) {

  const { url } = props;
  const { Canvas } = useQRCode();
  const [shortUrl, setShortUrl] = useState<string>('');

  useEffect(() => {
    fetch('https://s.naoki-is.me', {
      method: 'POST',
      body: JSON.stringify({ url })
    })
      .then(res => res.json())
      .then(data => setShortUrl(data.shortUrl))
      .catch(err => console.error(err))
  }, [url])

  console.log('shortUrl', shortUrl);

  return (
    <>
      {
        shortUrl && (
          <Canvas
            text={shortUrl}
            options={{
              type: 'image/png',
              margin: 0,
              width: 128
            }}
          />)
      }
    </>
  );
}

export default Qrcode;
