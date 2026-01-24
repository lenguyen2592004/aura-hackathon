# Hướng dẫn tạo icons cho PWA

Để tạo đầy đủ icons từ icon.svg:

## Cách 1: Sử dụng online tool

1. Truy cập: https://realfavicongenerator.net/
2. Upload file `public/icons/icon.svg`
3. Download và extract vào `public/icons/`

## Cách 2: Tạo placeholder (tạm thời)

Icons hiện tại chỉ là placeholder SVG. App vẫn chạy bình thường.

## Sizes cần thiết:

- 72x72, 96x96, 128x128, 144x144
- 152x152, 192x192, 384x384, 512x512

Các file icon được sử dụng trong:

- `public/manifest.json`
- `src/app/layout.tsx` (apple-touch-icon)
