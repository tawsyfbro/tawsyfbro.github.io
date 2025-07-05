// Faculty Carousel Functionality
class FacultyCarousel {
  constructor() {
    this.carousel = document.getElementById("facultyCarousel")
    this.slides = this.carousel.querySelectorAll(".carousel-slide")
    this.indicators = document.querySelectorAll(".indicator")
    this.prevBtn = document.getElementById("facultyPrev")
    this.nextBtn = document.getElementById("facultyNext")
    this.currentSlide = 0
    this.totalSlides = this.slides.length
    this.autoPlayInterval = null

    this.init()
  }

  init() {
    this.setupIndicators()
    this.setupArrows()
    this.startAutoPlay()
    this.setupEventListeners()
  }

  setupIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index)
      })
    })
  }

  setupArrows() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.goToSlide((this.currentSlide - 1 + this.totalSlides) % this.totalSlides)
      })
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.goToSlide((this.currentSlide + 1) % this.totalSlides)
      })
    }
  }

  setupEventListeners() {
    // Pause auto-play on hover
    this.carousel.addEventListener("mouseenter", () => {
      this.stopAutoPlay()
    })

    this.carousel.addEventListener("mouseleave", () => {
      this.startAutoPlay()
    })

    // Handle visibility change
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopAutoPlay()
      } else {
        this.startAutoPlay()
      }
    })
  }

  goToSlide(slideIndex) {
    this.slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === slideIndex)
    })
    this.indicators.forEach((indicator, idx) => {
      indicator.classList.toggle("active", idx === slideIndex)
    })
    this.currentSlide = slideIndex
    const translateX = -this.currentSlide * 100
    this.carousel.style.transform = `translateX(${translateX}%)`
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides
    this.goToSlide(nextIndex)
  }

  startAutoPlay() {
    this.stopAutoPlay() // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }
}

// Tab Functionality
class TabManager {
  constructor() {
    this.tabTriggers = document.querySelectorAll(".tab-trigger")
    this.tabContents = document.querySelectorAll(".tab-content")

    this.init()
  }

  init() {
    this.tabTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        const targetTab = e.target.getAttribute("data-tab")
        this.switchTab(targetTab)
      })
    })
  }

  switchTab(targetTab) {
    // Remove active class from all triggers and contents
    this.tabTriggers.forEach((trigger) => trigger.classList.remove("active"))
    this.tabContents.forEach((content) => content.classList.remove("active"))

    // Add active class to clicked trigger
    const activeTrigger = document.querySelector(`[data-tab="${targetTab}"]`)
    if (activeTrigger) {
      activeTrigger.classList.add("active")
    }

    // Show corresponding content
    const activeContent = document.getElementById(targetTab)
    if (activeContent) {
      activeContent.classList.add("active")
    }
  }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    // Handle sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link[href^="#"]')
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", this.handleClick.bind(this))
    })

    // Handle footer links
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]')
    footerLinks.forEach((link) => {
      link.addEventListener("click", this.handleClick.bind(this))
    })
  }

  handleClick(e) {
    e.preventDefault()
    const targetId = e.target.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const headerOffset = 100 // Account for fixed headers
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }
}

// Mobile Menu Toggle
class MobileMenu {
  constructor() {
    this.menuBtn = document.querySelector(".mobile-menu-btn")
    this.navMenu = document.querySelector(".nav-menu")
    this.isOpen = false

    this.init()
  }

  init() {
    if (this.menuBtn) {
      this.menuBtn.addEventListener("click", this.toggleMenu.bind(this))
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isOpen && !e.target.closest(".main-nav")) {
        this.closeMenu()
      }
    })

    // Close menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu()
      }
    })
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }

  openMenu() {
    this.navMenu.style.display = "flex"
    this.navMenu.style.flexDirection = "column"
    this.navMenu.style.position = "absolute"
    this.navMenu.style.top = "100%"
    this.navMenu.style.left = "0"
    this.navMenu.style.right = "0"
    this.navMenu.style.backgroundColor = "#0a192f"
    this.navMenu.style.padding = "1rem"
    this.navMenu.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
    this.navMenu.style.zIndex = "1000"

    this.isOpen = true
    this.menuBtn.innerHTML = '<i class="fas fa-times"></i>'
  }

  closeMenu() {
    this.navMenu.style.display = ""
    this.navMenu.style.flexDirection = ""
    this.navMenu.style.position = ""
    this.navMenu.style.top = ""
    this.navMenu.style.left = ""
    this.navMenu.style.right = ""
    this.navMenu.style.backgroundColor = ""
    this.navMenu.style.padding = ""
    this.navMenu.style.boxShadow = ""
    this.navMenu.style.zIndex = ""

    this.isOpen = false
    this.menuBtn.innerHTML = '<i class="fas fa-bars"></i>'
  }
}

// Search Functionality
class SearchHandler {
  constructor() {
    this.searchInput = document.querySelector(".search-input")
    this.searchButton = document.querySelector(".search-button")

    this.init()
  }

  init() {
    if (this.searchButton) {
      this.searchButton.addEventListener("click", this.handleSearch.bind(this))
    }

    if (this.searchInput) {
      this.searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.handleSearch()
        }
      })
    }
  }

  handleSearch() {
    const query = this.searchInput.value.trim()
    if (query) {
      // In a real application, this would perform actual search
      alert(`Searching for: ${query}`)
      console.log("Search query:", query)
    }
  }
}

// Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.observer = null
    this.init()
  }

  init() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      })

      // Observe all sections
      const sections = document.querySelectorAll(".section")
      sections.forEach((section) => {
        this.observer.observe(section)
      })

      // Observe feature cards
      const featureCards = document.querySelectorAll(".feature-card")
      featureCards.forEach((card) => {
        this.observer.observe(card)
      })
    }
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }
}

// Form Handlers
class FormHandlers {
  constructor() {
    this.init()
  }

  init() {
    // Handle CTA buttons
    const ctaButtons = document.querySelectorAll(".cta-buttons .btn")
    ctaButtons.forEach((button) => {
      button.addEventListener("click", this.handleCTAClick.bind(this))
    })

    // Handle publication actions
    const publicationButtons = document.querySelectorAll(".publication-actions .btn")
    publicationButtons.forEach((button) => {
      button.addEventListener("click", this.handlePublicationClick.bind(this))
    })
  }

  handleCTAClick(e) {
    e.preventDefault()
    const buttonText = e.target.textContent.trim()

    if (buttonText.includes("Application Form")) {
      // In a real application, this would open the application form
      alert("Opening Application Form...")
      console.log("Application form requested")
    } else if (buttonText.includes("Contact")) {
      // In a real application, this would open contact information
      alert("Contact Information:\nPhone: +880 1712-345678\nEmail: eee@metrouni.edu.bd")
      console.log("Contact information requested")
    }
  }

  handlePublicationClick(e) {
    e.preventDefault()
    const buttonText = e.target.textContent.trim()

    if (buttonText.includes("View Paper")) {
      // In a real application, this would open the paper
      alert("Opening research paper...")
      console.log("Research paper view requested")
    } else if (buttonText.includes("Cite")) {
      // In a real application, this would show citation format
      alert("Citation format copied to clipboard!")
      console.log("Citation requested")
    }
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init()
  }

  init() {
    // Lazy load images
    this.setupLazyLoading()

    // Debounce scroll events
    this.setupScrollOptimization()
  }

  setupLazyLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute("data-src")
              imageObserver.unobserve(img)
            }
          }
        })
      })

      // Observe all images with data-src attribute
      const lazyImages = document.querySelectorAll("img[data-src]")
      lazyImages.forEach((img) => imageObserver.observe(img))
    }
  }

  setupScrollOptimization() {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Handle scroll-based animations here
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
  }
}

// News Carousel Functionality
class NewsCarousel {
  constructor() {
    this.carousel = document.getElementById("newsCarousel")
    this.slides = this.carousel.querySelectorAll(".news-slide")
    this.indicators = document.querySelectorAll(".news-indicator")
    this.currentSlide = 0
    this.totalSlides = this.slides.length
    this.autoPlayInterval = null
    this.init()
  }

  init() {
    this.setupIndicators()
    this.startAutoPlay()
    this.setupEventListeners()
  }

  setupIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index)
      })
    })
  }

  setupEventListeners() {
    // Pause auto-play on hover
    this.carousel.addEventListener("mouseenter", () => {
      this.stopAutoPlay()
    })
    this.carousel.addEventListener("mouseleave", () => {
      this.startAutoPlay()
    })
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopAutoPlay()
      } else {
        this.startAutoPlay()
      }
    })
  }

  goToSlide(slideIndex) {
    this.slides[this.currentSlide].classList.remove("active")
    this.indicators[this.currentSlide].classList.remove("active")
    this.currentSlide = slideIndex
    this.slides[this.currentSlide].classList.add("active")
    this.indicators[this.currentSlide].classList.add("active")
    const translateX = -this.currentSlide * 100
    this.carousel.style.transform = `translateX(${translateX}%)`
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides
    this.goToSlide(nextIndex)
  }

  startAutoPlay() {
    this.stopAutoPlay()
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 4000)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }
}

// Leadership Carousel Functionality
class LeadershipCarousel {
  constructor() {
    this.carousel = document.getElementById("leadershipCarousel")
    this.slides = this.carousel.querySelectorAll(".leadership-slide")
    this.indicators = document.querySelectorAll(".leadership-indicator")
    this.currentSlide = 0
    this.totalSlides = this.slides.length
    this.autoPlayInterval = null
    this.init()
  }

  init() {
    this.setupIndicators()
    this.startAutoPlay()
    this.setupEventListeners()
  }

  setupIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index)
      })
    })
  }

  setupEventListeners() {
    this.carousel.addEventListener("mouseenter", () => {
      this.stopAutoPlay()
    })
    this.carousel.addEventListener("mouseleave", () => {
      this.startAutoPlay()
    })
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopAutoPlay()
      } else {
        this.startAutoPlay()
      }
    })
  }

  goToSlide(slideIndex) {
    this.slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === slideIndex)
    })
    this.indicators.forEach((indicator, idx) => {
      indicator.classList.toggle("active", idx === slideIndex)
    })
    this.currentSlide = slideIndex
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides
    this.goToSlide(nextIndex)
  }

  startAutoPlay() {
    this.stopAutoPlay()
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }
}

// Course Category Dropdown Functionality
class CourseCategoryManager {
  constructor() {
    this.categories = document.querySelectorAll('.course-category');
    this.activeCategory = null;

    this.init();
  }

  init() {
    this.categories.forEach(category => {
      const header = category.querySelector('.course-header');
      const dropdown = category.querySelector('.course-dropdown');

      header.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryId = category.getAttribute('data-category');
        this.toggleCategory(categoryId);
      });
    });
  }

  toggleCategory(categoryId) {
    const targetCategory = document.querySelector(`[data-category="${categoryId}"]`);
    const targetDropdown = targetCategory.querySelector('.course-dropdown');

    // If clicking on the same category, close it
    if (this.activeCategory === categoryId) {
      this.closeCategory(targetCategory, targetDropdown);
      this.activeCategory = null;
      return;
    }

    // Close any open category first
    if (this.activeCategory) {
      const activeCategory = document.querySelector(`[data-category="${this.activeCategory}"]`);
      const activeDropdown = activeCategory.querySelector('.course-dropdown');
      this.closeCategory(activeCategory, activeDropdown);
    }

    // Open the clicked category
    this.openCategory(targetCategory, targetDropdown);
    this.activeCategory = categoryId;
  }

  openCategory(category, dropdown) {
    category.classList.add('active');
    dropdown.classList.add('active');

    // Add smooth scroll to the opened category
    setTimeout(() => {
      category.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 100);
  }

  closeCategory(category, dropdown) {
    category.classList.remove('active');
    dropdown.classList.remove('active');
  }
}

// Instantiate the dropdown manager after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CourseCategoryManager();
});

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  new FacultyCarousel()
  new TabManager()
  new SmoothScroll()
  new MobileMenu()
  new SearchHandler()
  new AnimationObserver()
  new FormHandlers()
  new PerformanceOptimizer()
  new NewsCarousel()
  new LeadershipCarousel()
  
  // Initialize Course Category Manager
  if (document.querySelector('.course-category')) {
    new CourseCategoryManager()
  }

  // Add loading complete class
  document.body.classList.add("loaded")

  console.log("University EEE Website initialized successfully!")

  // Enhance Quick Links sidebar to smoothly scroll to sections
  enableQuickLinksSidebar()
})

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause any animations or auto-play features
    console.log("Page hidden - pausing animations")
  } else {
    // Resume animations
    console.log("Page visible - resuming animations")
  }
})

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

// Utility functions
const utils = {
  // Debounce function
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },
}

// Export utils for use in other scripts
window.utils = utils

// Enhance Quick Links sidebar to smoothly scroll to sections
function enableQuickLinksSidebar() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link[href^="#"]')
  sidebarLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerOffset = 100 // Adjust if you have a fixed header
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    })
  })
}

const dots = document.querySelectorAll(".dot");
const track = document.querySelector(".carousel-track");
let currentSlide = 0;

function goToSlide(slideIndex) {
  track.style.transform = `translateX(-${slideIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");
  currentSlide = slideIndex;
}

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.getAttribute("data-slide"));
    goToSlide(index);
  });
});

// Auto-slide (optional)
setInterval(() => {
  let nextSlide = (currentSlide + 1) % dots.length;
  goToSlide(nextSlide);
}, 6000);

// Faculty Carousel New Functionality
class FacultyCarouselNew {
  constructor() {
    this.carousel = document.querySelector('.faculty-carousel-new');
    if (!this.carousel) return;
    this.track = this.carousel.querySelector('.faculty-carousel-track');
    this.slides = Array.from(this.carousel.querySelectorAll('.faculty-carousel-slide'));
    this.indicators = Array.from(this.carousel.querySelectorAll('.faculty-carousel-indicator'));
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.init();
  }

  init() {
    this.updateSlidePosition();
    this.indicators.forEach((indicator, idx) => {
      indicator.addEventListener('click', () => this.goToSlide(idx));
    });
    this.startAutoPlay();
    this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    this.carousel.addEventListener('focusin', () => this.stopAutoPlay());
    this.carousel.addEventListener('focusout', () => this.startAutoPlay());
    window.addEventListener('resize', () => this.updateSlidePosition());
  }

  goToSlide(idx) {
    if (idx < 0) idx = this.totalSlides - 1;
    if (idx >= this.totalSlides) idx = 0;
    this.currentSlide = idx;
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    const offset = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${offset}%)`;
    this.indicators.forEach((indicator, idx) => {
      indicator.classList.toggle('active', idx === this.currentSlide);
    });
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.goToSlide(this.currentSlide + 1);
    }, 4000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new FacultyCarouselNew();
});

// Publications Dropdown Toggle
function setupPublicationsDropdown() {
  const btn = document.getElementById('togglePublicationsBtn');
  const dropdown = document.getElementById('publicationsDropdown');
  
  if (!btn || !dropdown) {
    console.warn('Publications dropdown elements not found');
    return;
  }
  
  btn.addEventListener('click', function() {
    const isOpen = dropdown.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    
    const span = btn.querySelector('span');
    if (span) {
      span.textContent = isOpen ? 'Hide' : 'Show';
    }
    
    // Ensure proper visibility
    if (isOpen) {
      dropdown.style.display = 'block';
    } else {
      dropdown.style.display = 'none';
    }
  });
}

// Initialize publications dropdown when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  setupPublicationsDropdown();
});
