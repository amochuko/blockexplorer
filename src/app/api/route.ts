import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');


  // To set Heades, send your Response
  return new Response('Hello, Nextjs', {
    status: 200,
    headers: { 'set-Cookie': `token=${token?.value}` },
  });
  
}


export async function HEAD(request: Request) {}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}