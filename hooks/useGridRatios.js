import React, { useRef } from 'react';

export function useGridRatios(parentRef) {
  return Array.prototype.map.call(parentRef.current.children, el => {
    if (el.firstChild.tagName === 'IMG') {
      return el.firstChild.naturalWidth / el.firstChild.naturalHeight;
    }
    return 'other';
  });
}
