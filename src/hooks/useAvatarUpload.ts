import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAvatarUpload = (userId: string) => {
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return null;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return null;
      }

      // Create unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase storage (if storage bucket exists)
      // For now, we'll use a placeholder approach with external image hosting
      // In production, you would upload to Supabase storage
      
      // Generate a temporary URL using FileReader
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          
          // Update profile with new avatar URL
          supabase
            .from('profiles')
            .update({ avatar_url: dataUrl })
            .eq('id', userId)
            .then(({ error }) => {
              if (error) {
                console.error('Error updating avatar:', error);
                toast.error('Failed to update avatar');
                resolve(null);
              } else {
                toast.success('Avatar updated successfully');
                resolve(dataUrl);
              }
            });
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadAvatar, uploading };
};