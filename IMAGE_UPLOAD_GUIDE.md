# Image Upload Component - User Guide

## 📸 Tổng Quan

Component **ImageUpload** là một giải pháp upload ảnh hoàn chỉnh với drag & drop, reorder, và delete. Được thiết kế để tái sử dụng cho Products, Content, News, và Blog.

---

## ✨ Tính Năng

### Multiple Images (`ImageUpload`)
- ✅ **Drag & Drop**: Kéo thả files từ desktop
- ✅ **Multi-select**: Upload nhiều ảnh cùng lúc
- ✅ **Reorder**: Drag ảnh để sắp xếp lại thứ tự
- ✅ **Preview**: Xem trước thumbnail với hover effects
- ✅ **Delete**: Xóa từng ảnh riêng lẻ
- ✅ **Primary Badge**: Ảnh đầu tiên được đánh dấu "Primary"
- ✅ **Validation**: Kiểm tra file size và format
- ✅ **Progress Info**: Hiển thị số ảnh đã upload / max

### Single Image (`SingleImageUpload`)
- ✅ **Drag & Drop**: Kéo thả 1 file
- ✅ **Click Upload**: Click để chọn file
- ✅ **Preview**: Xem trước với overlay
- ✅ **Replace**: Click delete và upload lại
- ✅ **Validation**: Kiểm tra file size

---

## 🚀 Cách Sử Dụng

### 1. Import Component

```tsx
import { ImageUpload, SingleImageUpload } from "@/components/dashboard/ImageUpload";
```

### 2. Single Image (Featured/Thumbnail)

**Use Case**: Ảnh bìa bài viết, news thumbnail, blog hero

```tsx
"use client";

import { useState } from "react";
import { SingleImageUpload } from "@/components/dashboard/ImageUpload";

export function BlogForm() {
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);

  return (
    <div>
      <h3>Featured Image</h3>
      <SingleImageUpload 
        image={featuredImage}
        onChange={setFeaturedImage}
        maxSizeMB={5}
        accept="image/jpeg,image/png,image/webp"
      />
    </div>
  );
}
```

### 3. Multiple Images (Gallery)

**Use Case**: Product images, article gallery, photo essays

```tsx
"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/dashboard/ImageUpload";

interface ImageFile {
  id: string;
  url: string;
  file?: File;
  name: string;
}

export function ProductForm() {
  const [images, setImages] = useState<ImageFile[]>([]);

  const handleSubmit = () => {
    console.log("Uploaded images:", images);
    // Send to API...
  };

  return (
    <div>
      <h3>Product Images</h3>
      <ImageUpload 
        images={images}
        onChange={setImages}
        maxImages={6}
        maxSizeMB={2}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
```

---

## 📝 Props API

### ImageUpload Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `ImageFile[]` | `[]` | Array of images hiện tại |
| `onChange` | `(images: ImageFile[]) => void` | - | Callback khi images thay đổi |
| `maxImages` | `number` | `6` | Số ảnh tối đa cho phép |
| `maxSizeMB` | `number` | `2` | Kích thước file tối đa (MB) |
| `accept` | `string` | `"image/jpeg,..."` | MIME types được phép |
| `className` | `string` | - | Custom CSS class |

### SingleImageUpload Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `string` | - | URL của ảnh hiện tại |
| `onChange` | `(url: string \| null) => void` | - | Callback khi ảnh thay đổi |
| `maxSizeMB` | `number` | `2` | Kích thước file tối đa (MB) |
| `accept` | `string` | `"image/jpeg,..."` | MIME types được phép |
| `className` | `string` | - | Custom CSS class |

### ImageFile Interface

```typescript
interface ImageFile {
  id: string;        // Unique ID
  url: string;       // Preview URL (blob://)
  file?: File;       // File object gốc
  name: string;      // Tên file
}
```

---

## 🎯 Use Cases

### 1. Product Management
```tsx
import { ImageUpload } from "@/components/dashboard/ImageUpload";

// Trong ProductForm
<ImageUpload 
  images={productImages}
  onChange={setProductImages}
  maxImages={6}
  maxSizeMB={2}
/>
```
✅ Đã tích hợp trong `ProductForm.tsx`

### 2. Blog/News Articles
```tsx
import { SingleImageUpload } from "@/components/dashboard/ImageUpload";

// Featured image
<SingleImageUpload 
  image={featuredImage}
  onChange={setFeaturedImage}
  maxSizeMB={5}
/>
```
📝 Use case: Ảnh bìa bài viết

### 3. Content Gallery
```tsx
import { ImageUpload } from "@/components/dashboard/ImageUpload";

// Article gallery
<ImageUpload 
  images={galleryImages}
  onChange={setGalleryImages}
  maxImages={12}
  maxSizeMB={3}
/>
```
📝 Use case: Photo essays, collections

---

## 🎨 UI Features

### Drag & Drop Zones
- **Upload Zone**: Border dashed, hover effects
- **Image Grid**: Responsive grid (2-3-4 columns)
- **Drag Indicator**: Blue border khi drag over

### Image Cards
- **Preview**: Aspect square với object-cover
- **Hover Overlay**: Actions xuất hiện khi hover
- **Drag Handle**: Grip icon ở góc trên trái
- **Delete Button**: Red button ở center
- **Primary Badge**: Blue badge cho ảnh đầu tiên
- **Filename**: Gradient overlay ở bottom

### States
- **Empty**: Upload zone với icon và text
- **Uploading**: (TODO: Add spinner)
- **Uploaded**: Grid với thumbnails
- **Dragging**: Opacity 50% cho item đang kéo
- **Drag Over**: Blue border highlight

---

## 🔧 Integration Examples

### Example 1: Product Create Form (Đã tích hợp)
Location: `src/components/dashboard/ProductForm.tsx`

```tsx
const [images, setImages] = useState<ImageFile[]>([]);

<ImageUpload 
  images={images}
  onChange={setImages}
  maxImages={6}
  maxSizeMB={2}
/>

// On submit
const handleSubmit = () => {
  onSave?.({ ...formData, images });
};
```

### Example 2: Blog Article Form

```tsx
export function ArticleForm() {
  const [featured, setFeatured] = useState<string | null>(null);
  const [gallery, setGallery] = useState<ImageFile[]>([]);

  return (
    <form>
      <div>
        <h3>Featured Image</h3>
        <SingleImageUpload image={featured} onChange={setFeatured} />
      </div>
      
      <div>
        <h3>Content Gallery (Optional)</h3>
        <ImageUpload images={gallery} onChange={setGallery} maxImages={10} />
      </div>
    </form>
  );
}
```

### Example 3: News Form

```tsx
export function NewsForm() {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  return (
    <form>
      <div>
        <label>News Thumbnail</label>
        <SingleImageUpload 
          image={thumbnail} 
          onChange={setThumbnail}
          maxSizeMB={3}
        />
      </div>
    </form>
  );
}
```

---

## 🎬 Demo Component

Xem demo đầy đủ tại: `src/components/dashboard/ContentImageExample.tsx`

Component này có 3 tabs:
1. **Featured Image**: Demo SingleImageUpload
2. **Image Gallery**: Demo ImageUpload
3. **Usage Guide**: Code examples và props table

---

## 📋 Validation Rules

### File Size
- Default: 2MB
- Configurable qua `maxSizeMB` prop
- Alert xuất hiện nếu vượt quá

### File Format
- Default: `image/jpeg,image/png,image/webp`
- Configurable qua `accept` prop
- Browser tự filter khi chọn file

### Max Images
- Default: 6 images
- Upload zone ẩn khi đạt max
- Chỉ upload số còn lại nếu vượt

---

## 🔄 Reorder Logic

### Cách Hoạt Động
1. User kéo image card
2. `draggedIndex` được set
3. Khi hover qua card khác → `dragOverIndex` update
4. Drop → swap positions trong array
5. `onChange` callback được gọi

### Visual Feedback
- **Dragging**: Opacity 50%
- **Drag Over**: Blue border
- **Drag Handle**: Grip icon luôn hiển thị

---

## ⚡ Performance Tips

### 1. Cleanup URLs
```tsx
useEffect(() => {
  return () => {
    // Revoke blob URLs khi unmount
    images.forEach(img => URL.revokeObjectURL(img.url));
  };
}, [images]);
```

### 2. Lazy Loading
Nếu có nhiều ảnh, consider lazy load:
```tsx
<img 
  src={image.url} 
  loading="lazy"
  alt={image.name} 
/>
```

### 3. Image Optimization
Server-side: resize/compress before storing
- Recommended: 800x800px for products
- Compress: 80% quality JPEG/WebP

---

## 🐛 Known Limitations

1. **Browser Compatibility**: Drag & drop yêu cầu modern browsers
2. **File Validation**: Chỉ check size, không check thật sự là image
3. **Upload Progress**: Chưa có progress bar (TODO)
4. **Error Handling**: Alert đơn giản (TODO: Better UX)

---

## 🚀 Next Steps

### Phase 1 (Completed) ✅
- [x] Basic upload functionality
- [x] Drag & drop files
- [x] Image preview
- [x] Delete images
- [x] Reorder images
- [x] Validation
- [x] Integration vào ProductForm

### Phase 2 (Future)
- [ ] Upload progress bar
- [ ] Image cropper
- [ ] Compress before upload
- [ ] Multiple upload methods (URL, camera)
- [ ] Better error messages
- [ ] Image metadata (alt text, caption)

---

## 📞 Support

Component location: `src/components/dashboard/ImageUpload.tsx`

Integration examples:
- Products: `src/components/dashboard/ProductForm.tsx`
- Demo: `src/components/dashboard/ContentImageExample.tsx`

---

**Version**: 1.0  
**Last Updated**: October 2025  
**Status**: Production Ready ✅

