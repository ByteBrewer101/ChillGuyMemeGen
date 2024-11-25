import { SliderDemo } from "@/components/DemoSlider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState, ChangeEvent } from "react";
import { Image as KonvaImage, Layer, Rect, Stage, Text } from "react-konva";
import useImage from "use-image";
import chillguy from "../assets/chillguy.png";
import chillgirl from "../assets/chillgirl.png";
import Konva from "konva";


type StageRef = Konva.Stage | null;

export default function App() {
  //states
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [selectedImg, setSelectedImg] = useState<string>(chillguy);
  const [sImage] = useImage(selectedImg);
  const [text, setText] = useState<string>("Just a Chill placeholder");
  const [tempText, setTempText] = useState<string>("");
  const [textsize, setTextSize] = useState<number>(30);
  const [BackgroundImage, setBackgroundImage] = useState<string>("");
  const [image] = useImage(BackgroundImage);

  

  // refs
  const stageRef = useRef<StageRef>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); 


  //fns
  const handleColorChange = (color: string) => {
    setBackgroundImage("")
    setBgColor(color);

  };

  const handleChillGuySelect = () => {
    
    setSelectedImg(chillguy);
  };

  const handleChillGirlSelect = () => {
    setSelectedImg(chillgirl);
  };

  const handledownloadImage = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      const a = document.createElement("a");
      a.href = uri;
      a.download = "ChillMeme.png";
      a.click();
    }
  };

  const handleBackgroundImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempText(e.target.value);
    
  };
  //endfns

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="border border-gray-300 shadow-lg mb-4">
        <Stage width={400} height={300} ref={stageRef}>
          <Layer draggable={true}>
            {BackgroundImage === "" && (
              <Rect width={500} height={500} fill={bgColor} />
            )}
            {BackgroundImage && (
              <KonvaImage image={image} width={400} height={300} />
            )}
          </Layer>
          <Layer>
            <KonvaImage
              image={sImage}
              draggable={true}
              width={selectedImg === chillguy ? 500 : 200}
              height={250}
           
            />
          </Layer>

          <Layer>
            <Text
              draggable={true}
              text={text}
              fontSize={textsize}
              fontFamily="Comic Sans MS"
              fill="white"
              fontWeight="bold"
              stroke="black"
              strokeWidth={  (textsize/100)<2?2:(textsize/100)}
              width={300}
            />
          </Layer>
        </Stage>
      </div>

      <div className="p-4 space-y-5">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => handleColorChange("#87CEEB")}
          >
            Blue
          </Button>
          <Button
            variant="outline"
            onClick={() => handleColorChange("#98FB98")}
          >
            Green
          </Button>
          <Button
            variant="outline"
            onClick={() => handleColorChange("#FFD700")}
          >
            Yellow
          </Button>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleBackgroundImageUpload}
            />
            Custom
          </Button>
        </div>

        <div className="flex gap-2 items-center justify-around">
          <h1>I am a Chill</h1>
          <Button variant="outline" onClick={handleChillGuySelect}>
            Guy
          </Button>
          <Button variant="outline" onClick={handleChillGirlSelect}>
            Girl
          </Button>
        </div>

        <div className="flex gap-2 items-center justify-around">
          <Input
            type="text"
            placeholder="Enter some text"
            value={tempText}
            onChange={handleTextChange}
          />

          <Button variant="outline" onClick={() => {setText(tempText);setTempText("")}}>
            Add Text
          </Button>
        </div>

        <SliderDemo
          className="w-full"
          value={[textsize]}
          onValueChange={(value: number[]) => setTextSize(value[0])}
        />
      </div>

      <div className="flex space-x-4">
        <Button
          className="w-full bg-green-300"
          variant={"outline"}
          onClick={handledownloadImage}
        >
          Download Meme!
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            window.open("https://github.com/ByteBrewer101/ChillGuyMemeGen")
          }
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-6 fill-slate-900"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
            ></path>
          </svg>
        </Button>
      </div>
    </div>
  );
}
