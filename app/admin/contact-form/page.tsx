"use client";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import QuickViewModal from "@/components/QuickViewModal";

// Mock users data
const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "admin",
    status: "active",
    enrollments: 3,
    lastActive: "2 hours ago",
    image: "/team/sarah-johnson.png",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "user",
    status: "active",
    enrollments: 2,
    lastActive: "1 day ago",
    image: "/team/michael-chen.png",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    email: "elena@example.com",
    role: "user",
    status: "active",
    enrollments: 1,
    lastActive: "3 days ago",
    image: "/team/elena-rodriguez.png",
  },
  {
    id: "4",
    name: "David Williams",
    email: "david@example.com",
    role: "user",
    status: "inactive",
    enrollments: 0,
    lastActive: "2 weeks ago",
    image: "/team/david-williams.png",
  },
  {
    id: "5",
    name: "Aisha Patel",
    email: "aisha@example.com",
    role: "user",
    status: "active",
    enrollments: 4,
    lastActive: "5 hours ago",
    image: "/team/aisha-patel.png",
  },
];
const sampleMessage = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "Hi! Just reaching out about the course. Loved it!",
};

export default function UsersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const openQView = (email, message, name) => {
    setName(name);
    setEmail(email);
    setMessage(message);
    setIsOpen(true);
  };
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Message Management</h1>
      </div>
      <QuickViewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        name={name}
        email={email}
        message={message}
      />
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sender
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Message
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.image || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                    <p>message here ...</p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button onClick={openQView} variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
