'use server'

import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextApiRequest, res: NextResponse) {
    const session_id = cookies().get("JSESSIONID");

    const response = await fetch(
        "https://aspen.cpsd.us/aspen/rest/users/students", {
          headers: {
            "Cookie": `JSESSIONID=${session_id}`,
          },
        }
    );

    const classes = await response.json(); // Parse the response as JSON

    console.log(classes);
    
    return NextResponse.json({ text: `Scraping is good, classes: ${JSON.stringify(classes)}` }, { status: 200 });
};