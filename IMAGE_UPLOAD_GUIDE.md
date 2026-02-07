# Image Upload Implementation Guide

## Overview
This implementation adds image upload functionality for **Success Stories** and **Events** using Supabase Storage. Alumni can now upload images when creating or updating success stories and events.

---

## 🎯 Features Implemented

1. **Image Upload Support** for Success Stories and Events
2. **Supabase Storage Integration** with bucket management
3. **File Validation** (type, size, format)
4. **Automatic Image Cleanup** on update/delete
5. **Secure File Handling** with UUID naming
6. **Multipart Form Data** support

---

## 📦 Dependencies Installed

```bash
npm install @supabase/supabase-js multer uuid
```

- **@supabase/supabase-js**: Supabase client for storage operations
- **multer**: Middleware for handling multipart/form-data (file uploads)
- **uuid**: Generate unique filenames

---

## 🗂️ Files Created/Modified

### New Files Created:

1. **`src/config/supabase.js`**
   - Supabase client configuration
   - Exports initialized client and bucket name

2. **`src/services/upload.service.js`**
   - `uploadImage()`: Upload single image to Supabase
   - `deleteImage()`: Delete image from Supabase
   - `uploadMultipleImages()`: Upload multiple images
   - Handles validation (file type, size)

3. **`src/middlewares/upload.middleware.js`**
   - Multer configuration for memory storage
   - `uploadSingle()`: Middleware for single file upload
   - `uploadMultiple()`: Middleware for multiple files
   - File type filtering and size limits

4. **`test_image_upload.html`**
   - Interactive test page for image uploads
   - Test both success stories and events
   - Preview uploaded images

### Modified Files:

1. **`.env`**
   ```env
   SUPABASE_URL=https://zckkagpbivbjyukgitmi.supabase.co
   SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_KEY=...
   SUPABASE_BUCKET=Thinkx
   ```

2. **`src/models/SuccessStory.model.js`**
   - Added `image` field with `url` and `path` properties

3. **`src/models/Event.model.js`**
   - Added `image` field with `url` and `path` properties

4. **`src/controllers/successStory.controller.js`**
   - Updated `submitSuccessStory()` to handle image upload
   - Updated `updateStory()` to replace existing image
   - Updated `deleteStory()` to cleanup image from storage

5. **`src/controllers/event.controller.js`**
   - Updated `createEvent()` to handle image upload
   - Updated `updateEvent()` to replace existing image
   - Updated `deleteEvent()` to cleanup image from storage

6. **`src/routes/successStory.routes.js`**
   - Added `uploadSingle('image')` middleware to POST and PUT routes

7. **`src/routes/event.routes.js`**
   - Added `uploadSingle('image')` middleware to POST and PUT routes

---

## 🔧 Configuration

### Supabase Setup

1. **Create Bucket in Supabase Storage:**
   - Go to your Supabase project
   - Navigate to Storage
   - Create a bucket named `Thinkx`
   - Set bucket to **public** for image access

2. **Configure Bucket Policies:**
   ```sql
   -- Allow public read access
   CREATE POLICY "Public Access" ON storage.objects
   FOR SELECT USING (bucket_id = 'Thinkx');
   
   -- Allow authenticated insert
   CREATE POLICY "Authenticated Insert" ON storage.objects
   FOR INSERT WITH CHECK (bucket_id = 'Thinkx');
   
   -- Allow authenticated update
   CREATE POLICY "Authenticated Update" ON storage.objects
   FOR UPDATE USING (bucket_id = 'Thinkx');
   
   -- Allow authenticated delete
   CREATE POLICY "Authenticated Delete" ON storage.objects
   FOR DELETE USING (bucket_id = 'Thinkx');
   ```

3. **Folder Structure in Bucket:**
   ```
   Thinkx/
   ├── success-stories/
   │   └── {uuid}.jpg
   └── events/
       └── {uuid}.png
   ```

---

## 📝 API Usage

### Submit Success Story with Image

**Endpoint:** `POST /api/success-stories`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: multipart/form-data
```

**Body (form-data):**
```
title: "My Success Story"
story: "This is my amazing journey..."
image: [File]
```

**Response:**
```json
{
  "success": true,
  "successStory": {
    "_id": "...",
    "title": "My Success Story",
    "story": "This is my amazing journey...",
    "image": {
      "url": "https://...supabase.co/storage/v1/object/public/Thinkx/success-stories/uuid.jpg",
      "path": "success-stories/uuid.jpg"
    },
    "alumni": "...",
    "approved": false
  }
}
```

### Create Event with Image

**Endpoint:** `POST /api/events`

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: multipart/form-data
```

**Body (form-data):**
```
title: "Alumni Meetup 2026"
description: "Join us for an amazing evening"
date: "2026-03-15"
location: "Tech Hub, Downtown"
image: [File]
```

**Response:**
```json
{
  "success": true,
  "event": {
    "_id": "...",
    "title": "Alumni Meetup 2026",
    "description": "Join us for an amazing evening",
    "date": "2026-03-15T00:00:00.000Z",
    "location": "Tech Hub, Downtown",
    "image": {
      "url": "https://...supabase.co/storage/v1/object/public/Thinkx/events/uuid.png",
      "path": "events/uuid.png"
    },
    "createdBy": "..."
  }
}
```

### Update with New Image

**Endpoint:** `PUT /api/success-stories/:id` or `PUT /api/events/:id`

- If new image is provided, old image is automatically deleted
- Same multipart/form-data format as create

---

## ✅ File Validation

### Supported Image Formats:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### File Size Limit:
- Maximum: **5MB**

### Validation Errors:
```json
{
  "success": false,
  "message": "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed"
}
```

```json
{
  "success": false,
  "message": "File size exceeds 5MB limit"
}
```

---

## 🧪 Testing

### Using the Test HTML File:

1. **Start your server:**
   ```bash
   npm run dev
   ```

2. **Open test file:**
   ```bash
   # Open test_image_upload.html in your browser
   ```

3. **Get JWT Token:**
   - Login via your API
   - Copy the JWT token

4. **Test Upload:**
   - Paste token in the form
   - Fill in required fields
   - Select an image
   - Submit

### Using Postman/Thunder Client:

1. **Create Request:**
   - Method: POST
   - URL: `http://localhost:5000/api/success-stories`
   - Headers: `Authorization: Bearer {TOKEN}`

2. **Body (form-data):**
   - Add text fields: `title`, `story`
   - Add file field: `image` (select image file)

3. **Send Request**

---

## 🔐 Security Features

1. **Authentication Required**: All upload endpoints require JWT token
2. **Role-Based Access**: 
   - Success Stories: ALUMNI role required
   - Events: ALUMNI or ADMIN role required
3. **File Type Validation**: Only allowed image formats
4. **File Size Limit**: 5MB maximum
5. **Unique Filenames**: UUID-based naming prevents conflicts
6. **Automatic Cleanup**: Old images deleted on update/delete

---

## 🚀 Usage in Frontend

### JavaScript/React Example:

```javascript
async function submitSuccessStory(formData) {
  const form = new FormData();
  form.append('title', formData.title);
  form.append('story', formData.story);
  form.append('image', formData.imageFile); // File object
  
  const response = await fetch('http://localhost:5000/api/success-stories', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    },
    body: form
  });
  
  return await response.json();
}
```

### HTML Form Example:

```html
<form action="/api/success-stories" method="POST" enctype="multipart/form-data">
  <input type="text" name="title" required>
  <textarea name="story" required></textarea>
  <input type="file" name="image" accept="image/*">
  <button type="submit">Submit</button>
</form>
```

---

## 📊 Database Schema Changes

### Success Story Model:
```javascript
{
  alumni: ObjectId,
  title: String,
  story: String,
  image: {
    url: String,      // Public URL to access image
    path: String      // Storage path for deletion
  },
  approved: Boolean,
  timestamps: true
}
```

### Event Model:
```javascript
{
  title: String,
  description: String,
  date: Date,
  location: String,
  image: {
    url: String,      // Public URL to access image
    path: String      // Storage path for deletion
  },
  createdBy: ObjectId,
  attendees: [ObjectId],
  timestamps: true
}
```

---

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution:** Check `.env` file has all Supabase credentials

### Issue: "Failed to upload image"
**Solution:** 
- Verify Supabase bucket exists and is named `Thinkx`
- Check bucket policies allow insert
- Verify service key has correct permissions

### Issue: "Invalid file type"
**Solution:** 
- Only JPEG, PNG, GIF, WebP allowed
- Check file extension and MIME type

### Issue: "File size exceeds limit"
**Solution:** 
- Compress image before upload
- Maximum size is 5MB

### Issue: Images not displaying
**Solution:**
- Ensure bucket is set to **public**
- Check CORS settings in Supabase
- Verify URL is accessible

---

## 🎨 Future Enhancements

1. **Image Optimization**: Compress/resize images before upload
2. **Multiple Images**: Support multiple images per story/event
3. **Image Gallery**: Display all images in a gallery view
4. **Image Cropping**: Allow users to crop before upload
5. **Progress Indicator**: Show upload progress
6. **Thumbnail Generation**: Auto-generate thumbnails
7. **CDN Integration**: Use CDN for faster image delivery

---

## 📞 Support

For issues or questions:
1. Check error logs in console
2. Verify Supabase dashboard for storage operations
3. Test with the included HTML test file
4. Check network tab for API responses

---

## ✨ Summary

You now have a complete image upload system that:
- ✅ Uploads images to Supabase Storage
- ✅ Validates file type and size
- ✅ Stores public URLs in MongoDB
- ✅ Automatically cleans up old images
- ✅ Supports both success stories and events
- ✅ Includes security and authentication
- ✅ Provides test interface

**Happy Coding! 🚀**
