import { Input } from "@heroui/react";
import { useFormContext, RegisterOptions } from "react-hook-form";

import { FormFieldWrapper } from "../Form/FormFieldWrapper";

interface TextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  validation?: RegisterOptions;
}

export const TextInput = ({
  name,
  label,
  placeholder,
  disabled = false,
  required = true,
  type = "text",
  validation,
}: TextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <FormFieldWrapper label={label} name={name} required={required}>
      <Input
        {...register(name, validation)}
        errorMessage={error}
        id={name}
        labelPlacement="outside"
        isDisabled={disabled}
        isInvalid={!!error}
        isRequired={required}
        placeholder={placeholder}
        type={type}
      />
    </FormFieldWrapper>
  );
};
