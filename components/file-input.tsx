"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Trash2, FileText, CloudDownload } from "lucide-react";

interface FileData {
  name: string;
  type?: string;
  size?: number; 
  url?: string;
}

interface FileInputProps {
  action?: "add" | "edit";
  initialData?: FileData;
}

export default function FileInput({ action = "add", initialData }: FileInputProps) {
  const isEditModeWithData = action === "edit" && Boolean(initialData);
  const [fileName, setFileName] = useState<string>(isEditModeWithData && initialData?.name ? initialData.name : "Belum ada file");
  const [fileType, setFileType] = useState<string>(isEditModeWithData && initialData?.type ? initialData.type : "");
  const [fileSize, setFileSize] = useState<number>(isEditModeWithData && initialData?.size ? initialData.size : 0);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(isEditModeWithData);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
    console.log("state isSelectedFile from ref: ", isFileSelected);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file && file.length > 0) {
      setIsFileSelected(true);
      setFileName(file[0].name);
      setFileType(file[0].type);
      setFileSize(file[0].size);
    } else {
      resetFile();
    }
    console.log("state isSelectedFile: ", isFileSelected);
  };

  const resetFile = () => {
    setFileName("Belum ada file");
    setFileType("");
    setFileSize(0);
    setIsFileSelected(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        name="file-produk"
        id="html-file-input"
        className="hidden"
        onChange={handleFileChange}
        required={action === "add" ? true : false}
      />
      {!isFileSelected && (
        <Button
          type="button"
          onClick={handleClick}
          className="border border-black border-2 border-dotted w-full h-[200px] bg-white text-black hover:bg-gray-200 text-lg"
        >
          <div className="flex flex-col items-center gap-2">
            <CloudDownload className="!w-[40px] !h-[40px]" />
            <p className="text-md">Upload file produk</p>
          </div>
        </Button>
      )}

      {isFileSelected && (
        <div className="flex w-full bg-white rounded-sm border border-black p-4 justify-between items-center">
          <div className="flex gap-4 items-center">
            <FileText className="!w-[20px] !h-[20px]" />
            <div className="flex flex-col">
              <h1 className="font-semibold">{fileName}</h1>
              <p>
                {fileType} · {fileSize} KB
              </p>
            </div>
          </div>
          <Button
            type="button"
            onClick={resetFile}
            className="neo-hover rounded-sm border border-black bg-black hover:!bg-[#F790E8] text-white hover:text-black top-2 right-2 p-3 h-auto w-auto"
          >
            <Trash2 size={28} />
          </Button>
        </div>
      )}
    </div>
  );
}
