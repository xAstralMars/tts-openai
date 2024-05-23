"use client";

import { TextToSpeech } from "@/actions/tts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Download, Play, Volume2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  ChangeEvent,
  ElementRef,
  useRef,
  useState,
  useTransition,
} from "react";
import fileDownload from "js-file-download";

export default function Home() {
  const [isLoading, startTransition] = useTransition();
  const [text, setText] = useState("");
  const [generated, setGenerated] = useState<string | null>();
  const [file, setFile] = useState<any>();

  async function speak() {
    startTransition(() => {
      TextToSpeech(text).then((value) => {
        fileDownload(value.buffer, `${text}.mp3`);
      });
    });
  }

  async function play() {
    const audioURL = URL.createObjectURL(file); // Create a URL for the file
    console.log(audioURL);
    const audio = new Audio(audioURL); // Create an Audio object with the URL

    audio.play(); // Play the audio
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12 md:p-24 lg:p-48 xl:p-72 2xl:p-96 gap-6">
      <div className="border rounded-lg w-full bg-white/20 p-4 flex gap-4">
        <Input placeholder="Text" onChange={(e) => setText(e.target.value)} />
        <Button disabled={isLoading} onClick={speak}>
          <Volume2 className="h-5 w-5 mr-2" />
          Speak
        </Button>
      </div>
      <div className="border rounded-lg w-full bg-white/20 p-4 flex gap-4">
        <Input
          placeholder="Audio"
          type="file"
          onChange={(e) => {
            console.log(e.target.files![0], typeof e.target.files![0]);
            setFile(e.target.files![0]);
          }}
          accept="audio/*"
        />
        <Button disabled={isLoading} onClick={play}>
          <Play className="h-5 w-5 mr-2" />
          Play
        </Button>
      </div>
      {/* <div className="border rounded-lg bg-white/20 p-4 flex gap-4 mt-8">
        <Link
          className={cn(
            generated == null ? "cursor-default" : "cursor-pointer"
          )}
          href={generated ?? ""}
          download={`${text}.mp3`}
        >
          <Button disabled={generated == null}>
            <Download className="h-5 w-5 mr-2" />
            Download Audio
          </Button>
        </Link>
      </div> */}
    </div>
  );
}
