import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { Users } from './collections/Users';
import { Media } from './collections/Media';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
    process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
    process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
  ],
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: ' - My CMS',
      favicon: '/assets/favicon.ico',
      ogImage: '/assets/logo.jpg',
    },
    webpack: (config) => {
      // Dodajemy regułę dla plików .node
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader', // Użyj node-loader do obsługi natywnych modułów
      });
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve?.alias,
            '@': path.resolve(dirname, 'src'),
          },
        },
      };
    },
  },
  rateLimit: {
    trustProxy: true,
    window: 15 * 60 * 1000,
    max: 1000,
  },
  collections: [
    Users,
    Media,
    {
      slug: 'cars',
      admin: { 
        useAsTitle: 'title',
        group: 'Content',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
      ],
    },
    {
      slug: 'products',
      admin: { 
        useAsTitle: 'title',
        group: 'Content',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'price', type: 'number', min: 0, required: true },
        { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
  localization: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    fallback: true,
  },
  email: {
    fromName: 'My CMS',
    fromAddress: process.env.SMTP_USER || 'no-reply@example.com',
    transportOptions: {
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    },
  },
});