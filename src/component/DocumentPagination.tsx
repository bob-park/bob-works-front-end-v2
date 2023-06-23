// react
import { useEffect, useState } from 'react';

// daisyui
import { Button } from 'react-daisyui';

type DocumentPaginationProps = {
  total: number;
  current: number;
  onNext?: () => void;
  onPrev?: () => void;
};

export default function DocumentPagination({
  total,
  current,
  onNext,
  onPrev,
}: DocumentPaginationProps) {
  // useEffect

  // handle
  const handlePrev = () => {
    onPrev && onPrev();
  };

  const handleNext = () => {
    onNext && onNext();
  };

  return (
    <div className="join">
      <Button disabled={current === 1} onClick={handlePrev}>
        «
      </Button>
      <Button>Page {current}</Button>
      <Button disabled={current === total} onClick={handleNext}>
        »
      </Button>
    </div>
  );
}
