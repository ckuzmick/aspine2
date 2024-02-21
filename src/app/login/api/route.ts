'use server'

import puppeteer from 'puppeteer';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextApiRequest, res: NextResponse) {
    const { username, password } = req.body;

    const usernameString = String(username);
    const passwordString = String(password);

    let login_page;
    let pageText;

    try {
        login_page = await fetch("https://aspen.cpsd.us/aspen/logon.do")
        pageText = await login_page.text();

        const [, session_id] = /jsessionid=(.*?)"/.exec(
            pageText
        ) as RegExpExecArray;

        const [, apache_token] = /name="org.apache.struts.taglib.html.TOKEN" value="(.+)"/.exec(
            pageText
        ) as RegExpExecArray;

        const login_response = await (await fetch(
            "https://aspen.cpsd.us/aspen/logon.do", {
                headers: {
                    "Cookie": `JSESSIONID=${session_id}`,
                },
                method: "POST",
                redirect: "manual",
                body: new URLSearchParams({
                    "org.apache.struts.taglib.html.TOKEN": apache_token,
                    "userEvent": "930",
                    "deploymentId": "x2sis",
                    "username": username,
                    "password": password,
                }),
            }
        )).text();

        const classes_response = await (await fetch(
            "https://aspen.cpsd.us/aspen/home.do?tab=classpage&studentContext=false", {
                headers: {
                    "Cookie": `JSESSIONID=${session_id}`,
                },
                method: "GET",
            }
        )).text();

        console.log(classes_response)

        // Process the classes_response here

        return NextResponse.json({ text: `Classes response: ${classes_response}` }, { status: 200 });
    } catch (error) {
        console.error('Error during scraping:', error);
        if (res.status) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        } else {
            console.error('res object does not have a status function');
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}