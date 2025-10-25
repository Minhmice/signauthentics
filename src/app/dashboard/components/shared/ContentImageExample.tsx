"use client";

/**
 * Content Image Upload Examples
 * Demo cách sử dụng ImageUpload cho Content/News/Blog
 */

import * as React from "react";
import { ImageUpload } from "./ImageUpload";
import { Card, CardContent } from "@/components/ui/card";

export function ContentImageExample() {
  const [featuredImage, setFeaturedImage] = React.useState<string | null>(null);
  const [galleryImages, setGalleryImages] = React.useState<Array<{ id: string; url: string; name: string }>>([]);

  return (
    <div className="space-y-6 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Image Upload Examples</h2>
        <p className="text-zinc-400">Cách sử dụng ImageUpload component cho Content, News, và Blog</p>
      </div>

      <div className="space-y-8">
        {/* Featured Image Section */}
        <div className="space-y-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Single Featured Image</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Dùng cho ảnh bìa của bài viết, news thumbnail, hoặc blog hero image
              </p>
              
              <ImageUpload 
                images={featuredImage ? [{ id: '1', url: featuredImage, name: 'featured' }] : []}
                onChange={(images) => setFeaturedImage(images[0]?.url || null)}
                maxImages={1}
                maxSizeMB={5}
              />
              
              {featuredImage && (
                <div className="mt-4 p-3 bg-zinc-800 rounded border border-zinc-700">
                  <p className="text-xs text-zinc-400 mb-1">Preview URL:</p>
                  <code className="text-xs text-green-400 break-all">{featuredImage}</code>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Gallery Section */}
        <div className="space-y-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Multiple Images Gallery</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Dùng cho article galleries, photo essays, hoặc product collections
              </p>
              
              <ImageUpload 
                images={galleryImages}
                onChange={setGalleryImages}
                maxImages={12}
                maxSizeMB={3}
              />
              
              {galleryImages.length > 0 && (
                <div className="mt-4 p-3 bg-zinc-800 rounded border border-zinc-700">
                  <p className="text-xs text-zinc-400 mb-2">Uploaded {galleryImages.length} image(s):</p>
                  <div className="space-y-1">
                    {galleryImages.map((img, i) => (
                      <div key={img.id} className="text-xs text-zinc-500">
                        {i + 1}. {img.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Usage Guide Section */}
        <div className="space-y-4">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Usage Guide</h3>
                <p className="text-sm text-zinc-400">How to integrate ImageUpload in your forms</p>
              </div>

              {/* Example 1: Single Image */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-zinc-300">1. Single Featured Image (News/Blog)</h4>
                <pre className="p-4 bg-zinc-950 rounded border border-zinc-800 overflow-x-auto">
                  <code className="text-xs text-zinc-300">
{`import { SingleImageUpload } from '@/app/dashboard/components/shared/ImageUpload';

const [featuredImage, setFeaturedImage] = useState<string | null>(null);

<SingleImageUpload 
  image={featuredImage}
  onChange={setFeaturedImage}
  maxSizeMB={5}
  accept='image/jpeg,image/png,image/webp'
/>`}
                  </code>
                </pre>
              </div>

              {/* Example 2: Multiple Images */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-zinc-300">2. Multiple Images Gallery (Articles)</h4>
                <pre className="p-4 bg-zinc-950 rounded border border-zinc-800 overflow-x-auto">
                  <code className="text-xs text-zinc-300">
{`import { ImageUpload } from '@/app/dashboard/components/shared/ImageUpload';

const [images, setImages] = useState<ImageFile[]>([]);

<ImageUpload 
  images={images}
  onChange={setImages}
  maxImages={12}
  maxSizeMB={3}
/>`}
                  </code>
                </pre>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-zinc-300">Features</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-zinc-400">
                  <li>Drag & drop files from desktop</li>
                  <li>Drag to reorder images (first image = primary)</li>
                  <li>Click to upload multiple files</li>
                  <li>Preview thumbnails với delete button</li>
                  <li>File size validation</li>
                  <li>Image format validation (JPG, PNG, WEBP)</li>
                </ul>
              </div>

              {/* Props */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-zinc-300">Props</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left py-2 px-3 text-zinc-400">Prop</th>
                        <th className="text-left py-2 px-3 text-zinc-400">Type</th>
                        <th className="text-left py-2 px-3 text-zinc-400">Default</th>
                        <th className="text-left py-2 px-3 text-zinc-400">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-300">
                      <tr className="border-b border-zinc-800">
                        <td className="py-2 px-3">images</td>
                        <td className="py-2 px-3">ImageFile[]</td>
                        <td className="py-2 px-3">[]</td>
                        <td className="py-2 px-3">Initial images</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="py-2 px-3">onChange</td>
                        <td className="py-2 px-3">function</td>
                        <td className="py-2 px-3">-</td>
                        <td className="py-2 px-3">Callback when images change</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="py-2 px-3">maxImages</td>
                        <td className="py-2 px-3">number</td>
                        <td className="py-2 px-3">6</td>
                        <td className="py-2 px-3">Maximum images allowed</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="py-2 px-3">maxSizeMB</td>
                        <td className="py-2 px-3">number</td>
                        <td className="py-2 px-3">2</td>
                        <td className="py-2 px-3">Max file size in MB</td>
                      </tr>
                      <tr className="border-b border-zinc-800">
                        <td className="py-2 px-3">accept</td>
                        <td className="py-2 px-3">string</td>
                        <td className="py-2 px-3">image/jpeg,...</td>
                        <td className="py-2 px-3">Accepted file types</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

