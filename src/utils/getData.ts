import 'server-only';

export async function getData() {
  try {
    const res = await fetch('https://www.jsonplaceholder.com', {
      headers: {
        authorization: String(process.env.API_KEY),
      },
    });

    return res.json();
  } catch (err: any) {
    throw err.message;
  }
}
