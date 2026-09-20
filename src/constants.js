/**
 * Profile picture, served from /public.
 *
 * The filename carries a hash of the file contents so it can be cached
 * immutably for a year (see the headers rule in vercel.json). When the photo
 * changes, re-encode it and update the filename here AND in the preload tag
 * in index.html:
 *
 *   cwebp -q 90 -resize 288 288 -metadata none <source> -o /tmp/p.webp
 *   cp /tmp/p.webp "public/profile.$(shasum -a 256 /tmp/p.webp | cut -c1-8).webp"
 */
export const PROFILE_SRC = '/profile.03015b31.webp';
