"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function ImageInput() {
  const [fileName, setFileName] = useState<string>("Belum ada file");
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    console.log("state isSelectedFile: ", isFileSelected);
    if (file && file.length > 0) {
      setFileName(file[0].name);
      setIsFileSelected(true);
      const previewUrl = URL.createObjectURL(file[0]);
      setImagePreview(previewUrl);
    } else {
      resetFile();
    }
  };

  const resetFile = () => {
    setFileName("Belum ada file");
    setIsFileSelected(false);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        name="cover-image"
        id="html-file-input"
        className="hidden"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
        required
      />
      {!isFileSelected && (
        <Button
          type="button"
          onClick={handleClick}
          className="border border-black border-2 border-dotted w-[200px] h-[200px] bg-white text-black hover:bg-gray-200 text-lg"
        >
          Upload image
        </Button>
      )}

      {isFileSelected && imagePreview && (
        <div className="relative w-[200px] h-[200px] rounded-sm border border-black overflow-hidden">
          <Image
            src={imagePreview}
            alt="cover-image"
            fill
            className="object-cover"
          />
          <Button
            type="button"
            onClick={resetFile}
            className="absolute neo-hover rounded-sm border border-black bg-black hover:!bg-[#F790E8] text-white hover:text-black top-2 right-2 p-3 h-auto w-auto"
          >
            <Trash2 size={28} />
          </Button>
        </div>
      )}
    </div>
  );
}
