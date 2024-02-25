// Use server environment
"use server";

import { chromium } from "playwright"; // Import chromium for Playwright
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Function to create a delay
function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// Async function to handle POST requests
export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  console.log(reqBody);

  const { username, password } = reqBody;

  const usernameString = String(username);
  const passwordString = String(password);

  try {
    // Launch the browser using Playwright's chromium instance
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the login page
    await page.goto("https://aspen.cpsd.us/aspen/logon.do", {
      waitUntil: "networkidle",
    });

    // Enter login credentials and submit
    await page.fill("#username", usernameString);
    await page.fill("#password", passwordString);
    await page.click("#logonButton");

    // Wait for navigation after login
    await delay(4000);

    // Navigate to the classes page
    await page.goto(
      "https://aspen.cpsd.us/aspen/portalClassList.do?navkey=academics.classes.list",
    );

    // Scrape class information
    const classes = await page.evaluate(() => {
      const classRows = document.querySelectorAll(
        "table > tbody > tr.listCell",
      );
      return Array.from(classRows).map((row) => {
        const className = row
          .querySelector("td:nth-child(6)")
          ?.textContent?.trim();
        const teacherName = row
          .querySelector("td:nth-child(4)")
          ?.textContent?.trim();
        const room = row.querySelector("td:nth-child(5)")?.textContent?.trim();
        const grade = row.querySelector("td:nth-child(8)")?.textContent?.trim();

        return { className, teacherName, room, grade };
      });
    });

    console.log(classes);

    // Close the browser
    await browser.close();

    // Return the scraped class information as JSON
    return new NextResponse(JSON.stringify({ text: classes }), { status: 200 });
  } catch (error) {
    console.error("Error during scraping:", error);
    // Return a 500 Internal Server Error response if an error occurs
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
