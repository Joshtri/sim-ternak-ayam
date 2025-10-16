"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@heroui/react";
import { ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  children?: ReactNode;
}

export default function BaseModal({
  isOpen,
  onClose,
  title,
  size = "xl",
  isLoading = false,
  isEmpty = false,
  emptyMessage = "Data tidak ditemukan",
  children,
}: BaseModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      size={size}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody className="pb-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : isEmpty ? (
            <p className="text-center text-default-500 py-8">{emptyMessage}</p>
          ) : (
            children
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
