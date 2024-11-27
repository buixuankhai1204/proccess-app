// @ts-ignore
export async function POST({request}) {
    const steps = await request.json();
    console.log('Steps:', steps);
    return new Response(JSON.stringify({success: true}));
}
