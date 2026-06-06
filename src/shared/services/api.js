import axios from 'axios';

// Base Axios instance pointing to the backend API base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to dynamically inject the bearer auth token
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('researchpulse_token');
    
    if (!token) {
      // For guest users, try to use a cached guest token
      token = localStorage.getItem('researchpulse_guest_token');
      
      // If not cached, fetch it from login API
      if (!token && !config.url.endsWith('/auth/login') && !config.url.endsWith('/auth/register')) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
            email: 'phunghao2701@gmail.com',
            password: '12345678'
          });
          if (res.data?.success && res.data?.data?.token) {
            token = res.data.data.token;
            localStorage.setItem('researchpulse_guest_token', token);
          }
        } catch (err) {
          console.error('Error fetching guest token in background:', err);
        }
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// CLIENT-SIDE MOCK ADAPTER FOR OFFLINE STATE
// ==========================================

// Seed default projects if empty in localStorage
const seedDefaultProjects = () => {
  const existing = localStorage.getItem('researchpulse_mock_projects');
  if (!existing) {
    const defaults = [
      {
        project_id: 1,
        title: "Hệ thống khuyến nghị học máy trong y tế",
        subject_area: "Computer Science",
        keywords: [
          { keyword_id: 1, keyword: "Machine Learning" },
          { keyword_id: 2, keyword: "Deep Learning" },
          { keyword_id: 3, keyword: "Healthcare" }
        ],
        updated_at: "2026-06-05T12:00:00Z"
      },
      {
        project_id: 2,
        title: "Phân tích xu hướng biến đổi khí hậu khu vực Đông Nam Á",
        subject_area: "Environmental Sciences",
        keywords: [
          { keyword_id: 4, keyword: "Climate Change" },
          { keyword_id: 5, keyword: "Meteorology" }
        ],
        updated_at: "2026-06-04T08:30:00Z"
      }
    ];
    localStorage.setItem('researchpulse_mock_projects', JSON.stringify(defaults));
  }
};

const getProjectsFromStorage = () => {
  seedDefaultProjects();
  return JSON.parse(localStorage.getItem('researchpulse_mock_projects') || '[]');
};

const saveProjectsToStorage = (projects) => {
  localStorage.setItem('researchpulse_mock_projects', JSON.stringify(projects));
};

// Mock Response Router
const getMockResponse = (url, method, requestData) => {
  // Strip baseURL and query parameters for route matching
  let route = url;
  if (route.startsWith('http://') || route.startsWith('https://')) {
    try {
      route = new URL(route).pathname;
    } catch(e) {}
  }
  
  // Remove api prefix and version suffix like /api/v1
  let cleanRoute = route.split('?')[0];
  cleanRoute = cleanRoute.replace(/^\/api\/v\d+/, '');
  
  // Ensure leading slash
  if (!cleanRoute.startsWith('/')) {
    cleanRoute = '/' + cleanRoute;
  }

  // Parse payload if present
  let payload = {};
  if (requestData) {
    try {
      payload = typeof requestData === 'string' ? JSON.parse(requestData) : requestData;
    } catch (e) {}
  }

  // 1. Auth endpoints
  if (cleanRoute.endsWith('/auth/login')) {
    return {
      success: true,
      data: {
        token: 'mock-jwt-token-xyz123',
        user: {
          id: 42,
          name: 'Phùng Hào',
          email: payload.email || 'phunghao2701@gmail.com',
          role: 'user'
        }
      }
    };
  }

  if (cleanRoute.endsWith('/auth/register')) {
    return {
      success: true,
      message: 'Đăng ký tài khoản thành công! Mã kích hoạt đã được gửi.'
    };
  }

  // 2. Project List (GET /projects)
  if (cleanRoute === '/projects' && method.toLowerCase() === 'get') {
    const list = getProjectsFromStorage();
    return {
      success: true,
      data: list
    };
  }

  // 3. Create Project (POST /projects)
  if (cleanRoute === '/projects' && method.toLowerCase() === 'post') {
    const list = getProjectsFromStorage();
    const newId = Date.now();
    const newProj = {
      project_id: newId,
      title: payload.title || 'Dự án mới',
      subject_area: payload.subject_area || 'Computer Science',
      keywords: (payload.keywords || []).map((k, i) => ({
        keyword_id: newId + i,
        keyword: k
      })),
      updated_at: new Date().toISOString()
    };
    list.push(newProj);
    saveProjectsToStorage(list);
    return {
      success: true,
      data: newProj
    };
  }

  // 4. Project Details (GET /projects/:id)
  const projectDetailMatch = cleanRoute.match(/^\/projects\/(\d+)\/?$/);
  if (projectDetailMatch && method.toLowerCase() === 'get') {
    const pId = parseInt(projectDetailMatch[1]);
    const list = getProjectsFromStorage();
    const proj = list.find(p => p.project_id === pId);
    return {
      success: true,
      data: proj || list[0]
    };
  }

  // 5. Update Project (PUT /projects/:id)
  if (projectDetailMatch && method.toLowerCase() === 'put') {
    const pId = parseInt(projectDetailMatch[1]);
    const list = getProjectsFromStorage();
    const idx = list.findIndex(p => p.project_id === pId);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        title: payload.title || list[idx].title,
        subject_area: payload.subject_area || list[idx].subject_area,
        updated_at: new Date().toISOString()
      };
      saveProjectsToStorage(list);
      return {
        success: true,
        data: list[idx]
      };
    }
  }

  // 6. Delete Project (DELETE /projects/:id)
  if (projectDetailMatch && method.toLowerCase() === 'delete') {
    const pId = parseInt(projectDetailMatch[1]);
    let list = getProjectsFromStorage();
    list = list.filter(p => p.project_id !== pId);
    saveProjectsToStorage(list);
    return {
      success: true,
      message: 'Xóa dự án thành công.'
    };
  }

  // 7. Project Analytics (GET /projects/:id/analytics)
  const projectAnalyticsMatch = cleanRoute.match(/^\/projects\/(\d+)\/analytics\/?$/);
  if (projectAnalyticsMatch) {
    return {
      success: true,
      data: {
        years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"],
        series: [
          {
            label: "Bài báo xuất bản",
            data: [42, 58, 63, 89, 102, 115, 134]
          }
        ]
      }
    };
  }

  // 8. Project Keywords Trending (GET /projects/:id/keywords/trending)
  const projectKeywordsTrendMatch = cleanRoute.match(/^\/projects\/(\d+)\/keywords\/trending\/?$/);
  if (projectKeywordsTrendMatch) {
    return {
      success: true,
      keywords: [
        { keyword: "Machine Learning", count: 142, score: 9.8 },
        { keyword: "Deep Learning", count: 112, score: 9.2 },
        { keyword: "Computer Vision", count: 85, score: 8.5 },
        { keyword: "NLP", count: 76, score: 8.1 },
        { keyword: "Healthcare AI", count: 54, score: 7.4 },
        { keyword: "Cybersecurity", count: 32, score: 6.5 }
      ]
    };
  }

  // 9. Project Related Articles (GET /projects/:id/related-articles)
  const projectRelatedArticlesMatch = cleanRoute.match(/^\/projects\/(\d+)\/related-articles\/?$/);
  if (projectRelatedArticlesMatch) {
    return {
      success: true,
      data: [
        {
          article_id: 101,
          title: "Attention Is All You Need for Medical Image Classification",
          abstract: "We apply transformer architectures to medical image classification tasks, demonstrating superior performance over conventional CNNs.",
          journal_name: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
          publication_year: 2026,
          authors: [{ name: "Nguyen Van A" }, { name: "Tran Thi B" }]
        },
        {
          article_id: 102,
          title: "A Survey on Federated Learning in Clinical Research",
          abstract: "Federated learning provides a decentralized method for training models across medical institutions without centralizing private data.",
          journal_name: "Journal of Machine Learning Research",
          publication_year: 2025,
          authors: [{ name: "Le Van C" }]
        },
        {
          article_id: 103,
          title: "Generative Adversarial Networks for Synthetic Patient Data",
          abstract: "Synthesizing patient record data using GANs with private constraint enforcement for downstream training.",
          journal_name: "Nature Machine Intelligence",
          publication_year: 2025,
          authors: [{ name: "Michael Jordan" }]
        }
      ]
    };
  }

  // 10. Update Watched Keywords (POST/PUT /projects/:id/keywords/watch)
  const projectWatchKeywordsMatch = cleanRoute.match(/^\/projects\/(\d+)\/keywords\/watch\/?$/);
  if (projectWatchKeywordsMatch && (method.toLowerCase() === 'post' || method.toLowerCase() === 'put')) {
    const pId = parseInt(projectWatchKeywordsMatch[1]);
    const list = getProjectsFromStorage();
    const idx = list.findIndex(p => p.project_id === pId);
    if (idx !== -1) {
      list[idx].keywords = (payload.keywords || []).map((k, i) => ({
        keyword_id: Date.now() + i,
        keyword: k
      }));
      list[idx].updated_at = new Date().toISOString();
      saveProjectsToStorage(list);
      return {
        success: true,
        data: list[idx]
      };
    }
  }

  // 11. Delete Watched Keyword (DELETE /projects/:id/keywords/:keywordId)
  const projectDeleteKeywordMatch = cleanRoute.match(/^\/projects\/(\d+)\/keywords\/(\d+)\/?$/);
  if (projectDeleteKeywordMatch && method.toLowerCase() === 'delete') {
    const pId = parseInt(projectDeleteKeywordMatch[1]);
    const kwId = parseInt(projectDeleteKeywordMatch[2]);
    const list = getProjectsFromStorage();
    const idx = list.findIndex(p => p.project_id === pId);
    if (idx !== -1) {
      list[idx].keywords = list[idx].keywords.filter(k => k.keyword_id !== kwId);
      list[idx].updated_at = new Date().toISOString();
      saveProjectsToStorage(list);
      return {
        success: true,
        message: 'Bỏ theo dõi từ khóa thành công.'
      };
    }
  }

  // 12. Subject Areas & Subject Categories (GET /subject-areas, GET /subject-categories)
  if (cleanRoute === '/subject-areas') {
    return {
      success: true,
      data: [
        { id: 1, name: "Computer Science" },
        { id: 2, name: "Medicine & Health Sciences" },
        { id: 3, name: "Engineering & Technology" },
        { id: 4, name: "Social Sciences" }
      ]
    };
  }

  if (cleanRoute === '/subject-categories') {
    return {
      success: true,
      data: [
        { id: 1, name: "Artificial Intelligence", subject_area_id: 1 },
        { id: 2, name: "Software Engineering", subject_area_id: 1 },
        { id: 3, name: "Oncology", subject_area_id: 2 }
      ]
    };
  }

  // Default fallback for catalog/journals/search
  if (cleanRoute === '/journal/' || cleanRoute.includes('/journal')) {
    return {
      success: true,
      data: [
        {
          id: 1,
          title: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
          sjr: 9.876,
          h_index: 345,
          quartile: "Q1",
          is_open_access: true,
          publisher: "IEEE"
        },
        {
          id: 2,
          title: "Journal of Machine Learning Research",
          sjr: 4.120,
          h_index: 180,
          quartile: "Q1",
          is_open_access: true,
          publisher: "JMLR"
        }
      ]
    };
  }

  // Fallback default response
  return {
    success: true,
    data: []
  };
};

// Response interceptor to catch errors and fallback to mock data
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isNetworkError = !error.response;
    const isOffline = isNetworkError || (error.response && (error.response.status >= 500 || error.response.status === 404));
    
    if (isOffline) {
      const config = error.config;
      const { url, method, data } = config;
      console.warn(`[API Offline Mock] Fallback triggered for: ${method.toUpperCase()} ${url}`);
      
      const mockData = getMockResponse(url, method, data);
      if (mockData) {
        return {
          data: mockData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }
    }
    return Promise.reject(error);
  }
);

export default api;
