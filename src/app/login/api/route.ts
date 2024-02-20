'use server'

import puppeteer from 'puppeteer';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest, res: NextResponse) {
    const { username, password } = req.body;
    try {
        const usernameString = String(username);
        const passwordString = String(password);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('https://aspen.cpsd.us/aspen/logon.do');

        await page.type('input[name="username"]', usernameString);
        await page.type('input[name="password"]', passwordString);
        await Promise.all([
            page.click('button[type="submit"]'),
        ]);

        const pageTitle = await page.title();
        console.log('Logged in, current page title:', pageTitle);

        const aspenCookies = await page.cookies();

        await browser.close();

        return NextResponse.json({ text: `Scraping is good, cookies: ${JSON.stringify(aspenCookies)}` }, { status: 200 })
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