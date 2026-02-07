import { supabase, BUCKET_NAME } from '../config/supabase.js';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload an image to Supabase Storage
 * @param {Object} file - The file object from multer
 * @param {String} folder - The folder path (e.g., 'success-stories', 'events')
 * @returns {Promise<Object>} - Returns the public URL and file path
 */
export const uploadImage = async (file, folder) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Generate unique filename
    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return {
      url: publicUrlData.publicUrl,
      path: filePath,
      fileName: fileName
    };
  } catch (error) {
    console.error('Upload service error:', error);
    throw error;
  }
};

/**
 * Delete an image from Supabase Storage
 * @param {String} filePath - The file path in storage
 * @returns {Promise<Boolean>}
 */
export const deleteImage = async (filePath) => {
  try {
    if (!filePath) {
      return false;
    }

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('Supabase delete error:', error);
      throw new Error(`Failed to delete image: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('Delete service error:', error);
    throw error;
  }
};

/**
 * Upload multiple images
 * @param {Array} files - Array of file objects from multer
 * @param {String} folder - The folder path
 * @returns {Promise<Array>} - Returns array of upload results
 */
export const uploadMultipleImages = async (files, folder) => {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    const uploadPromises = files.map(file => uploadImage(file, folder));
    const results = await Promise.all(uploadPromises);

    return results;
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw error;
  }
};
