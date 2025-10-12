"use client";

import { Textarea } from "@heroui/react";
import { useFormContext } from "react-hook-form";

import { FormFieldWrapper } from "../Form/FormFieldWrapper";

interface TextareaInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  description?: string;
}

export const TextareaInput = ({
  name,
  label,
  placeholder,
  disabled = false,
  required = true,
  rows,
  minRows,
  maxRows,
  maxLength,
  description,
}: TextareaInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message as string | undefined;

  return (
    <FormFieldWrapper
      helperText={description}
      label={label}
      name={name}
      required={required}
    >
      <Textarea
        {...register(name)}
        errorMessage={error}
        id={name}
        isDisabled={disabled}
        isInvalid={!!error}
        isRequired={required}
        labelPlacement="outside"
        maxLength={maxLength}
        maxRows={maxRows}
        minRows={minRows || rows}
        placeholder={placeholder}
      />
    </FormFieldWrapper>
  );
};
