// Cloudinary configuration
export const CLOUDINARY_CLOUD_NAME = 'dgkyqmres'
export const CLOUDINARY_API_KEY = 'Rxu0upPRbON26sKPmYo7QUutz6w'

// Upload to Cloudinary using unsigned upload
export async function uploadToCloudinary(file: File, resourceType: 'video' | 'image' = 'video'): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'portfolio_unsigned') // You'll need to create this in Cloudinary
  formData.append('cloud_name', CLOUDINARY_CLOUD_NAME)

  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

// Alternative: Direct URL upload
export async function uploadFromUrl(url: string, resourceType: 'video' | 'image' = 'video'): Promise<string> {
  const formData = new FormData()
  formData.append('file', url)
  formData.append('upload_preset', 'portfolio_unsigned')
  formData.append('cloud_name', CLOUDINARY_CLOUD_NAME)

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}