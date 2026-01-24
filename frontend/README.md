# 🌟 Aura Frontend - Multimodal AI Companion for Elderly Care

## Giới thiệu

**Aura** là người bạn AI đồng hành thân thiện, được thiết kế đặc biệt để hỗ trợ và trò chuyện với người cao tuổi. Giao diện được xây dựng với trọng tâm vào sự đơn giản, dễ sử dụng và thân thiện với người lớn tuổi.

![Aura Preview](./docs/preview.png)

## 📱 Responsive Web App - Chạy trên mọi thiết bị

| Platform                 | Hỗ trợ | Cách truy cập                                   |
| ------------------------ | ------ | ----------------------------------------------- |
| 💻 **Windows/Mac/Linux** | ✅     | Mở browser → vào URL                            |
| 📱 **Android**           | ✅     | Chrome → vào URL → "Add to Home Screen"         |
| 🍎 **iOS (iPhone/iPad)** | ✅     | Safari → vào URL → Share → "Add to Home Screen" |

### Tính năng Cross-Platform:

- ✅ **Responsive Design** - Tự động thích ứng PC, tablet, mobile
- ✅ **Touch-friendly** - Nút lớn 48px+, dễ chạm trên điện thoại
- ✅ **PWA Support** - Có thể thêm vào Home Screen như app
- ✅ **Safe Area Support** - Hỗ trợ iPhone notch
- ✅ **Voice Input** - Web Speech API hoạt động trên Chrome mobile

## ✨ Tính năng chính

### 🎭 Avatar Tương tác

- Avatar SVG sinh động với khả năng lip-sync khi nói
- Chớp mắt tự nhiên và biểu cảm khuôn mặt
- Các trạng thái: Idle, Listening, Thinking, Speaking
- Hiệu ứng glow và animation mượt mà

### 💬 Giao diện Chat

- Bong bóng chat hiện đại, dễ đọc
- Hỗ trợ cuộn mượt mà
- Hiệu ứng typing indicator
- Timestamps cho mỗi tin nhắn

### 🎤 Nhận diện Giọng nói

- Tích hợp Web Speech API
- Hỗ trợ tiếng Việt
- Hiển thị transcript real-time
- Nút micro lớn, dễ nhấn

### 🆘 Nút SOS Khẩn cấp

- Nút SOS luôn hiển thị, dễ tiếp cận
- Countdown xác nhận trước khi gọi
- Thông báo tức thì cho người thân

### ⚙️ Cài đặt Tùy chỉnh

- Thay đổi cỡ chữ (Vừa/Lớn/Rất lớn)
- Tốc độ nói của Aura
- Chế độ sáng/tối
- Tên gọi tùy chỉnh

## 🚀 Cài đặt & Chạy

### Yêu cầu

- Node.js 18.x trở lên
- npm hoặc yarn

### Các bước cài đặt

```bash
# Clone repository
git clone <repo-url>
cd aura/frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở browser tại [http://localhost:3000](http://localhost:3000)

### Build Production

```bash
npm run build
npm start
```

## 🎨 Thiết kế Elderly-Friendly

Giao diện được thiết kế đặc biệt cho người cao tuổi:

- **Nút lớn**: Minimum 48x48px để dễ chạm/click
- **Chữ to rõ**: 18-24px cho text thông thường
- **Màu sắc tương phản cao**: Dễ phân biệt các thành phần
- **Layout đơn giản**: Tránh clutter, focus vào chức năng chính
- **SOS dễ tiếp cận**: Luôn visible ở góc màn hình

## 📁 Cấu trúc Project

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Main page
│   ├── components/
│   │   ├── Avatar.tsx     # Avatar với lip-sync
│   │   ├── ChatInterface.tsx
│   │   ├── SOSButton.tsx
│   │   ├── VoiceButton.tsx
│   │   ├── StatusBar.tsx
│   │   ├── SettingsPanel.tsx
│   │   └── WelcomeModal.tsx
│   └── types/
│       └── index.ts       # TypeScript interfaces
├── tailwind.config.js
├── package.json
└── README.md
```

## 🔗 Tích hợp Backend

Frontend được thiết kế để tích hợp với backend qua WebSocket:

```javascript
// Kết nối WebSocket (sẽ được implement)
const socket = io("ws://localhost:8000");

socket.on("audio_response", (data) => {
  // Play audio response
});

socket.on("transcript", (data) => {
  // Update chat with AI response
});
```

## 🎯 Roadmap

### Đã hoàn thành ✅

- [x] Giao diện cơ bản responsive
- [x] Avatar SVG với animation
- [x] Chat interface
- [x] Voice input (Web Speech API)
- [x] SOS button với confirmation
- [x] Settings panel
- [x] Welcome onboarding flow

### Đang phát triển 🔄

- [ ] Tích hợp WebSocket với backend
- [ ] Lip-sync chính xác với audio
- [ ] Dark mode hoàn chỉnh
- [ ] PWA support

### Tương lai 📋

- [ ] Lịch sử chat persistent
- [ ] Reminder notifications
- [ ] Video call integration
- [ ] Multi-language support

## 👥 Team

**Thành viên 2 - The Visualizer**

- UI/UX Design
- Frontend Development
- Avatar Integration

## 📝 License

MIT License - Xem [LICENSE](./LICENSE) để biết thêm chi tiết.

---

Made with 💙 for our elderly community
