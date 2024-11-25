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
          <Layer draggable={true} >
            {BackgroundImage === "" && (
              <Rect width={500} height={500} fill={bgColor} />
            )}
            {BackgroundImage && <KonvaImage image={image} width={400} height={300}  />}
          </Layer>
          <Layer>
            <KonvaImage
              image={sImage}
              draggable={true}
              width={selectedImg === chillguy ? 200 : 100}
              height={120}
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
              strokeWidth={1}
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

          <Button variant="outline" onClick={() => setText(tempText)}>
            Submit
          </Button>
        </div>

        <SliderDemo
          className="w-full"
          value={[textsize]}
          onValueChange={(value: number[]) => setTextSize(value[0])}
        />
      </div>

      <div>
        <Button
          className="w-full bg-green-300"
          variant={"outline"}
          onClick={handledownloadImage}
        >
          Download Meme!
        </Button>
      </div>
    </div>
  );
}
