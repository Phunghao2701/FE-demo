# 🚀 PROMPT CHIA TASK & ISSUES PHÁT TRIỂN DEMO UI/UX TRÊN CHATGPT

Bạn hãy copy toàn bộ phần text trong ô code block dưới đây và gửi cho ChatGPT để nhận kế hoạch chia nhỏ các issue cần phát triển cho dự án prototype/demo của bạn:

```markdown
Tôi đang xây dựng phần logic tương tác cho dự án Frontend React của hệ thống **ResearchPulse** (Hệ thống theo dõi xu hướng công bố tạp chí khoa học - Scientific Journal Publication Trend Tracking System). 

**QUAN TRỌNG**: Dự án này chủ yếu được phát triển dưới dạng **UI/UX Demo / Clickable Prototype** (không tích hợp backend cơ sở dữ liệu thật, tất cả dữ liệu sẽ được mô phỏng dưới dạng Mock Data và lưu trữ trạng thái người dùng/dự án thông qua `localStorage` trên trình duyệt).

Tôi muốn bạn đóng vai trò là một **Senior Tech Lead / UI-UX Developer**. Hãy giúp tôi phân chia dự án này thành các **Task / Issues (Jira/GitHub)** cụ thể, chi tiết nhất để tôi tiến hành code phát triển giao diện tĩnh thành một bản demo tương tác hoàn chỉnh cho **18 tính năng (features)** dưới đây.

---

### 1. QUY CHUẨN DESIGN SYSTEM (LIGHT THEME - SCIMAGO STYLE)
Chúng tôi áp dụng giao diện sáng, tối giản, tinh tế theo phong cách **SCImago Journal Rank**:
- **CSS Variables chính** (nằm trong `src/index.css`):
  - `--bg-main`: `#FFFFFF` (Nền chính)
  - `--bg-section`: `#ECECEC` (Nền section, nền card phụ)
  - `--bg-chip`: `#F2F2F2` (Nền chip, filter, search input)
  - `--bg-card`: `#FFFFFF` (Bề mặt card trắng)
  - `--border`: `#E6E6E6` (Đường viền/đường kẻ chia)
  - `--text-main`: `#0D1B1C` (Màu chữ chính - xanh đen)
  - `--text-muted`: `#6B6B6B` (Màu chữ phụ/xám)
  - `--primary`: `#FF7A33` (Màu cam accent chính - link, active state)
  - `--primary-light`: `#FFF0E8` (Tint cam nhạt - nền badge, hover bg)
  - `--btn-dark`: `#071A1C` (Màu button xanh đen đậm - CTA chính)
  - `--q1-color`: `#2FC646` (Màu xanh lá của phân hạng tạp chí Q1)
- **Fonts**:
  - Logo, Heading, Page Title (`h1`, `h2`, `h3`, `.page-title`): Sử dụng Serif font **Source Serif 4** (`--font-display`).
  - Body, button, menu, badge, bảng biểu: Sử dụng Sans-serif font **Inter** (`--font-sans`).

---

### 2. DANH SÁCH 18 FEATURES CẦN BẢN DEMO HOÀN CHỈNH
Dưới đây là danh sách đầy đủ 18 tính năng cần chia task để làm mockup tương tác:
1. **Dashboard / Tổng quan / Xu hướng**: Xem biểu đồ thống kê xu hướng xuất bản bài báo khoa học.
2. **Search / Danh mục & Tìm kiếm**: Tìm kiếm nhanh các tài liệu, tác giả, bài báo trên thanh tìm kiếm của Landing/Catalog.
3. **Catalog Journal Search**: Tìm kiếm chuyên sâu danh mục tạp chí khoa học.
4. **Journal List / Trang Tạp chí**: Hiển thị bảng danh sách các tạp chí với bộ lọc Quartile, Category.
5. **Journal Detail**: Chi tiết một tạp chí, xếp hạng SCImago, biểu đồ Impact Factor, danh sách bài báo của tạp chí đó.
6. **Article List / Trang Bài báo**: Danh sách các bài báo khoa học được công bố.
7. **Article Detail**: Chi tiết một bài báo (tác giả, abstract, số lượng trích dẫn, link ngoài).
8. **Author Feature**: Bảng xếp hạng tác giả (Author List) và trang chi tiết hồ sơ khoa học của tác giả (Author Detail).
9. **Project Management**: Tạo mới và quản lý các dự án theo dõi xu hướng của riêng người dùng (lưu `localStorage`).
10. **Keyword Tracking / Keyword Watch**: Danh sách và quản lý các keywords đang được theo dõi trong dự án.
11. **Geography / Địa lý**: Bản đồ trực quan hiển thị mật độ xuất bản bài viết theo quốc gia/khu vực.
12. **Profile / Hồ sơ người dùng**: Quản lý thông tin tài khoản và cấu hình nhận thông báo email định kỳ.
13. **Login**: Giao diện đăng nhập mô phỏng (lưu session vào `localStorage`).
14. **Register**: Giao diện đăng ký tài khoản mới.
15. **Activation Success / Kích hoạt tài khoản thành công**: Trang thông báo OTP đúng và kích hoạt tài khoản thành công kèm đồng hồ chuyển hướng.
16. **Forgot Password + Reset Password**: Giao diện quên mật khẩu và đặt lại mật khẩu mới.
17. **Volume & Issue**: Hiển thị danh sách Volumes & Issues theo dạng thư mục mở rộng/thu nhỏ trong chi tiết tạp chí.
18. **Admin / Management CRUD**: Giao diện quản lý của Admin gồm thống kê, CRUD tạp chí, CRUD bài viết, CRUD volumes/issues giả lập.

---

### 3. CẤU TRÚC THƯ MỤC DỰ ÁN (FOLDER STRUCTURE)
Dự án được tổ chức theo mô hình Feature-Driven Development:
```txt
src/
├── app/
│   ├── layouts/       # Layouts (MainLayout, AuthLayout, AdminLayout)
│   ├── routes/        # Cấu hình định tuyến (AppRoutes, ProtectedRoute)
│   └── store/         # Global Store quản lý session đăng nhập giả lập
│
├── features/          # Chức năng chính của hệ thống. Mỗi thư mục con chứa:
│   │                  # components/ (giao diện), hooks/ (logic), pages/ (trang ghép),
│   │                  # services/ (chứa các file Mock Data tĩnh / hàm CRUD localStorage)
│   ├── landing/       # Trang giới thiệu
│   ├── auth/          # Đăng ký, đăng nhập, otp, quên mật khẩu
│   ├── dashboard/     # Bảng tổng quan xu hướng & biểu đồ
│   ├── catalog/       # Tìm kiếm danh mục
│   ├── journal/       # Danh sách & chi tiết tạp chí
│   ├── article/       # Danh sách & chi tiết bài báo
│   ├── author/        # Danh sách & chi tiết hồ sơ tác giả
│   ├── project/       # Quản lý dự án theo dõi xu hướng
│   ├── zone/          # Xu hướng phân bố địa lý các công bố (Bản đồ)
│   └── profile/       # Hồ sơ & Cài đặt thông báo người dùng
│
├── shared/            # Code dùng chung (button, input, data table, hooks)
│   ├── components/    # Reusable UI (Button, Input, Badge, Table, Spinner, EmptyState)
│   └── hooks/         # Hook dùng chung (useDebounce, useLocalStorage)
```

---

### 4. NHIỆM VỤ CỦA BẠN (PM / TECH LEAD):
Hãy chia nhỏ dự án thành các **Epic và các Issue cụ thể (Jira Tasks)** phục vụ cho việc dựng **UI/UX Demo Tương tác**. 

Yêu cầu mỗi Issue phải cung cấp các thông tin sau:
1. **Title**: Tiêu đề issue rõ ràng (Ví dụ: `[FE-Demo-Project] Thiết lập giao diện thêm/bớt từ khóa và cập nhật biểu đồ xu hướng`).
2. **Feature Folder**: Thư mục feature tương ứng.
3. **Mô tả chi tiết & Hướng dẫn**: Cách mock dữ liệu và xử lý các tương tác của user.
4. **Checklist tương tác UI/UX**: Các nút bấm chuyển trang, hiệu ứng hover/active, cách lưu/đọc dữ liệu từ `localStorage`.
5. **Mức độ ưu tiên (Priority)**: High / Medium / Low.
```
