const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const multerUpload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: 'opengeek-posts',
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto' },
        { format: 'auto' }
      ],
      ...options
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(buffer);
  });
};

// Upload middleware with Cloudinary integration
const upload = {
  single: (fieldName) => (req, res, next) => {
    multerUpload.single(fieldName)(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({
          success: false,
          message: err.message || 'File upload error',
          error: 'UPLOAD_ERROR'
        });
      }

      // If no file uploaded, continue
      if (!req.file) {
        return next();
      }

      // Check if Cloudinary is configured
      if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.warn('Cloudinary not configured - skipping image upload');
        req.file = undefined;
        return next();
      }

      try {
        // Upload to Cloudinary
        console.log('Uploading image to Cloudinary...');
        const result = await uploadToCloudinary(req.file.buffer);
        
        // Add Cloudinary result to req.file
        req.file.cloudinary = result;
        req.file.secure_url = result.secure_url;
        req.file.public_id = result.public_id;
        
        console.log('Image uploaded successfully:', result.public_id);
        next();
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload image',
          error: 'CLOUDINARY_ERROR'
        });
      }
    });
  }
};

// Error handling middleware
const handleUploadError = (error, req, res, next) => {
  console.error('Upload error:', error);
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size too large. Maximum size is 5MB.',
      error: 'FILE_TOO_LARGE'
    });
  }
  
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({
      success: false,
      message: 'Only image files are allowed',
      error: 'INVALID_FILE_TYPE'
    });
  }
  
  return res.status(500).json({
    success: false,
    message: 'Upload failed',
    error: 'UPLOAD_ERROR'
  });
};

// Delete image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    if (!publicId) {
      return { result: 'ok' };
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.warn('Cloudinary not configured - skipping image deletion');
      return { result: 'ok' };
    }

    console.log('Deleting image from Cloudinary:', publicId);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Image deletion result:', result);
    return result;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

// Validation middleware for image uploads
const validateImageUpload = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  // Additional validation can be added here
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.',
      error: 'INVALID_FILE_TYPE'
    });
  }

  next();
};

module.exports = {
  upload,
  handleUploadError,
  deleteImage,
  validateImageUpload
};