"use client";

import { ChangeEvent, useRef, useState, useId } from "react";
import { Button } from "./ui/button";
import { Trash2, FileText, CloudDownload, Upload } from "lucide-react";

import styles from "./product-upload.module.css";

interface FileData {
  name: string;
  type?: string;
  size?: number; 
  url?: string;
}

interface FileInputProps {
  variant?: "default" | "dashboard";
  action?: "add" | "edit";
  initialData?: FileData;
}

export default function FileInput({ action = "add", initialData, variant = "default" }: FileInputProps) {
  const dashboard = variant === "dashboard";
  const inputId = useId();
  const isEditModeWithData = action === "edit" && Boolean(initialData);
  const [fileName, setFileName] = useState<string>(isEditModeWithData && initialData?.name ? initialData.name : "Belum ada file");
  const [fileType, setFileType] = useState<string>(isEditModeWithData && initialData?.type ? initialData.type : "");
  const [fileSize, setFileSize] = useState<number>(isEditModeWithData && initialData?.size ? initialData.size : 0);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(isEditModeWithData);

  const [isReplacement, setIsReplacement] = useState(false);
  const replacingOriginal = dashboard && action === "edit" && !isReplacement;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file && file.length > 0) {
      setIsFileSelected(true);
      setIsReplacement(true);
      setFileName(file[0].name);
      setFileType(file[0].type);
      setFileSize(file[0].size);
    } else {
      resetFile();
    }
  };

  const resetFile = () => {
    const originalFile = dashboard && action === "edit" ? initialData : undefined;
    setFileName(originalFile?.name ?? "Belum ada file");
    setFileType(originalFile?.type ?? "");
    setFileSize(originalFile?.size ?? 0);
    setIsFileSelected(Boolean(originalFile));
    setIsReplacement(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={dashboard ? styles.upload : undefined}>
      <input
        type="file"
        ref={fileInputRef}
        name="file-produk"
        id={inputId}
        aria-label="File produk"
        className={dashboard ? "sr-only" : "hidden"}
        onChange={handleFileChange}
        required={action === "add" ? true : false}
      />
      {!isFileSelected && (
        <Button
          type="button"
          onClick={handleClick}
          className={dashboard ? styles.dropzone : "border border-black border-2 border-dotted w-full h-[200px] bg-white text-black hover:bg-gray-200 text-lg"}
        >
          {dashboard ? <><Upload size={32} strokeWidth={1.3} aria-hidden="true" /><span>Pilih file produk</span><span className={styles.uploadHint}>File digital untuk pembeli</span></> : <div className="flex flex-col items-center gap-2">
            <CloudDownload className="!w-[40px] !h-[40px]" />
            <p className="text-md">Upload file produk</p>
          </div>}
        </Button>
      )}

      {isFileSelected && (
        <div className={dashboard ? styles.filePreview : "flex w-full bg-white rounded-sm border border-black p-4 justify-between items-center"}>
          <div className={dashboard ? styles.fileInfo : "flex gap-4 items-center"}>
            <FileText className="!w-[20px] !h-[20px]" />
            <div className="flex flex-col">
              <p className={dashboard ? styles.fileName : "font-semibold"}>{fileName}</p>
              <p>
                {fileType || "File"} · {dashboard ? `${(fileSize / 1024).toLocaleString("id-ID", { maximumFractionDigits: 1 })} KB` : `${fileSize} KB`}
              </p>
            </div>
          </div>
          <Button
            type="button"
            onClick={replacingOriginal ? handleClick : resetFile}
            aria-label={replacingOriginal ? "Ganti file produk" : "Hapus pilihan file"}
            className={dashboard ? styles.remove : "neo-hover rounded-sm border border-black bg-black hover:!bg-[#F790E8] text-white hover:text-black top-2 right-2 p-3 h-auto w-auto"}
          >
            {replacingOriginal ? <Upload size={20} /> : <Trash2 size={28} />}
          </Button>
        </div>
      )}
    </div>
  );
}
