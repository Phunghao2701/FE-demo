# PROMPT CHO CHATGPT: CHIA TASK & ISSUES PHÁT TRIỂN HỆ THỐNG RESEARCHPULSE

Bạn hãy copy toàn bộ nội dung dưới đây và gửi cho ChatGPT để nhận kế hoạch chia task/issues chi tiết:

```markdown
Chào bạn, tôi đang xây dựng một dự án có tên là **ResearchPulse** (Hệ thống theo dõi xu hướng công bố tạp chí khoa học - Scientific Journal Publication Trend Tracking System). 

Tôi đã hoàn thành phần thiết kế giao diện tĩnh (Frontend Mockups) bằng HTML/CSS/JS. Bây giờ tôi cần bạn đóng vai trò là một **Project Manager / Tech Lead**, hãy giúp tôi phân chia dự án này thành các **Task / Issues** cụ thể (Ví dụ: Back-log, To-do list) để tôi tiến hành đưa lên GitHub Issues / Jira và bắt đầu code phát triển phần logic Frontend kết hợp tích hợp Backend API.

Dưới đây là thông tin chi tiết về dự án của tôi:

---

### 1. CÔNG NGHỆ SỬ DỤNG TRÊN FRONTEND (TECH STACK)
- **Core**: HTML5, Vanilla JavaScript.
- **Styling**: Vanilla CSS (được tách thành `design-system.css`, `components.css`, `layouts.css` để giữ tính nhất quán).
- **Tính năng đặc biệt**:
  - Đã có cơ chế Đa ngôn ngữ (Tiếng Việt & Tiếng Anh) hoạt động động bằng JavaScript client-side (`main.js` quét DOM và dịch tự động dựa trên từ điển localization).
  - Có chế độ Dark/Light mode (Monochrome Theme) chuyển đổi qua lớp class trên thẻ `<body>`.
  - Phân quyền định tuyến (Protected/Admin Routes) client-side thông qua kiểm tra trạng thái đăng nhập trong `localStorage`.

---

### 2. CẤU TRÚC THƯ MỤC & CÁC TRANG HIỆN CÓ
Dự án được tổ chức thành các trang độc lập nằm trong các thư mục tính năng sau:

1. **Trang chủ (Public Landing Page)**:
   - `index.html`: Hero section, tìm kiếm giả lập, danh sách tính năng chính, hướng dẫn sử dụng, CTA đăng ký.
2. **Xác thực tài khoản (Auth)**:
   - `auth/login.html`: Đăng nhập tài khoản.
   - `auth/register.html`: Đăng ký tài khoản mới.
   - `auth/forgot-password.html`: Yêu cầu gửi email reset mật khẩu.
   - `auth/reset-password.html`: Đặt mật khẩu mới.
   - `auth/verify-email.html`: Nhập mã OTP 6 số để xác thực email.
   - `auth/verify-success.html`: Trang thông báo kích hoạt tài khoản thành công kèm countdown chuyển hướng tự động về Dashboard.
3. **Bảng tổng quan (Dashboard)**:
   - `dashboard/index.html`: Dashboard chính hiển thị các biểu đồ tổng quan xu hướng bài báo, số lượng bài báo mỗi năm, và danh sách bài viết mới nhất.
4. **Tra cứu & Tìm kiếm (Catalog)**:
   - `catalog/index.html`: Tra cứu tạp chí và bài viết theo Subject Areas, Subject Categories, Volumes, Issues.
5. **Tạp chí (Journals)**:
   - `journals/index.html`: Danh sách tạp chí khoa học kèm bộ lọc nâng cao.
   - `journals/detail.html`: Chi tiết tạp chí, hiển thị thứ hạng SCImago (Q1-Q4), chỉ số Impact Factor qua các năm.
6. **Bài viết khoa học (Articles)**:
   - `articles/index.html`: Danh sách các bài viết.
   - `articles/detail.html`: Chi tiết bài báo (Abstract, danh sách tác giả, số lượt trích dẫn, liên kết đọc ngoài).
7. **Tác giả (Authors)**:
   - `authors/index.html`: Bảng xếp hạng tác giả nổi bật.
   - `authors/detail.html`: Hồ sơ tác giả khoa học, biểu đồ số lượng bài viết và trích dẫn theo năm, danh sách bài báo đã xuất bản.
8. **Dự án cá nhân (Projects - Cần đăng nhập)**:
   - `projects/index.html`: Danh sách các dự án theo dõi xu hướng của người dùng.
   - `projects/create.html`: Biểu mẫu tạo dự án theo dõi xu hướng mới, chọn chuyên ngành và danh sách keywords muốn track.
   - `projects/detail.html`: Chi tiết dự án, vẽ biểu đồ đường (Line Chart) so sánh trend của các keywords trong dự án qua các năm và cập nhật bài báo mới liên quan.
   - `projects/keywords.html`: Quản lý, thêm/bớt keywords theo dõi trong dự án.
9. **Bản đồ địa lý (Geography)**:
   - `geography/index.html`: Bản đồ hiển thị mật độ và xu hướng công bố khoa học theo khu vực/quốc gia.
10. **Hồ sơ & Cài đặt (Profile - Cần đăng nhập)**:
    - `profile/index.html`: Cập nhật thông tin cá nhân, cấu hình nhận thông báo qua email định kỳ khi các keyword hoặc journal đang theo dõi có bài báo mới.
11. **Quản trị hệ thống (Admin Layout - Cần quyền Admin)**:
    - `admin/dashboard.html`: Thống kê hệ thống, lượng truy cập, tài nguyên đồng bộ.
    - `admin/journals.html`: Quản lý danh sách tạp chí, import Excel/CSV.
    - `admin/articles.html`: Quản lý danh sách bài viết, trigger đồng bộ dữ liệu từ API OpenAlex.
    - `admin/volumes.html`: Quản lý các Volumes và Issues của tạp chí.

---

### 3. YÊU CẦU ĐẦU RA CHO BẠN (CHATGPT)
Hãy thiết kế kế hoạch chia task/issues phát triển dự án này theo cấu trúc chuyên nghiệp, bao gồm:

1. **Giai đoạn 1: Chuẩn bị hạ tầng & Trạng thái toàn cục (Global State)**
   - Thiết lập cấu trúc kết nối API, tạo helper/service fetch chung xử lý JWT token.
   - Quản lý trạng thái đăng nhập và thông tin người dùng đồng bộ trên tất cả các trang.

2. **Giai đoạn 2: Tích hợp API cho nhóm tính năng Công cộng (Public Features)**
   - API sử dụng: Đăng nhập/Đăng ký/Xác thực (`/api/v1/auth/*`), Tra cứu catalog (`/api/v1/catalog/*`), Chi tiết Tạp chí & Bài báo (`/api/v1/journal/*`, `/api/v1/articles/*`).
   - Chia thành các task cụ thể cho từng trang tương ứng.

3. **Giai đoạn 3: Tích hợp API cho nhóm tính năng Cá nhân (Private/Workspace Features)**
   - API sử dụng: Quản lý dự án (`/api/v1/projects/*`), theo dõi keywords, nhận thông báo (`/api/v1/profile/*`).
   - Chia thành các task cho việc truyền tải dữ liệu động lên biểu đồ xu hướng (Sử dụng Chart.js hoặc thư viện biểu đồ tương ứng có sẵn trên front-end).

4. **Giai đoạn 4: Tính năng Bản đồ địa lý & Trang Admin**
   - Tích hợp API bản đồ địa lý (`/api/v1/geography/*`).
   - Các API quản trị dành riêng cho Admin (`/api/v1/admin/*`).

5. **Giai đoạn 5: Tối ưu hóa UI/UX, Đa ngôn ngữ và Đóng gói**
   - Đảm bảo việc chuyển đổi ngôn ngữ dịch đầy đủ các nội dung động trả về từ API.
   - Xử lý các trạng thái: Đang tải dữ liệu (Loading state), Dữ liệu trống (Empty state), Lỗi kết nối (Error/Fail state).

**Định dạng mỗi Issue yêu cầu gồm**:
- **Title**: Tiêu đề issue rõ ràng (ví dụ: `[FE-Auth] Tích hợp API Đăng nhập và tự động lưu session`).
- **Description / Checklist**: Các đầu mục cần làm cụ thể để hoàn thành issue đó.
- **API tương ứng**: Liệt kê API cần sử dụng cho issue này (ví dụ: `POST /api/v1/auth/login`).
- **Priority**: Đánh giá mức độ ưu tiên (High / Medium / Low).
```
