"use client";

import { Dialog } from "@headlessui/react";
import { MailIcon, UserIcon, MessageSquareIcon } from "lucide-react";
import Image from "next/image";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  message: string;
}

export default function QuickViewModal({
  isOpen,
  onClose,
  name,
  email,
  message,
}: QuickViewModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md space-y-4">
          <Dialog.Title className="text-xl font-bold text-gray-800">
            📨 Message Preview
          </Dialog.Title>

          {/* Header: Avatar + Name/Email */}
          <div className="flex items-center space-x-4 border-b pb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <UserIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MailIcon className="w-4 h-4" />
                {email}
              </p>
            </div>
          </div>

          {/* Message bubble */}
          <div className="bg-gray-100 rounded-xl p-4 text-gray-800 flex gap-2">
            <MessageSquareIcon className="w-5 h-5 text-blue-500 mt-1" />
            <p className="whitespace-pre-line">{message}</p>
          </div>

          {/* Footer */}
          <div className="text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
