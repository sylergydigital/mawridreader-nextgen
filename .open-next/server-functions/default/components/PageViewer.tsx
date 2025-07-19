'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageViewerProps {
  imageUrl: string;
  dictionaryName: string;
  page: number;
  prevPageUrl?: string | null;
  nextPageUrl?: string | null;
  onPageChange?: (newPage: number) => void;
  className?: string;
}

export function PageViewer({
  imageUrl,
  dictionaryName,
  page,
  prevPageUrl,
  nextPageUrl,
  onPageChange,
  className
}: PageViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Reset state when image changes
  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setLoading(true);
    setError(false);
  }, [imageUrl]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handlePrevPage = () => {
    if (prevPageUrl && onPageChange) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl && onPageChange) {
      onPageChange(page + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevPage();
          break;
        case 'ArrowRight':
          handleNextPage();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
        case '_':
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleRotate();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [prevPageUrl, nextPageUrl, page]);

  return (
    <div className={cn('relative bg-gray-100 rounded-lg overflow-hidden', className)}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b z-10">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="text-sm font-medium">
            {dictionaryName} - Page {page}
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
              title="Zoom out (-)"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <span className="text-sm font-medium w-16 text-center">
              {Math.round(zoom * 100)}%
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              title="Zoom in (+)"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRotate}
              title="Rotate (R)"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Image container */}
      <div className="relative mt-12 overflow-auto" style={{ height: 'calc(100% - 6rem)' }}>
        <div
          className="flex items-center justify-center min-h-full p-4"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
            transformOrigin: 'center',
          }}
        >
          {loading && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          
          {error ? (
            <div className="text-center p-8">
              <p className="text-red-500 mb-2">Failed to load image</p>
              <p className="text-sm text-gray-500">{imageUrl}</p>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={`${dictionaryName} page ${page}`}
              className="max-w-full h-auto"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
              style={{
                opacity: loading ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t">
        <div className="flex items-center justify-between px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevPage}
            disabled={!prevPageUrl}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <span className="text-sm text-gray-500">
            Use arrow keys to navigate
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextPage}
            disabled={!nextPageUrl}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}