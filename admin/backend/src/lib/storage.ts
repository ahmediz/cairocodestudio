import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import crypto from 'crypto';

const BUCKET_NAME = process.env.NEON_STORAGE_BUCKET || 'uploads';
const endpoint = process.env.AWS_ENDPOINT_URL_S3;
const region = process.env.AWS_REGION || 'us-east-2';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

export const s3 = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId: accessKeyId || '',
    secretAccessKey: secretAccessKey || '',
  },
  forcePathStyle: true, // Required: Neon uses path-style addressing
});

/**
 * Optimizes any supported image to AVIF format using sharp.
 */
export async function optimizeToAvif(inputBuffer: Buffer): Promise<Buffer> {
  return sharp(inputBuffer)
    .avif({
      quality: 80,
      effort: 4,
    })
    .toBuffer();
}

/**
 * Converts image to AVIF and uploads it to Neon Object Storage.
 */
export async function uploadImageToNeon({
  fileBuffer,
  folder = 'general',
  originalName,
}: {
  fileBuffer: Buffer;
  folder?: string;
  originalName?: string;
}): Promise<{ url: string; key: string }> {
  // 1. Optimize image to AVIF
  const avifBuffer = await optimizeToAvif(fileBuffer);

  // 2. Generate unique key with .avif extension
  const randomId = crypto.randomBytes(6).toString('hex');
  const safeBaseName = originalName
    ? originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
    : 'image';
  const key = `${folder}/${Date.now()}-${randomId}-${safeBaseName}.avif`;

  // 3. Upload to Neon S3 bucket
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: avifBuffer,
      ContentType: 'image/avif',
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );

  // 4. Construct URL
  const baseUrl = endpoint ? endpoint.replace(/\/$/, '') : '';
  const url = `${baseUrl}/${BUCKET_NAME}/${key}`;

  return { url, key };
}
