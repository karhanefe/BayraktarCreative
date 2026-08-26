export async function requestPresignedUrl(file: File, projectId: string) {
  const response = await fetch('/api/upload/presign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      fileSize: file.size,
      projectId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get presigned URL');
  }

  return response.json();
}

export async function uploadToR2(
  file: File,
  presignedUrl: string,
  onProgress?: (progress: number) => void
) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.open('PUT', presignedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
}

export async function uploadMedia(
  file: File,
  projectId: string,
  mediaData: {
    width?: number;
    height?: number;
    duration?: number;
    sort_order?: number;
    is_cover?: boolean;
    alt_text?: string;
  },
  onProgress?: (progress: number) => void
) {
  // 1. Get presigned URL
  const { presignedUrl, storageKey, publicUrl } = await requestPresignedUrl(file, projectId);

  // 2. Upload file to R2
  await uploadToR2(file, presignedUrl, onProgress);

  // 3. Confirm upload and create DB record
  const response = await fetch('/api/upload/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId,
      storageKey,
      url: publicUrl,
      mediaType: file.type.startsWith('video/') ? 'video' : 'image',
      mimeType: file.type,
      fileSize: file.size,
      ...mediaData,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to complete upload');
  }

  return response.json();
}
