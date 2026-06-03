/* =====================================================
   RESEARCHPULSE — MAIN JS
   Shared interactions, sidebar toggle, tabs, modals
   ===================================================== */

// ---- Sidebar Toggle ----
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('#sidebar-toggle');
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
}

// ---- Active nav link ----
document.querySelectorAll('.nav-link, .sidebar-item').forEach(link => {
  if (link.href && link.href === window.location.href) link.classList.add('active');
});

// ---- Tabs ----
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabGroup = btn.closest('[data-tabs]');
    if (!tabGroup) return;
    tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    tabGroup.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.querySelector(btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ---- Modal open/close ----
document.querySelectorAll('[data-modal-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = document.querySelector(btn.dataset.modalOpen);
    if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
  });
});
document.querySelectorAll('[data-modal-close], .modal-overlay').forEach(el => {
  el.addEventListener('click', (e) => {
    if (el.classList.contains('modal-overlay') && e.target !== el) return;
    const modal = el.closest('.modal-overlay') || document.querySelector(el.dataset.modalClose);
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
  });
});

// ---- Dropdown toggle ----
document.querySelectorAll('[data-dropdown]').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = document.querySelector(trigger.dataset.dropdown);
    if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
});

// ---- Scroll: nav background ----
const publicNav = document.querySelector('.public-nav');
if (publicNav) {
  window.addEventListener('scroll', () => {
    publicNav.style.background = window.scrollY > 40
      ? 'rgba(11,13,17,0.95)' : 'rgba(11,13,17,0.8)';
  });
}

// ---- Animate on scroll (simple) ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeIn');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.feature-card, .step, .stat-card, .card, .journal-card, .article-card, .project-card').forEach(el => {
  observer.observe(el);
});

// ---- Tag remove ----
document.querySelectorAll('.tag-remove').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.tag').remove());
});

// ---- Password toggle ----
document.querySelectorAll('[data-password-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.querySelector(btn.dataset.passwordToggle);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.textContent = input.type === 'password' ? '👁️' : '🙈';
  });
});

// ---- Counter animation ----
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}
document.querySelectorAll('[data-count]').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounter(el); obs.disconnect(); }
  });
  obs.observe(el);
});

// ---- Search suggestions demo ----
const searchSuggestions = ['LLM', 'RAG', 'Transformer', 'Computer Vision', 'Reinforcement Learning', 'BERT', 'GPT', 'Diffusion Models', 'Graph Neural Networks'];
const heroSearch = document.querySelector('#hero-search');
const suggBox = document.querySelector('#hero-suggestions');
if (heroSearch && suggBox) {
  heroSearch.addEventListener('input', () => {
    const val = heroSearch.value.trim().toLowerCase();
    if (!val) { suggBox.style.display = 'none'; return; }
    const matches = searchSuggestions.filter(s => s.toLowerCase().includes(val));
    if (matches.length === 0) { suggBox.style.display = 'none'; return; }
    suggBox.innerHTML = matches.map(m => `<div class="dropdown-item" onclick="document.querySelector('#hero-search').value='${m}';document.querySelector('#hero-suggestions').style.display='none'">${m}</div>`).join('');
    suggBox.style.display = 'block';
  });
  document.addEventListener('click', e => { if (!heroSearch.contains(e.target)) suggBox.style.display = 'none'; });
}

/* =====================================================
   LOCALIZATION DICTIONARY & TRANSLATION ENGINE
   ===================================================== */
const LOCALIZATION_DICTIONARY = {
  vi: {
    // Navigation / General
    "Tìm kiếm": "Tìm kiếm",
    "Xu hướng": "Xu hướng",
    "Project": "Project",
    "Địa lý": "Địa lý",
    "Tác giả": "Tác giả",
    "Đăng nhập": "Đăng nhập",
    "Đăng ký miễn phí": "Đăng ký miễn phí",
    "Tạo tài khoản miễn phí": "Tạo tài khoản miễn phí",
    "Thử tìm kiếm ngay": "Thử tìm kiếm ngay",
    "Tìm kiếm nhanh...": "Tìm kiếm nhanh...",
    "Bắt đầu tìm kiếm": "Bắt đầu tìm kiếm",
    "Xem xu hướng": "Xem xu hướng",
    
    // Landing page hero
    "Khám phá xu hướng": "Khám phá xu hướng",
    "nghiên cứu khoa học": "nghiên cứu khoa học",
    "theo thời gian thực": "theo thời gian thực",
    "Tìm kiếm bài báo, phân tích keyword đang nổi, theo dõi lĩnh vực bạn quan tâm — tất cả trong một nơi.": "Tìm kiếm bài báo, phân tích keyword đang nổi, theo dõi lĩnh vực bạn quan tâm — tất cả trong một nơi.",
    "Dữ liệu từ OpenAlex · 200M+ bài báo": "Dữ liệu từ OpenAlex · 200M+ bài báo",
    "Bài báo (70+ tỉ)": "Bài báo (70+ tỉ)",
    "10 tháng / 5 năm": "10 tháng / 5 năm",
    "Keywords theo dõi": "Keywords theo dõi",
    "Miễn phí": "Miễn phí",
    "Không cần thẻ tín dụng": "Không cần thẻ tín dụng",
    "Không cần đăng ký.": "Không cần đăng ký.",
    "Thử ngay:": "Thử ngay:",
    "Nhập keyword, tên tác giả, journal...": "Nhập keyword, tên tác giả, journal...",
    "Tìm →": "Tìm →",
    
    // Landing page features
    "Tại sao dùng ResearchPulse?": "Tại sao dùng ResearchPulse?",
    "Không chỉ là công cụ tìm kiếm — mà là nền tảng giúp bạn bứt phá trong cảnh tranh cạnh của nghiên cứu.": "Không chỉ là công cụ tìm kiếm — mà là nền tảng giúp bạn bứt phá trong cảnh tranh cạnh của nghiên cứu.",
    "Tính năng": "Tính năng",
    "Tìm kiếm thông minh": "Tìm kiếm thông minh",
    "Tìm theo keyword, tác giả, journal, năm. Kết quả sắp xếp theo relevance. Đơn giản nhưng mạnh mẽ.": "Tìm theo keyword, tác giả, journal, năm. Kết quả sắp xếp theo relevance. Đơn giản nhưng mạnh mẽ.",
    "Phân tích xu hướng": "Phân tích xu hướng",
    "Xem keyword nào đang tăng trưởng, topic nào đã bão hòa, so sánh nhiều keyword trên cùng biểu đồ.": "Xem keyword nào đang tăng trưởng, topic nào đã bão hòa, so sánh nhiều keyword trên cùng biểu đồ.",
    "Theo dõi & thông báo": "Theo dõi & thông báo",
    "Follow keyword/journal yêu thích. Nhận email khi có bài mới — không bỏ lỡ nghiên cứu quan trọng.": "Follow keyword/journal yêu thích. Nhận email khi có bài mới — không bỏ lỡ nghiên cứu quan trọng.",
    "Thư viện cá nhân": "Thư viện cá nhân",
    "Bookmark bài hay, tổ chức theo project, tag, và danh sách đọc theo cách của riêng bạn.": "Bookmark bài hay, tổ chức theo project, tag, và danh sách đọc theo cách của riêng bạn.",
    "Báo cáo & export": "Báo cáo & export",
    "Tạo báo cáo phân tích xu hướng, xuất CSV hoặc PNG. Dùng cho học thuật hoặc để thuật lại hợp tác.": "Tạo báo cáo phân tích xu hướng, xuất CSV hoặc PNG. Dùng cho học thuật hoặc để thuật lại hợp tác.",
    "Hoàn toàn miễn phí": "Hoàn toàn miễn phí",
    "Dữ liệu từ OpenAlex — mã mở, miễn phí. Không giới hạn API call, không paywall.": "Dữ liệu từ OpenAlex — mã mở, miễn phí. Không giới hạn API call, không paywall.",
    
    // Landing page steps
    "Hướng dẫn": "Hướng dẫn",
    "Cách sử dụng": "Cách sử dụng",
    "Bốn bước để có insight về lĩnh vực nghiên cứu của bạn": "Bốn bước để có insight về lĩnh vực nghiên cứu của bạn",
    "Nhập keyword": "Nhập keyword",
    "Gõ tên keyword muốn nghiên cứu — ví dụ \"LLM\", \"computer vision\"": "Gõ tên keyword muốn nghiên cứu — ví dụ \"LLM\", \"computer vision\"",
    "Xem tổng quan": "Xem tổng quan",
    "Hệ thống vẽ trend chart, và danh sách bài báo liên tục cập nhật": "Hệ thống vẽ trend chart, và danh sách bài báo liên tục cập nhật",
    "Phân tích sâu": "Phân tích sâu",
    "So sánh keyword, xem paper detail, khám phá related topics": "So sánh keyword, xem paper detail, khám phá related topics",
    "Lưu & theo dõi": "Lưu & theo dõi",
    "Bookmark bài hay, follow keyword, nhận thông báo bài mới": "Bookmark bài hay, follow keyword, nhận thông báo bài mới",
    
    // Landing page CTA & footer
    "Bắt đầu nghiên cứu thông minh hơn hôm nay": "Bắt đầu nghiên cứu thông minh hơn hôm nay",
    "Miễn phí, không cần thẻ tín dụng, có thể dùng ngay không cần đăng ký": "Miễn phí, không cần thẻ tín dụng, có thể dùng ngay không cần đăng ký",
    "Về chúng tôi": "Về chúng tôi",
    "Liên hệ": "Liên hệ",
    "Chính sách": "Chính sách",
    
    // App interface
    "Của tôi": "Của tôi",
    "Quản lý": "Quản lý",
    "Hệ thống": "Hệ thống",
    "Cài đặt": "Cài đặt",
    "Đăng xuất": "Đăng xuất",
    "Tổng quan": "Tổng quan",
    "Bài báo": "Bài báo",
    "Tạp chí": "Tạp chí",
    "Dự án": "Dự án",
    "Bản đồ địa lý": "Bản đồ địa lý",
    "Hồ sơ cá nhân": "Hồ sơ cá nhân",
    "Chào mừng quay trở lại": "Chào mừng quay trở lại",
    "Lọc": "Lọc",
    "Tất cả journals": "Tất cả journals",
    "Xem theo keyword →": "Xem theo keyword →",
    "Bài báo liên quan gần đây": "Bài báo liên quan gần đây",
    "Xu hướng bài báo theo năm": "Xu hướng bài báo theo năm",
    "Tổng số bài báo mỗi năm": "Tổng số bài báo mỗi năm",
    "So sánh Impact Factor": "So sánh Impact Factor",
    "Các journal trong project": "Các journal trong project",
    "Tên Journal": "Tên Journal",
    "Tất cả": "Tất cả",
    "Đăng ký": "Đăng ký",
    "👤 Hồ sơ": "👤 Hồ sơ",
    "👤 Hồ sơ cá nhân": "👤 Hồ sơ cá nhân",
    "⏏ Đăng xuất": "⏏ Đăng xuất",
    "📊 Dashboard": "📊 Dashboard",
    "👑 Admin Panel": "👑 Admin Panel",
    "Yêu cầu đăng nhập": "Yêu cầu đăng nhập",
    "Bạn cần đăng nhập tài khoản ResearchPulse để sử dụng chức năng quản lý dự án và theo dõi nghiên cứu.": "Bạn cần đăng nhập tài khoản ResearchPulse để sử dụng chức năng quản lý dự án và theo dõi nghiên cứu.",
    "Hủy bỏ": "Hủy bỏ",
    "Chào mừng bạn đến với ResearchPulse! 👋": "Chào mừng bạn đến với ResearchPulse! 👋",
    "Khám phá xu hướng, tạp chí và các bài báo khoa học mới nhất.": "Khám phá xu hướng, tạp chí và các bài báo khoa học mới nhất.",
    "Chào buổi sáng, John! 👋": "Chào buổi sáng, John! 👋",
    "Hôm nay có gì mới trong lĩnh vực nghiên cứu của bạn?": "Hôm nay có gì mới trong lĩnh vực nghiên cứu của bạn?",
    
    // Verify Success Page
    "Kích hoạt tài khoản thành công": "Kích hoạt tài khoản thành công",
    "Tài khoản của bạn đã được kích hoạt thành công trên hệ thống ResearchPulse. Bây giờ bạn có thể truy cập đầy đủ các tính năng.": "Tài khoản của bạn đã được kích hoạt thành công trên hệ thống ResearchPulse. Bây giờ bạn có thể truy cập đầy đủ các tính năng.",
    "Trạng thái:": "Trạng thái:",
    "Hoạt động": "Hoạt động",
    "Tự động chuyển hướng sau": "Tự động chuyển hướng sau",
    "giây...": "giây...",
    "Đi đến Dashboard": "Đi đến Dashboard",
    "Về trang chủ": "Về trang chủ",
    "Hỗ trợ kỹ thuật?": "Hỗ trợ kỹ thuật?",
    "Liên hệ chúng tôi": "Liên hệ chúng tôi"
  },
  en: {
    // Navigation / General
    "Tìm kiếm": "Search",
    "Xu hướng": "Trends",
    "Project": "Projects",
    "Địa lý": "Geography",
    "Tác giả": "Authors",
    "Đăng nhập": "Login",
    "Đăng ký miễn phí": "Register Free",
    "Tạo tài khoản miễn phí": "Create Free Account",
    "Thử tìm kiếm ngay": "Try Search Now",
    "Tìm kiếm nhanh...": "Quick Search...",
    "Bắt đầu tìm kiếm": "Start Searching",
    "Xem xu hướng": "View Trends",
    
    // Landing page hero
    "Khám phá xu hướng": "Discover trends in",
    "nghiên cứu khoa học": "scientific research",
    "theo thời gian thực": "in real-time",
    "Tìm kiếm bài báo, phân tích keyword đang nổi, theo dõi lĩnh vực bạn quan tâm — tất cả trong một nơi.": "Search articles, analyze trending keywords, track your field of interest — all in one place.",
    "Dữ liệu từ OpenAlex · 200M+ bài báo": "Data from OpenAlex · 200M+ articles",
    "Bài báo (70+ tỉ)": "Articles (70B+)",
    "10 tháng / 5 năm": "10 months / 5 years",
    "Keywords theo dõi": "Tracked Keywords",
    "Miễn phí": "Free",
    "Không cần thẻ tín dụng": "No Credit Card Required",
    "Không cần đăng ký.": "No registration required.",
    "Thử ngay:": "Try now:",
    "Nhập keyword, tên tác giả, journal...": "Enter keyword, author, journal...",
    "Tìm →": "Search →",
    
    // Landing page features
    "Tại sao dùng ResearchPulse?": "Why ResearchPulse?",
    "Không chỉ là công cụ tìm kiếm — mà là nền tảng giúp bạn bứt phá trong cảnh tranh cạnh của nghiên cứu.": "Not just a search engine — a platform to help you succeed in the competitive research landscape.",
    "Tính năng": "Features",
    "Tìm kiếm thông minh": "Smart Search",
    "Tìm theo keyword, tác giả, journal, năm. Kết quả sắp xếp theo relevance. Đơn giản nhưng mạnh mẽ.": "Search by keyword, author, journal, year. Results sorted by relevance. Simple yet powerful.",
    "Phân tích xu hướng": "Trend Analysis",
    "Xem keyword nào đang tăng trưởng, topic nào đã bão hòa, so sánh nhiều keyword trên cùng biểu đồ.": "See which keywords are growing, which topics are saturated, compare keywords on the same chart.",
    "Theo dõi & thông báo": "Track & Alert",
    "Follow keyword/journal yêu thích. Nhận email khi có bài mới — không bỏ lỡ nghiên cứu quan trọng.": "Follow favorite keywords/journals. Get emails on new publications — never miss important research.",
    "Thư viện cá nhân": "Personal Library",
    "Bookmark bài hay, tổ chức theo project, tag, và danh sách đọc theo cách của riêng bạn.": "Bookmark top articles, organize by project, tags, and reading lists your own way.",
    "Báo cáo & export": "Reports & Export",
    "Tạo báo cáo phân tích xu hướng, xuất CSV hoặc PNG. Dùng cho học thuật hoặc để thuật lại hợp tác.": "Generate trend reports, export CSV or PNG. Use for academia or collaboration reports.",
    "Hoàn toàn miễn phí": "Totally Free",
    "Dữ liệu từ OpenAlex — mã mở, miễn phí. Không giới hạn API call, không paywall.": "Data from OpenAlex — open access, free. No API limits, no paywall.",
    
    // Landing page steps
    "Hướng dẫn": "How it works",
    "Cách sử dụng": "How to use",
    "Bốn bước để có insight về lĩnh vực nghiên cứu của bạn": "Four steps to gain insights into your research area",
    "Nhập keyword": "Enter Keyword",
    "Gõ tên keyword muốn nghiên cứu — ví dụ \"LLM\", \"computer vision\"": "Type keyword you want to study — e.g. \"LLM\", \"computer vision\"",
    "Xem tổng quan": "View Overview",
    "Hệ thống vẽ trend chart, và danh sách bài báo liên tục cập nhật": "The system plots trend charts and continuously updates the article list",
    "Phân tích sâu": "Deep Analysis",
    "So sánh keyword, xem paper detail, khám phá related topics": "Compare keywords, view paper details, discover related topics",
    "Lưu & theo dõi": "Save & Follow",
    "Bookmark bài hay, follow keyword, nhận thông báo bài mới": "Bookmark top articles, follow keywords, receive alerts for new papers",
    
    // Landing page CTA & footer
    "Bắt đầu nghiên cứu thông minh hơn hôm nay": "Start Researching Smarter Today",
    "Miễn phí, không cần thẻ tín dụng, có thể dùng ngay không cần đăng ký": "Free, no credit card required, use instantly without signing up",
    "Về chúng tôi": "About Us",
    "Liên hệ": "Contact",
    "Chính sách": "Privacy Policy",
    
    // App interface
    "Của tôi": "My Workspace",
    "Quản lý": "Management",
    "Hệ thống": "System",
    "Cài đặt": "Settings",
    "Đăng xuất": "Logout",
    "Tổng quan": "Dashboard",
    "Bài báo": "Articles",
    "Tạp chí": "Journals",
    "Dự án": "Projects",
    "Bản đồ địa lý": "Geography Map",
    "Hồ sơ cá nhân": "My Profile",
    "Chào mừng quay trở lại": "Welcome Back",
    "Lọc": "Filter",
    "Tất cả journals": "All Journals",
    "Xem theo keyword →": "View by Keyword →",
    "Bài báo liên quan gần đây": "Recent Related Articles",
    "Xu hướng bài báo theo năm": "Article Trends by Year",
    "Tổng số bài báo mỗi năm": "Total articles per year",
    "So sánh Impact Factor": "Compare Impact Factors",
    "Các journal trong project": "Journals in project",
    "Tên Journal": "Journal Name",
    "Tất cả": "All",
    "Đăng ký": "Register",
    "👤 Hồ sơ": "👤 Profile",
    "👤 Hồ sơ cá nhân": "👤 Profile",
    "⏏ Đăng xuất": "⏏ Logout",
    "📊 Dashboard": "📊 Dashboard",
    "👑 Admin Panel": "👑 Admin Panel",
    "Yêu cầu đăng nhập": "Login Required",
    "Bạn cần đăng nhập tài khoản ResearchPulse để sử dụng chức năng quản lý dự án và theo dõi nghiên cứu.": "You need to log in to your ResearchPulse account to manage projects and track research.",
    "Hủy bỏ": "Cancel",
    "Chào mừng bạn đến với ResearchPulse! 👋": "Welcome to ResearchPulse! 👋",
    "Khám phá xu hướng, tạp chí và các bài báo khoa học mới nhất.": "Discover trends, journals, and the latest scientific publications.",
    "Chào buổi sáng, John! 👋": "Good morning, John! 👋",
    "Hôm nay có gì mới trong lĩnh vực nghiên cứu của bạn?": "What's new in your research field today?",
    
    // Verify Success Page
    "Kích hoạt tài khoản thành công": "Account Activated Successfully",
    "Tài khoản của bạn đã được kích hoạt thành công trên hệ thống ResearchPulse. Bây giờ bạn có thể truy cập đầy đủ các tính năng.": "Your account has been successfully activated on ResearchPulse. You can now access all features.",
    "Trạng thái:": "Status:",
    "Hoạt động": "Active",
    "Tự động chuyển hướng sau": "Automatically redirecting in",
    "giây...": "seconds...",
    "Đi đến Dashboard": "Go to Dashboard",
    "Về trang chủ": "Back to Homepage",
    "Hỗ trợ kỹ thuật?": "Technical support?",
    "Liên hệ chúng tôi": "Contact us"
  }
};

function applyLanguage(lang) {
  localStorage.setItem('lang', lang);
  
  // Translate nodes
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = walk.nextNode()) {
    const text = node.nodeValue.trim();
    if (!text) continue;
    
    // Exact match in translations
    for (const key in LOCALIZATION_DICTIONARY.vi) {
      if (key === text || LOCALIZATION_DICTIONARY.en[key] === text) {
        node.nodeValue = node.nodeValue.replace(text, LOCALIZATION_DICTIONARY[lang][key]);
        break;
      }
    }
  }
  
  // Translate inputs placeholders
  document.querySelectorAll('input[placeholder]').forEach(input => {
    const ph = input.placeholder.trim();
    for (const key in LOCALIZATION_DICTIONARY.vi) {
      if (key === ph || LOCALIZATION_DICTIONARY.en[key] === ph) {
        input.placeholder = LOCALIZATION_DICTIONARY[lang][key];
        break;
      }
    }
  });

  // Update switcher labels
  document.querySelectorAll('.lang-switcher-text').forEach(el => {
    el.textContent = lang === 'vi' ? 'Tiếng Việt' : 'English';
  });

  // Update active states in dropdown
  document.querySelectorAll('.lang-item').forEach(el => {
    if (el.dataset.lang === lang) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

// On Load Language setup
const savedLang = localStorage.getItem('lang') || 'vi';

// ---- Theme Management (Monochrome dark/light) ----
const isLandingPage = (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) && 
                      !window.location.pathname.includes('/dashboard/') && 
                      !window.location.pathname.includes('/catalog/') && 
                      !window.location.pathname.includes('/projects/') && 
                      !window.location.pathname.includes('/profile/') && 
                      !window.location.pathname.includes('/geography/') && 
                      !window.location.pathname.includes('/authors/') && 
                      !window.location.pathname.includes('/articles/') && 
                      !window.location.pathname.includes('/journals/') && 
                      !window.location.pathname.includes('/admin/');

function applyTheme(theme) {
  localStorage.setItem('theme', theme);
  if (!isLandingPage) {
    document.body.classList.remove('monochrome-dark', 'monochrome-light');
    document.body.classList.add(`monochrome-${theme}`);
  }
  // Update toggle button text/icon
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.textContent = theme === 'dark' ? '🌙' : '☀️';
  });
}

// On Load Theme setup
const savedTheme = localStorage.getItem('theme') || 'dark';
if (!isLandingPage) {
  document.body.classList.add(`monochrome-${savedTheme}`);
}

function getPathPrefix() {
  const path = window.location.pathname;
  if (path.includes('/dashboard/') || path.includes('/catalog/') || path.includes('/projects/') || path.includes('/profile/') || path.includes('/journals/') || path.includes('/articles/') || path.includes('/geography/') || path.includes('/authors/') || path.includes('/admin/')) {
    return '../';
  }
  return '';
}

window.handleLogout = function() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  window.location.href = getPathPrefix() + 'index.html';
};

window.showAuthModal = function() {
  let modal = document.getElementById('auth-prompt-modal');
  if (!modal) {
    const prefix = getPathPrefix();
    const modalHTML = `
      <div class="modal-backdrop" id="auth-prompt-modal" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(4px);z-index:9999;display:flex;align-items:center;justify-content:center">
        <div class="modal-content animate-fadeInUp" style="background:var(--color-bg-secondary);border:1px solid var(--border-color);border-radius:var(--border-radius-xl);padding:32px;max-width:400px;width:100%;text-align:center;box-shadow:var(--shadow-lg);position:relative">
          <div style="font-size:48px;margin-bottom:16px">🔒</div>
          <h3 style="font-size:18px;font-weight:700;margin-bottom:12px;color:var(--color-text-primary)">Yêu cầu đăng nhập</h3>
          <p style="font-size:14px;color:var(--color-text-secondary);margin-bottom:24px;line-height:1.5">Bạn cần đăng nhập tài khoản ResearchPulse để sử dụng chức năng quản lý dự án và theo dõi nghiên cứu.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <a href="${prefix}auth/login.html" class="btn btn-primary" style="text-decoration:none;display:flex;align-items:center;justify-content:center">Đăng nhập</a>
            <a href="${prefix}auth/register.html" class="btn btn-outline" style="text-decoration:none;display:flex;align-items:center;justify-content:center">Đăng ký</a>
          </div>
          <button onclick="closeAuthModal()" style="margin-top:16px;background:none;border:none;color:var(--color-text-muted);font-size:13px;cursor:pointer;text-decoration:underline">Hủy bỏ</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  } else {
    modal.style.display = 'flex';
  }
};

window.closeAuthModal = function() {
  const modal = document.getElementById('auth-prompt-modal');
  if (modal) {
    modal.style.display = 'none';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole') || 'user';
  const userName = localStorage.getItem('userName') || 'John Doe';
  const prefix = getPathPrefix();
  
  // ---- ROUTING ENFORCEMENT ----
  const currentPath = window.location.pathname;
  const isProtectedRoute = currentPath.includes('/profile/') || 
                           currentPath.includes('/projects/');
  const isAdminRoute = currentPath.includes('/admin/');
  
  if (isProtectedRoute && !isLoggedIn) {
    localStorage.setItem('redirectUrl', window.location.href);
    window.location.href = prefix + 'auth/login.html';
    return;
  }
  
  if (isAdminRoute) {
    if (!isLoggedIn) {
      localStorage.setItem('redirectUrl', window.location.href);
      window.location.href = prefix + 'auth/login.html';
      return;
    }
    if (userRole !== 'admin') {
      alert('Bạn không có quyền truy cập trang quản trị!');
      window.location.href = prefix + 'dashboard/index.html';
      return;
    }
  }

  // ---- DYNAMIC UI CHANGES ----
  // 1. Sidebar adjustments
  document.querySelectorAll('.sidebar-section').forEach(sec => {
    const label = sec.querySelector('.sidebar-section-label');
    const items = sec.querySelectorAll('.sidebar-item');
    let visibleCount = 0;
    
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!isLoggedIn) {
        // Guest mode - hide projects and profile
        if (text.includes('project') || text.includes('hồ sơ') || text.includes('profile')) {
          item.style.display = 'none';
        } else {
          visibleCount++;
        }
      } else {
        // Logged in
        if (userRole !== 'admin' && text.includes('admin')) {
          item.style.display = 'none';
        } else {
          visibleCount++;
        }
      }
    });
    
    if (visibleCount === 0 && label) {
      sec.style.display = 'none';
    }
  });

  // 2. Sidebar footer dynamic render
  const footer = document.querySelector('.sidebar-footer');
  if (footer) {
    if (!isLoggedIn) {
      footer.innerHTML = `
        <div class="lang-switcher">
          <button class="lang-switcher-btn" style="padding: 5px 10px; border-radius: var(--border-radius-md);">
            <svg class="globe" viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.5;"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span class="lang-switcher-text" style="font-size: 12px;">Tiếng Việt</span>
            <svg class="caret" viewBox="0 0 24 24" style="width: 8px; height: 8px; fill: none; stroke: currentColor; stroke-width: 2;"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="lang-switcher-dropdown" style="right: 0; min-width: 120px;">
            <div class="lang-item active" data-lang="vi" style="font-size: 12px; padding: 6px 10px;">Tiếng Việt</div>
            <div class="lang-item" data-lang="en" style="font-size: 12px; padding: 6px 10px;">English</div>
          </div>
        </div>
        <button class="theme-toggle-btn" title="Toggle Theme" style="background:none;border:none;color:var(--color-text-muted);font-size:16px;cursor:pointer">🌙</button>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="${prefix}auth/login.html" class="btn btn-outline btn-sm" style="font-size:12px;padding:6px 12px;white-space:nowrap;text-decoration:none">Đăng nhập</a>
          <a href="${prefix}auth/register.html" class="btn btn-primary btn-sm" style="font-size:12px;padding:6px 12px;white-space:nowrap;text-decoration:none">Đăng ký</a>
        </div>
      `;
    } else {
      const initials = userName === 'Admin User' ? 'AD' : 'JD';
      const avatarBg = userName === 'Admin User' ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'var(--gradient-primary)';
      footer.innerHTML = `
        <div class="lang-switcher">
          <button class="lang-switcher-btn" style="padding: 5px 10px; border-radius: var(--border-radius-md);">
            <svg class="globe" viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.5;"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span class="lang-switcher-text" style="font-size: 12px;">Tiếng Việt</span>
            <svg class="caret" viewBox="0 0 24 24" style="width: 8px; height: 8px; fill: none; stroke: currentColor; stroke-width: 2;"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="lang-switcher-dropdown" style="right: 0; min-width: 120px;">
            <div class="lang-item active" data-lang="vi" style="font-size: 12px; padding: 6px 10px;">Tiếng Việt</div>
            <div class="lang-item" data-lang="en" style="font-size: 12px; padding: 6px 10px;">English</div>
          </div>
        </div>
        <button class="theme-toggle-btn" title="Toggle Theme" style="background:none;border:none;color:var(--color-text-muted);font-size:16px;cursor:pointer">🌙</button>
        
        <div class="user-profile-menu" style="position:relative">
          <div class="user-profile-trigger" style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:var(--border-radius-md);background:var(--color-bg-hover);cursor:pointer">
            <div class="avatar avatar-sm" style="background:${avatarBg}">${initials}</div>
            <div><div style="font-size:13px;font-weight:600">${userName}</div></div>
            <svg class="caret" viewBox="0 0 24 24" style="width: 8px; height: 8px; fill: none; stroke: currentColor; stroke-width: 2; margin-left: 2px;"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div class="user-profile-dropdown" style="display:none;position:absolute;bottom:100%;right:0;margin-bottom:8px;background:var(--color-bg-secondary);border:1px solid var(--border-color);border-radius:var(--border-radius-md);padding:6px;min-width:140px;box-shadow:var(--shadow-md);z-index:999">
            <a href="${prefix}profile/index.html" class="dropdown-item" style="display:block;padding:8px 12px;font-size:13px;color:var(--color-text-secondary);text-decoration:none;border-radius:var(--border-radius-sm)">👤 Hồ sơ</a>
            <div class="divider" style="margin:4px 0"></div>
            <button onclick="handleLogout()" class="dropdown-item" style="width:100%;text-align:left;background:none;border:none;padding:8px 12px;font-size:13px;color:var(--color-error);cursor:pointer;border-radius:var(--border-radius-sm)">⏏ Đăng xuất</button>
          </div>
        </div>
      `;
    }
  }

  // 3. Public navbar adjustments (Landing Page / Public screens)
  const publicNav = document.querySelector('.public-nav');
  if (publicNav) {
    const navLinks = publicNav.querySelector('.nav-links');
    if (navLinks) {
      navLinks.querySelectorAll('.nav-link').forEach(link => {
        const text = link.textContent.toLowerCase();
        if (!isLoggedIn) {
          if (text.includes('project')) {
            link.style.display = 'none';
          }
        }
      });
    }
    
    const navActions = publicNav.querySelector('.nav-actions');
    if (navActions && isLoggedIn) {
      // Find and remove login/register links (keep language switcher)
      navActions.querySelectorAll('a[href*="auth/"]').forEach(el => el.remove());
      
      const initials = userName === 'Admin User' ? 'AD' : 'JD';
      const avatarBg = userName === 'Admin User' ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'var(--gradient-primary)';
      
      // Inject user trigger
      navActions.insertAdjacentHTML('beforeend', `
        <div class="user-profile-menu" style="position:relative">
          <div class="user-profile-trigger" style="display:flex;align-items:center;gap:10px;cursor:pointer">
            <div class="avatar avatar-sm" style="background:${avatarBg}">${initials}</div>
            <span style="font-size:14px;color:var(--color-text-primary);font-weight:500">${userName}</span>
            <svg class="caret" viewBox="0 0 24 24" style="width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 2;"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div class="user-profile-dropdown" style="display:none;position:absolute;top:100%;right:0;margin-top:8px;background:var(--color-bg-secondary);border:1px solid var(--border-color);border-radius:var(--border-radius-md);padding:6px;min-width:160px;box-shadow:var(--shadow-md);z-index:999">
            <a href="${prefix}dashboard/index.html" class="dropdown-item" style="display:block;padding:8px 12px;font-size:13px;color:var(--color-text-secondary);text-decoration:none;border-radius:var(--border-radius-sm)">📊 Dashboard</a>
            <a href="${prefix}profile/index.html" class="dropdown-item" style="display:block;padding:8px 12px;font-size:13px;color:var(--color-text-secondary);text-decoration:none;border-radius:var(--border-radius-sm)">👤 Hồ sơ cá nhân</a>
            ${userRole === 'admin' ? `<a href="${prefix}admin/dashboard.html" class="dropdown-item" style="display:block;padding:8px 12px;font-size:13px;color:var(--color-text-secondary);text-decoration:none;border-radius:var(--border-radius-sm)">👑 Admin Panel</a>` : ''}
            <div class="divider" style="margin:4px 0"></div>
            <button onclick="handleLogout()" class="dropdown-item" style="width:100%;text-align:left;background:none;border:none;padding:8px 12px;font-size:13px;color:var(--color-error);cursor:pointer;border-radius:var(--border-radius-sm)">⏏ Đăng xuất</button>
          </div>
        </div>
      `);
    }
  }

  // 4. Set up profile trigger listeners
  document.querySelectorAll('.user-profile-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = trigger.closest('.user-profile-menu');
      const dropdown = parent.querySelector('.user-profile-dropdown');
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Close profile dropdown when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.user-profile-dropdown').forEach(el => el.style.display = 'none');
  });

  // 5. Intercept protected actions for Guests
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target) return;
    const text = target.textContent.trim();
    const isFollowBtn = target.classList.contains('btn') && (text.includes('+ Theo dõi') || text.includes('Theo dõi'));
    const isCreateProjectBtn = target.classList.contains('btn') && (text.includes('Project') || text.includes('Dự án') || text.includes('yêu thích') || text.includes('Tạo Project') || text.includes('Tạo project') || text.includes('Tạo Project mới') || target.classList.contains('requires-login'));
    const isRequiresLogin = target.classList.contains('requires-login') || isFollowBtn || isCreateProjectBtn;

    if (isRequiresLogin && localStorage.getItem('isLoggedIn') !== 'true') {
      e.preventDefault();
      e.stopPropagation();
      showAuthModal();
    }
  });

  // Update dashboard page header for guests
  if (!isLoggedIn && (currentPath.includes('/dashboard/') || currentPath.endsWith('dashboard/index.html'))) {
    const welcomeTitle = document.querySelector('.page-title');
    const welcomeDesc = document.querySelector('.page-desc');
    if (welcomeTitle) welcomeTitle.textContent = 'Chào mừng bạn đến với ResearchPulse! 👋';
    if (welcomeDesc) welcomeDesc.textContent = 'Khám phá xu hướng, tạp chí và các bài báo khoa học mới nhất.';
  }

  // ---- INITIAL BINDINGS ----
  applyLanguage(savedLang);
  applyTheme(savedTheme);
  
  // Setup language dropdown interaction
  document.querySelectorAll('.lang-switcher-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.closest('.lang-switcher');
      parent.classList.toggle('open');
      const dropdown = parent.querySelector('.lang-switcher-dropdown');
      if (dropdown) dropdown.classList.toggle('show');
    });
  });

  document.querySelectorAll('.lang-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const lang = item.dataset.lang;
      applyLanguage(lang);
      const parent = item.closest('.lang-switcher');
      if (parent) parent.classList.remove('open');
      const dropdown = item.closest('.lang-switcher-dropdown');
      if (dropdown) dropdown.classList.remove('show');
    });
  });

  // Close language switcher when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-switcher').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('.lang-switcher-dropdown').forEach(el => el.classList.remove('show'));
  });

  // Theme Toggler
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = localStorage.getItem('theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });
});

console.log('%cResearchPulse FE loaded with Theme & Language translation ✨', 'color:#00d4ff;font-weight:bold;font-size:14px');
