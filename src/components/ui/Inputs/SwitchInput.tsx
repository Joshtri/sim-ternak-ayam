"use client";

import { Switch, type SwitchThumbIconProps } from "@heroui/react";
import { useFormContext, Controller } from "react-hook-form";
// import { FormFieldWrapper } from "   ./FormFieldWrapper";
import { ReactNode } from "react";

import { FormFieldWrapper } from "../Form/FormFieldWrapper";

interface SwitchInputProps {
  name: string;
  label?: string;
  description?: string;
  isRequired?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  thumbIcon?: ReactNode | ((props: SwitchThumbIconProps) => ReactNode);
  startContent?: ReactNode;
  endContent?: ReactNode;
  classNames?: {
    base?: string;
    wrapper?: string;
    label?: string;
    thumb?: string;
    thumbIcon?: string;
    hiddenInput?: string;
    startContent?: string;
    endContent?: string;
  };
}

export const SwitchInput = ({
  name,
  label,
  description,
  isRequired = false,
  disabled = false,
  size = "md",
  color = "default",
  thumbIcon,
  startContent,
  endContent,
  classNames,
}: SwitchInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message as string | undefined;

  return (
    <FormFieldWrapper
      error={error}
      label={label}
      name={name}
      required={isRequired}
    >
      <Controller
        control={control}
        defaultValue={false}
        name={name}
        render={({ field }) => (
          <Switch
            classNames={classNames}
            color={color}
            endContent={endContent}
            isDisabled={disabled}
            isSelected={field.value}
            size={size}
            startContent={startContent}
            thumbIcon={thumbIcon}
            onValueChange={field.onChange}
          >
            {description}
          </Switch>
        )}
      />
    </FormFieldWrapper>
  );
};
