document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.createElement("div");
    navContainer.id = "nav-container";
    document.body.insertAdjacentElement("afterbegin", navContainer);

    // Function to load the correct navigation
    function loadNav() {
        const file = window.innerWidth < 768 ? 'navbar.html' : 'sidebar.html';

        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                navContainer.innerHTML = data;
            })
            .catch(error => {
                console.error(`Error loading ${file}:`, error);
            });
    }

    // Function to adjust the margin-left, padding-left, and margin-top of .content
    function adjustContentStyles() {
        const contentElement = document.querySelector('.content');
        if (window.innerWidth < 768) {
            contentElement.style.marginLeft = '0';
            contentElement.style.paddingLeft = '0';
            contentElement.style.marginTop = '50px'; // Add top margin for smaller screens
        } else {
            contentElement.style.marginLeft = '140px';
            contentElement.style.paddingLeft = '10px'; // Reset padding for larger screens
            contentElement.style.marginTop = '0'; // Reset top margin for larger screens
        }
    }

    // Initial load
    loadNav();
    adjustContentStyles();

    // Listen for window resize events
    window.addEventListener("resize", () => {
        loadNav();
        adjustContentStyles();
    });
});
// JavaScript 实现
let currentLang = localStorage.getItem('preferredLang') || 
                 (navigator.language.startsWith('zh') ? 'zh' : 'en');

// 初始化语言按钮样式
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.classList.toggle('active', btn.dataset.lang === currentLang);
});

// 语言切换逻辑
async function switchLanguage(lang) {
  if (lang === currentLang) return;

  // 加载语言包
  const translations = await loadLanguage(lang);
  
  // 更新内容
  document.querySelectorAll('[data-translate]').forEach(el => {
    el.textContent = translations[el.dataset.translate] || el.dataset.translate;
  });

  // 更新字体
  document.body.setAttribute('data-lang', lang);
  
  // 更新按钮状态
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // 保存设置
  localStorage.setItem('preferredLang', lang);
  currentLang = lang;
}

// 点击事件绑定
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
});

// 语言包加载函数
async function loadLanguage(lang) {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    return await response.json();
  } catch (error) {
    console.error('语言包加载失败:', error);
    return {};
  }
}

// 初始化加载
(async () => {
  const translations = await loadLanguage(currentLang);
  document.querySelectorAll('[data-translate]').forEach(el => {
    el.textContent = translations[el.dataset.translate] || el.dataset.translate;
  });
  document.body.setAttribute('data-lang', currentLang);
})();