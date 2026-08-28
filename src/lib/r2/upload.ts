import 'server-only';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2Client } from './client';
import { ALLOWED_IMAGE_TYPES, ALLOWED_VIDEO_TYPES, MAX_IMAGE_SIZE, MAX_VIDEO_SIZE } from '../upload-config';

export const BUCKET_NAME = process.env.R2_BUCKET_NAME || process.env.NEXT_PUBLIC_R2_BUCKET_NAME || '';
export const PUBLIC_DOMAIN = process.env.R2_PUBLIC_BASE_URL || process.env.R2_PUBLIC_DOMAIN || process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL || '';

export function isR2Configured() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY;
  return Boolean(accountId && accessKeyId && secretAccessKey && BUCKET_NAME && PUBLIC_DOMAIN);
}

function assertR2Configured() {
  if (!isR2Configured()) {
    throw new Error('Media storage is not configured. Add the Cloudflare R2 environment variables in Vercel.');
  }
}

export async function generatePresignedUploadUrl(storageKey: string, contentType: string) {
  assertR2Configured();
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: storageKey,
    ContentType: contentType,
  });

  const presignedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
  return presignedUrl;
}

export async function deleteObject(storageKey: string) {
  assertR2Configured();
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: storageKey,
  });

  await r2Client.send(command);
}

export function getPublicUrl(storageKey: string): string {
  assertR2Configured();
  // Ensure the public domain has a trailing slash or handles it correctly
  const baseUrl = PUBLIC_DOMAIN.endsWith('/') ? PUBLIC_DOMAIN : `${PUBLIC_DOMAIN}/`;
  return `${baseUrl}${storageKey}`;
}

export function validateUploadRequest(filename: string, contentType: string, fileSize: number): { valid: boolean; error?: string } {
  if (fileSize <= 0) {
    return { valid: false, error: 'File size must be greater than 0' };
  }

  const isImage = ALLOWED_IMAGE_TYPES.includes(contentType);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(contentType);

  if (!isImage && !isVideo) {
    return { valid: false, error: `Invalid content type: ${contentType}` };
  }

  if (isImage && fileSize > MAX_IMAGE_SIZE) {
    return { valid: false, error: `Image size exceeds limit of ${MAX_IMAGE_SIZE / (1024 * 1024)}MB` };
  }

  if (isVideo && fileSize > MAX_VIDEO_SIZE) {
    return { valid: false, error: `Video size exceeds limit of ${MAX_VIDEO_SIZE / (1024 * 1024)}MB` };
  }

  return { valid: true };
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .toLowerCase();
}
