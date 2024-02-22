import React from "react";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextResponse) {
    const rawPage = await fetch("https://aspen.cpsd.us/aspen/rest/lists/academics.classes.list/studentGradeTerms", {
        method: "GET",
        mode: "cors",
        headers: {
            "Cookie": `JSESSIONID=${req.cookies.JSESSIONID}`
        }
    })

    const page = await rawPage.text();

    console.log(page);

    return NextResponse.json({ text: `Scraping is good, page: ${JSON.stringify(page)}` }, { status: 200 });
}