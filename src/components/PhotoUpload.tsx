'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, X, Image as ImageIcon, Loader2, Plus } from 'lucide-react';

interface PhotoUploadProps {
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  disabled?: boolean;
}

function compressImage(file: File, maxSizeKB: number = 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Scale down if image is very large
        const MAX_DIM = 2048;
        if (width > MAX_DIM || height > MAX_DIM) {
          const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Canvas context error')); return; }
        ctx.drawImage(img, 0, 0, width, height);

        // Try decreasing quality until under maxSizeKB
        let quality = 0.85;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);

        while (dataUrl.length > maxSizeKB * 1370 && quality > 0.1) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Extract base64 data (without the data:image/jpeg;base64, prefix)
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
      };
      img.onerror = () => reject(new Error('Image load error'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsDataURL(file);
  });
}

export default function PhotoUpload({ onImagesChange, maxImages = 5, disabled = false }: PhotoUploadProps) {
  const [images, setImages] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    setLoading(true);
    try {
      const newBase64: string[] = [];
      const newPreviews: string[] = [];

      for (const file of fileArray) {
        if (images.length + newBase64.length >= maxImages) break;
        const base64 = await compressImage(file);
        newBase64.push(base64);
        newPreviews.push(`data:image/jpeg;base64,${base64}`);
      }

      const updatedImages = [...images, ...newBase64];
      const updatedPreviews = [...previews, ...newPreviews];
      setImages(updatedImages);
      setPreviews(updatedPreviews);
      onImagesChange(updatedImages);
    } catch (err) {
      console.error('Error processing images:', err);
    } finally {
      setLoading(false);
    }
  }, [images, previews, maxImages, onImagesChange]);

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviews(updatedPreviews);
    onImagesChange(updatedImages);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [disabled, processFiles]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && !loading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-primary bg-primary/10'
            : disabled
            ? 'border-white/5 bg-bg-card/50 cursor-not-allowed opacity-50'
            : 'border-white/10 bg-bg-card hover:border-primary/40 hover:bg-bg-card/80'
        }`}
        whileHover={!disabled ? { scale: 1.005 } : undefined}
        whileTap={!disabled ? { scale: 0.995 } : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={(e) => e.target.files && processFiles(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

        {loading ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm text-text-muted">Compression en cours...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Camera className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Prendre une photo ou deposer une image</p>
              <p className="text-xs text-text-muted mt-1">
                Glisse-depose ou clique pour selectionner (max {maxImages} images, 1 Mo/image)
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" /> Photo
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-xs font-medium flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" /> Fichier
              </span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Image previews */}
      <AnimatePresence>
        {previews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {previews.map((preview, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-bg-card"
              >
                <img
                  src={preview}
                  alt={`Page ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-danger/80 text-white hover:bg-danger"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-xs text-white">
                  Page {index + 1}
                </div>
              </motion.div>
            ))}

            {/* Add more button */}
            {images.length < maxImages && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[3/4] rounded-xl border-2 border-dashed border-white/10 bg-bg-card/50 flex flex-col items-center justify-center gap-2 hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <Plus className="w-6 h-6 text-text-muted" />
                <span className="text-xs text-text-muted">Ajouter</span>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {images.length > 0 && (
        <p className="text-xs text-text-muted flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5" />
          {images.length} page{images.length > 1 ? 's' : ''} ajoutee{images.length > 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
