'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Hand } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPanMode, setIsPanMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Multi-touch state for pinch-to-zoom
  const [activePointers, setActivePointers] = useState<Map<number, { x: number; y: number }>>(new Map());
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [initialZoom, setInitialZoom] = useState(1);
  const [zoomCenter, setZoomCenter] = useState({ x: 0, y: 0 });
  const [isPinching, setIsPinching] = useState(false);

  // Reset state when image changes
  useEffect(() => {
    setZoom(1);
    setLoading(true);
    setError(false);
    setIsDragging(false);
    setPanOffset({ x: 0, y: 0 });
    
    // Reset multi-touch state
    setActivePointers(new Map());
    setInitialDistance(null);
    setInitialZoom(1);
    setZoomCenter({ x: 0, y: 0 });
    setIsPinching(false);
  }, [imageUrl]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };



  // Helper functions for pinch-to-zoom
  const calculateDistance = (point1: { x: number; y: number }, point2: { x: number; y: number }) => {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateCenter = (point1: { x: number; y: number }, point2: { x: number; y: number }) => {
    return {
      x: (point1.x + point2.x) / 2,
      y: (point1.y + point2.y) / 2
    };
  };

  const getPointersArray = () => Array.from(activePointers.values());

  // Touch device detection
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  // Auto-enable pan mode based on device type
  useEffect(() => {
    if (isTouchDevice()) {
      // On touch devices, always enable pan mode (for touch gestures)
      setIsPanMode(true);
    } else {
      // On desktop devices, always enable pan mode (for mouse drag)
      setIsPanMode(true);
    }
  }, []);

  // Enhanced pointer event handlers for pan and pinch-to-zoom
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    
    // Add pointer to active pointers
    const newPointers = new Map(activePointers);
    newPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setActivePointers(newPointers);
    
    const pointersArray = Array.from(newPointers.values());
    
    if (pointersArray.length === 1) {
      // Single touch - pan mode (always available when pan is enabled)
      if (isPanMode) {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    } else if (pointersArray.length === 2) {
      // Dual touch - pinch-to-zoom mode
      setIsDragging(false); // Stop panning
      setIsPinching(true);
      
      const distance = calculateDistance(pointersArray[0], pointersArray[1]);
      const center = calculateCenter(pointersArray[0], pointersArray[1]);
      
      setInitialDistance(distance);
      setInitialZoom(zoom);
      setZoomCenter(center);
    }
    
    // Capture pointer for consistent behavior
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activePointers.has(e.pointerId)) return;
    
    e.preventDefault();
    
    // Update pointer position
    const newPointers = new Map(activePointers);
    newPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setActivePointers(newPointers);
    
    const pointersArray = Array.from(newPointers.values());
    
    if (pointersArray.length === 1 && isDragging && isPanMode) {
      // Single touch panning
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
      
    } else if (pointersArray.length === 2 && isPinching && initialDistance) {
      // Dual touch pinch-to-zoom
      const currentDistance = calculateDistance(pointersArray[0], pointersArray[1]);
      const currentCenter = calculateCenter(pointersArray[0], pointersArray[1]);
      
      // Calculate scale factor
      const scaleFactor = currentDistance / initialDistance;
      const newZoom = Math.max(0.5, Math.min(3, initialZoom * scaleFactor));
      
      // Calculate pan offset to keep zoom centered
      const centerDeltaX = currentCenter.x - zoomCenter.x;
      const centerDeltaY = currentCenter.y - zoomCenter.y;
      
      setZoom(newZoom);
      setPanOffset(prev => ({
        x: prev.x + centerDeltaX,
        y: prev.y + centerDeltaY
      }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    
    // Remove pointer from active pointers
    const newPointers = new Map(activePointers);
    newPointers.delete(e.pointerId);
    setActivePointers(newPointers);
    
    const pointersArray = Array.from(newPointers.values());
    
    if (pointersArray.length === 0) {
      // No more active pointers
      setIsDragging(false);
      setIsPinching(false);
      setInitialDistance(null);
    } else if (pointersArray.length === 1 && isPinching) {
      // Switched from pinch to pan
      setIsPinching(false);
      setInitialDistance(null);
      
      if (isPanMode) {
        setIsDragging(true);
        setDragStart({ x: pointersArray[0].x, y: pointersArray[0].y });
      }
    }
    
    // Release pointer capture
    (e.target as Element).releasePointerCapture(e.pointerId);
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
          if (!isPanMode) handlePrevPage();
          break;
        case 'ArrowRight':
          if (!isPanMode) handleNextPage();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
        case '_':
          handleZoomOut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [prevPageUrl, nextPageUrl, page, isPanMode, zoom]);

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
            
          </div>
        </div>
      </div>

      {/* Image container */}
      <div className="relative mt-12 overflow-auto" style={{ height: 'calc(100% - 6rem)' }}>
        <div
          className={cn(
            "flex items-center justify-center min-h-full p-4",
            isPanMode && !isTouchDevice() && "select-none",
            isPanMode && !isTouchDevice() && !isDragging && "cursor-grab", 
            isPanMode && !isTouchDevice() && isDragging && "cursor-grabbing"
          )}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            transformOrigin: 'center',
            touchAction: zoom > 1 ? 'manipulation' : 'auto'
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {loading && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          
          {error ? (
            <div className="text-center p-8">
              <p className="text-red-500 mb-2">Failed to load image</p>
              <p className="text-sm text-text-muted">{imageUrl}</p>
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
          
          <span className="text-sm text-text-muted">
            {isTouchDevice() 
              ? "Pinch to zoom, drag to pan" 
              : "Drag to pan, arrow keys to navigate"
            }
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