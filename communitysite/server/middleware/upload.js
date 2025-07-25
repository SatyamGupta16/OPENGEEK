const multer = require('multer');

// Configure multer for basic form parsing (no file storage)
const storage = multer.memoryStorage();
const multerUpload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Upload middleware that properly handles multipart forms
const upload = {
  single: (fieldName) => (req, res, next) => {
    // Use multer to parse multipart form data
    multerUpload.single(fieldName)(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({
          success: false,
          message: 'Form parsing error',
          error: 'FORM_PARSE_ERROR'
        });
      }
      
      // For basic deployment, we don't store files
      // but we still need to parse the form data
      req.file = undefined;
      next();
    });
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