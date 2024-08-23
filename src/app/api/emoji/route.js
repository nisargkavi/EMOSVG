import { NextResponse } from "next/server";
import { parse } from '@twemoji/parser';

export async function GET(req, res) {
  try {
    const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);
    const emoji = url.searchParams.get("emoji");
    const parsedEmoji = parse(emoji ? emoji : decodeURIComponent(url.pathname));

    if (parsedEmoji.length === 0) throw new Error('Emoji not found!');

    const response = await fetch(parsedEmoji[0].url);
    const buffer = Buffer.from(await response.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": response.headers.get("Content-Type"),
      },
      status: 200,
    });
  } catch (e) {
    return new NextResponse(
      { message: "Server error, please try again!" },
      { status: 500 }
    );
  }
}
