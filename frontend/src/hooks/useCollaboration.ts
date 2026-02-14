import { useState, useEffect, useCallback } from 'react';
import type { User } from '../types/types.d';

export const useCollaboration = (_noteId?: string) => {
  void _noteId;
  const [onlineUsers] = useState<User[]>([
    { id: 'user1', name: 'Sarah Chen', avatar: 'SC', color: 'bg-purple-500', isOnline: true },
    { id: 'user2', name: 'Mike Johnson', avatar: 'MJ', color: 'bg-blue-500', isOnline: true },
    { id: 'user3', name: 'Emma Davis', avatar: 'ED', color: 'bg-pink-500', isOnline: false },
  ]);

  const [typingUsers] = useState<User[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Simulate real-time typing detection
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleTyping = useCallback(() => {
    setIsTyping(true);
    // In real app, emit typing event to WebSocket/Firebase
  }, []);

  const addCollaborator = useCallback((userId: string) => {
    // In real app, send invitation via API
    console.log('Adding collaborator:', userId);
  }, []);

  const removeCollaborator = useCallback((userId: string) => {
    // In real app, remove via API
    console.log('Removing collaborator:', userId);
  }, []);

  return {
    onlineUsers,
    typingUsers,
    isTyping,
    handleTyping,
    addCollaborator,
    removeCollaborator,
  };
};
