"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface NumberInputProps {
  onChange?: (value: number) => void;
}

export default function NumberInput({ onChange }: NumberInputProps) {
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    console.debug("value changed");
    if (onChange) onChange(value);
  }, [value, onChange]);

  return (
    <div className="flex gap-4 number-input">
      <Button
        aria-label="decrease"
        onClick={() => {
          setValue((value) => (value <= 0 ? 0 : value - 1));
        }}
      >
        −
      </Button>
      <Input type="number" value={value} min={0} max={99} step={1}></Input>
      <Button
        aria-label="increase"
        onClick={() => {
          setValue((value) => (value > 99 ? 99 : value + 1));
        }}
      >
        +
      </Button>
    </div>
  );
}
