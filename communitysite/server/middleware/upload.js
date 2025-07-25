// Simplified upload middleware for basic deployment (no image uploads)
const upload = {
  single: (fieldName) => (req, res, next) => {
    // Skip file upload for basic deployment
    // Ensure req.file is undefined so the post creation logic works
    req.file = undefined;
    next();
  }
};

// Simplified error handling middleware
const handleUploadError = (error, req, res, next) => {
  console.error('Upload error:', error);
  return res.status(400).json({
    success: false,
    message: 'File upload not available in basic deployment',
    error: 'UPLOAD_DISABLED'
  });
};

// Simplified delete function
const deleteImage = async (publicId) => {
  console.log('Image deletion not available in basic deployment');
  return { result: 'ok' };
};

// Simplified validation middleware
const validateImageUpload = (req, res, next) => {
  return res.status(400).json({
    success: false,
    message: 'Image upload not available in basic deployment',
    error: 'UPLOAD_DISABLED'
  });
};

module.exports = {
  upload,
  handleUploadError,
  deleteImage,
  validateImageUpload
};