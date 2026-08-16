document.addEventListener('DOMContentLoaded', () => {
  // 1. Light / Dark Mode Toggle with Local Storage Persistence
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply saved theme on page load
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  // 2. Real-Time Module & Subject Search Filter
  const searchInput = document.getElementById('course-search');
  const courseItems = document.querySelectorAll('.course-item');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      courseItems.forEach((card) => {
        const titleData = (card.getAttribute('data-title') || '').toLowerCase();
        const textContent = card.textContent.toLowerCase();

        if (titleData.includes(query) || textContent.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 3. Dynamic Google Drive Modal Preview Explorer
  const modal = document.getElementById('drive-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const driveFrame = document.getElementById('drive-frame');
  const modalDirectLink = document.getElementById('modal-direct-link');
  const modalLoader = document.getElementById('modal-loader');
  const openButtons = document.querySelectorAll('.open-modal-btn');

  function openDriveModal(title, embedUrl, directUrl) {
    if (!modal) return;
    if (modalTitle) modalTitle.textContent = title || 'Drive Explorer';
    if (modalDirectLink) modalDirectLink.href = directUrl || '#';
    if (modalLoader) modalLoader.style.display = 'flex';
    
    if (driveFrame) {
      driveFrame.src = embedUrl || '';
      driveFrame.onload = () => {
        if (modalLoader) modalLoader.style.display = 'none';
      };
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeDriveModal() {
    if (!modal) return;
    modal.classList.remove('active');
    if (driveFrame) driveFrame.src = '';
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title');
      const embedUrl = btn.getAttribute('data-drive-embed');
      const directUrl = btn.getAttribute('data-drive-direct');
      openDriveModal(title, embedUrl, directUrl);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDriveModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeDriveModal);

  // Close modal when pressing the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeDriveModal();
    }
  });

  // 4. Mobile Bottom Navigation Active Tab Tracker
  const navItems = document.querySelectorAll('.app-nav-item');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navItems.forEach((item) => {
          const href = item.getAttribute('href');
          if (href && href.startsWith('#')) {
            if (href === `#${currentSectionId}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          }
        });
      }
    });
  }

  // 5. Personal Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const senderName = nameInput ? nameInput.value.trim() : 'Friend';
      
      alert(`Thank you, ${senderName}! Your message has been sent to my personal desk.`);
      contactForm.reset();
    });
  }
});