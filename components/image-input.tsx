"use client";

import { ChangeEvent, useRef, useState, useEffect, useId } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";

import styles from "./product-upload.module.css";

interface ImageInputProps {
  variant?: "default" | "dashboard";
  action: "add" | "edit";
  imageUrl?: string;
}

export default function ImageInput({ action, imageUrl, variant = "default" }: ImageInputProps) {
  const dashboard = variant === "dashboard";
  const inputId = useId();
  const [isFileSelected, setIsFileSelected] = useState<boolean>(
    action === "edit" && Boolean(imageUrl)
  );
  const [imagePreview, setImagePreview] = useState<string>(
    action === "edit" && imageUrl ? imageUrl : ""
  );

  useEffect(() => {
    if (!imagePreview.startsWith("blob:")) return;
    return () => URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  const replacingOriginal = dashboard && action === "edit" && imagePreview === imageUrl;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setIsFileSelected(true);
      const previewUrl = URL.createObjectURL(file[0]);
      setImagePreview(previewUrl);
    } else {
      resetFile();
    }
  };

  const resetFile = () => {
    const originalImage = dashboard && action === "edit" ? imageUrl : undefined;
    setIsFileSelected(Boolean(originalImage));
    setImagePreview(originalImage ?? "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={dashboard ? styles.upload : undefined}>
      <input
        type="file"
        ref={fileInputRef}
        name="cover-image"
        id={inputId}
        aria-label="Cover produk"
        className={dashboard ? "sr-only" : "hidden"}
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
        required={action === "add" ? true : false}
      />
      {!isFileSelected && (
        <Button
          type="button"
          onClick={handleClick}
          className={dashboard ? styles.dropzone : "border border-black border-2 border-dotted w-[200px] h-[200px] bg-white text-black hover:bg-gray-200 text-lg"}
        >
          {dashboard ? <><ImagePlus size={32} strokeWidth={1.3} aria-hidden="true" /><span>Pilih cover produk</span><span className={styles.uploadHint}>JPG, JPEG, atau PNG</span></> : "Upload image"}
        </Button>
      )}

      {isFileSelected && imagePreview && (
        <div className={dashboard ? styles.imagePreview : "relative w-[200px] h-[200px] rounded-sm border border-black overflow-hidden"}>
          <Image
            src={imagePreview}
            alt="Preview cover produk"
            fill
            sizes="(max-width: 600px) 100vw, 320px"
            className="object-cover"
          />
          <Button
            type="button"
            onClick={replacingOriginal ? handleClick : resetFile}
            aria-label={replacingOriginal ? "Ganti cover produk" : "Hapus pilihan cover"}
            className={dashboard ? `${styles.remove} ${styles.removeImage}` : "absolute neo-hover rounded-sm border border-black bg-black hover:!bg-[#F790E8] text-white hover:text-black top-2 right-2 p-3 h-auto w-auto"}
          >
            {replacingOriginal ? <ImagePlus size={20} /> : <Trash2 size={28} />}
          </Button>
        </div>
      )}
    </div>
  );
}
