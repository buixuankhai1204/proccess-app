export async function GET() {
    return new Response(JSON.stringify([
        {id: 1, name: 'Request A', status: 'Pending', creator: 'User 1'},
        {id: 2, name: 'Request B', status: 'Accepted', creator: 'User 2'}
    ]));
}

// @ts-ignore
export async function POST({request}) {
    const data = await request.json();
    console.log('New Request:', data);
    return new Response(JSON.stringify({success: true}));
}
