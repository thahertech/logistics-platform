'use client';
import { useState } from 'react';
import { RealtimeChat } from '../realtime-chat';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ChatToggle({ roomName, username, messages, onMessage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full shadow-lg size-12 p-0"
          variant="default">
          <MessageCircle className="size-6" />
        </Button>
      </div>

      {/* Chatbox card */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 h-[500px] shadow-2xl animate-in fade-in slide-in-from-bottom-6">
          <RealtimeChat
            roomName={roomName}
            username={username}
            onMessage={onMessage}
            messages={messages}
          />
        </div>
      )}
    </>
  );
}