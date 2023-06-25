"use client";
import React, { useEffect , useState } from "react";
import Image from "next/image";
import { parse } from "twemoji-parser"

const reponsePage = ({ params }) => {
    const [isEmoji, setIsEmoji] = useState(false);
    const [emojiSVG, setEmojiSVG] = useState(null);
    const { emoji } = params;

    useEffect(() => {
        const path = decodeURIComponent(emoji).replace("/", "");
        const Emoji = parse(path);
        console.log(Emoji[0]);
        if (Emoji.length === 0) {
            setIsEmoji(false);
            setEmojiSVG('Not Valid Request !');
        } else {
            document.title = Emoji[0].text;
            setIsEmoji(true);
            setEmojiSVG(Emoji[0].url);
        }
    }, [emoji]);

    return (
        <>
            { isEmoji ? <Image src={emojiSVG} width={0} height={0} alt="EmojiSVG" style={{ width: '100vw', height: '100vh' }} /> : <pre>{emojiSVG}</pre> }
        </>
    )
}

export default reponsePage;