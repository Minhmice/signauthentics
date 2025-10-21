# 🎬 GSAP ScrollTrigger Guide

## 📝 Tổng Quan

`useScrollReveal` hook sử dụng GSAP ScrollTrigger để tạo animations khi scroll đến carousel. Cards sẽ xuất hiện với hiệu ứng stagger (lần lượt) khi scroll vào viewport.

---

## 🚀 Cách Sử Dụng

### Basic Usage

```typescript
<OptimizedCarousel
  items={data}
  renderItem={(item) => <Card {...item} />}
  cardWidth={256}
  enableScrollReveal={true}  // Bật GSAP ScrollTrigger
/>
```

### Advanced Usage

```typescript
<OptimizedCarousel
  items={data}
  renderItem={(item) => <Card {...item} />}
  cardWidth={256}
  enableScrollReveal={true}
  scrollRevealOptions={{
    stagger: 0.1,              // Độ trễ giữa các cards (seconds)
    duration: 1,               // Thời gian animation (seconds)
    from: {
      opacity: 0,              // Bắt đầu từ opacity 0
      y: 80,                   // Bắt đầu từ vị trí +80px (dưới)
      scale: 0.9              // Bắt đầu từ scale 90%
    },
    ease: "power3.out"         // Easing function
  }}
/>
```

---

## ⚙️ Options Chi Tiết

### `scrollRevealOptions`

| Option | Type | Default | Mô tả |
|--------|------|---------|-------|
| `stagger` | number | `0.08` | Thời gian delay giữa các cards (seconds) |
| `duration` | number | `0.8` | Thời gian animation của mỗi card (seconds) |
| `ease` | string | `"power3.out"` | GSAP easing function |
| `from.opacity` | number | `0` | Opacity ban đầu (0-1) |
| `from.y` | number | `60` | Vị trí Y ban đầu (pixels) |
| `from.scale` | number | `0.95` | Scale ban đầu (0-1) |

### Easing Options (GSAP)

```typescript
// Smooth & Natural
"power1.out"  // Gentle
"power2.out"  // Standard  
"power3.out"  // Strong (default)
"power4.out"  // Very strong

// Bounce
"bounce.out"
"elastic.out"

// Back
"back.out"
"back.inOut"

// Expo
"expo.out"
"expo.inOut"
```

---

## 🎨 Animation Presets

### 1. Gentle Rise (Nhẹ nhàng)
```typescript
scrollRevealOptions={{
  stagger: 0.08,
  duration: 0.8,
  from: { opacity: 0, y: 40, scale: 0.98 },
  ease: "power2.out"
}}
```

### 2. Dynamic Entry (Năng động)
```typescript
scrollRevealOptions={{
  stagger: 0.1,
  duration: 1,
  from: { opacity: 0, y: 80, scale: 0.9 },
  ease: "power3.out"
}}
```

### 3. Dramatic Reveal (Ấn tượng)
```typescript
scrollRevealOptions={{
  stagger: 0.12,
  duration: 1.2,
  from: { opacity: 0, y: 100, scale: 0.85 },
  ease: "power4.out"
}}
```

### 4. Smooth Float (Mượt mà)
```typescript
scrollRevealOptions={{
  stagger: 0.15,
  duration: 1.4,
  from: { opacity: 0, y: 120, scale: 0.8 },
  ease: "power4.out"
}}
```

### 5. Bounce Entry (Nảy)
```typescript
scrollRevealOptions={{
  stagger: 0.1,
  duration: 1.2,
  from: { opacity: 0, y: 60, scale: 0.9 },
  ease: "bounce.out"
}}
```

### 6. Elastic Pop (Đàn hồi)
```typescript
scrollRevealOptions={{
  stagger: 0.08,
  duration: 1,
  from: { opacity: 0, y: 50, scale: 0.85 },
  ease: "elastic.out(1, 0.5)"
}}
```

---

## 🔧 Advanced Hook Usage

Nếu muốn custom hoàn toàn, có thể dùng trực tiếp hook:

```typescript
import { useScrollReveal } from "@/hooks/useScrollReveal";

function MyComponent() {
  const { containerRef, registerCard } = useScrollReveal({
    enabled: true,
    stagger: 0.1,
    duration: 1,
    delay: 0.2,              // Delay trước khi bắt đầu
    from: {
      opacity: 0,
      y: 100,
      x: 50,                 // Slide từ bên phải
      scale: 0.8,
      rotateY: 45            // 3D rotation
    },
    ease: "power3.out",
    markers: false,          // true = show debug markers
    start: "top 80%",        // Trigger khi top của element ở 80% viewport
    end: "top 20%",
    once: true               // Chỉ animate 1 lần
  });

  return (
    <div ref={containerRef}>
      {items.map((item, i) => (
        <div ref={registerCard(i)}>
          {item.content}
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 ScrollTrigger Positions

### `start` và `end` positions:

```typescript
// Format: "trigger viewport"
start: "top top"        // Khi top element chạm top viewport
start: "top center"     // Khi top element chạm center viewport
start: "top 80%"        // Khi top element ở 80% viewport
start: "center center"  // Khi center element chạm center viewport
start: "bottom bottom"  // Khi bottom element chạm bottom viewport
```

### Visual Guide:
```
Viewport:
┌─────────────┐ 0% (top)
│             │
│             │ 50% (center)
│             │
└─────────────┘ 100% (bottom)
```

---

## 🎨 Effect Examples

### Slide from Left
```typescript
from: { opacity: 0, x: -100, y: 0 }
```

### Slide from Right
```typescript
from: { opacity: 0, x: 100, y: 0 }
```

### Fade & Scale
```typescript
from: { opacity: 0, scale: 0.5 }
```

### 3D Flip
```typescript
from: { opacity: 0, rotateY: 90, scale: 0.8 }
```

### Rise & Rotate
```typescript
from: { opacity: 0, y: 100, rotateZ: 10 }
```

---

## 🔥 Performance Tips

1. **Use `once: true`** - Animate chỉ 1 lần để tối ưu performance
2. **Reasonable stagger** - Không dùng quá nhiều cards với stagger cao
3. **GPU properties** - Ưu tiên `opacity`, `scale`, `x`, `y` (được GPU-accelerated)
4. **Avoid layout triggers** - Tránh animate `width`, `height`, `margin`, `padding`

---

## 🐛 Debugging

Enable markers để debug ScrollTrigger:

```typescript
scrollRevealOptions={{
  markers: true  // Shows trigger points
}}
```

Or trong hook:
```typescript
useScrollReveal({
  markers: true,
  ...otherOptions
})
```

---

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ IE11 (requires polyfills)

---

## 📚 Resources

- [GSAP Docs](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Easing Visualizer](https://greensock.com/ease-visualizer/)

---

## 🎓 Examples in Project

| Component | Stagger | Duration | Effect |
|-----------|---------|----------|--------|
| PlayersSpotlight | 0.1s | 1s | Dynamic rise |
| BallonDorCarousel | 0.12s | 1.2s | Dramatic reveal |
| LatestNews | 0.15s | 1.4s | Smooth float |

