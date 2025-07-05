// Faculty Page Specific JavaScript

class FacultyPage {
  constructor() {
    this.facultyData = {
      dean: {
        name: "Professor Dr. Md. Nazrul Haque Chowdhury",
        position: "Professor & Dean",
        category: "professor",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      head: {
        name: "Nawshad Ahmed Chowdhury",
        position: "Assistant Professor Head, Dept. of EEE",
        category: "assistant",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      assistant1: {
        name: "Md. Rahmot Ullah",
        position: "Assistant Professor",
        category: "assistant",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      senior1: {
        name: "Md Anwarul Kawchar",
        position: "Senior Lecturer",
        category: "senior-lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer1: {
        name: "Arpita Mazumder",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer2: {
        name: "Md Hasanur Rahman Sohag",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer3: {
        name: "Sadman Sakib",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer4: {
        name: "Mahim Ahmed",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer5: {
        name: "Md. Fardin Ahasan Maraz",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer6: {
        name: "Md. Shadman Shakib",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer7: {
        name: "Ahmed Afif Rafsan",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer8: {
        name: "Ahmed Istiakur Rahman",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer9: {
        name: "Md Tawsifur Rahman",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer10: {
        name: "Fahim Ashraf",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer11: {
        name: "Md. Imam Mahdi",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer12: {
        name: "Abdullah Al Numan",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
      lecturer13: {
        name: "Anika Tabassum",
        position: "Lecturer",
        category: "lecturer",
        specialization: "",
        education: "",
        research: "",
        publications: "",
        contact: "",
      },
    }

    this.filterButtons = document.querySelectorAll(".filter-btn")
    this.facultyCards = document.querySelectorAll(".faculty-member-card")
    this.facultyGrid = document.getElementById("facultyGrid")
    this.modal = document.getElementById("facultyModal")
    this.modalClose = document.getElementById("modalClose")
    this.modalBody = document.getElementById("modalBody")

    this.init()
  }

  init() {
    this.setupFilters()
    this.setupCardClicks()
    this.setupModal()
    this.setupKeyboardNavigation()
  }

  setupFilters() {
    this.filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const filter = e.target.getAttribute("data-filter")
        this.filterFaculty(filter)
        this.updateActiveFilter(e.target)
      })
    })
  }

  setupCardClicks() {
    this.facultyCards.forEach((card) => {
      card.addEventListener("click", () => {
        const facultyId = card.getAttribute("data-faculty")
        this.showFacultyDetails(facultyId)
      })

      // Make cards keyboard accessible
      card.setAttribute("tabindex", "0")
      card.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          const facultyId = card.getAttribute("data-faculty")
          this.showFacultyDetails(facultyId)
        }
      })
    })
  }

  setupModal() {
    this.modalClose.addEventListener("click", () => {
      this.closeModal()
    })

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal()
      }
    })

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeModal()
      }
    })
  }

  setupKeyboardNavigation() {
    // Arrow key navigation for filter buttons
    this.filterButtons.forEach((button, index) => {
      button.addEventListener("keydown", (e) => {
        let targetIndex

        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault()
            targetIndex = index > 0 ? index - 1 : this.filterButtons.length - 1
            this.filterButtons[targetIndex].focus()
            break
          case "ArrowRight":
            e.preventDefault()
            targetIndex = index < this.filterButtons.length - 1 ? index + 1 : 0
            this.filterButtons[targetIndex].focus()
            break
        }
      })
    })
  }

  filterFaculty(filter) {
    // Add loading state
    this.facultyGrid.classList.add("loading")

    setTimeout(() => {
      let visibleCount = 0

      this.facultyCards.forEach((card) => {
        const category = card.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          card.classList.remove("hidden")
          card.classList.add("visible")
          visibleCount++
        } else {
          card.classList.add("hidden")
          card.classList.remove("visible")
        }
      })

      // Handle empty state
      if (visibleCount === 0) {
        this.facultyGrid.classList.add("empty")
      } else {
        this.facultyGrid.classList.remove("empty")
      }

      // Remove loading state
      this.facultyGrid.classList.remove("loading")
    }, 300)
  }

  updateActiveFilter(activeButton) {
    this.filterButtons.forEach((button) => {
      button.classList.remove("active")
    })
    activeButton.classList.add("active")
  }

  showFacultyDetails(facultyId) {
    const faculty = this.facultyData[facultyId]

    if (!faculty) {
      console.error("Faculty not found:", facultyId)
      return
    }

    const modalContent = this.createModalContent(faculty)
    this.modalBody.innerHTML = modalContent

    this.modal.classList.add("active")
    document.body.style.overflow = "hidden"

    // Focus management
    this.modalClose.focus()
  }

  createModalContent(faculty) {
    return `
            <div class="modal-faculty-header">
                <div class="modal-faculty-avatar">
                    <img src="https://via.placeholder.com/96x96/0a192f/ffffff?text=${encodeURIComponent(
                      faculty.name
                        .split(" ")
                        .map((n) => n[0])
                        .join(""),
                    )}" alt="${faculty.name}">
                </div>
                <div class="modal-faculty-info">
                    <h2>${faculty.name}</h2>
                    <p>${faculty.position}</p>
                </div>
            </div>
            
            <div class="modal-faculty-details">
                <div class="modal-detail-section">
                    <h3 class="modal-detail-title">Specialization</h3>
                    <p class="modal-detail-content">${faculty.specialization}</p>
                </div>
                
                <div class="modal-detail-section">
                    <h3 class="modal-detail-title">Education</h3>
                    <p class="modal-detail-content">${faculty.education}</p>
                </div>
                
                <div class="modal-detail-section">
                    <h3 class="modal-detail-title">Research Interests</h3>
                    <p class="modal-detail-content">${faculty.research}</p>
                </div>
                
                <div class="modal-detail-section">
                    <h3 class="modal-detail-title">Publications</h3>
                    <p class="modal-detail-content">${faculty.publications}</p>
                </div>
                
                <div class="modal-detail-section">
                    <h3 class="modal-detail-title">Contact</h3>
                    <p class="modal-detail-content">${faculty.contact}</p>
                </div>
            </div>
        `
  }

  closeModal() {
    this.modal.classList.remove("active")
    document.body.style.overflow = ""

    // Return focus to the card that opened the modal
    const activeCard = document.querySelector(".faculty-member-card:focus")
    if (activeCard) {
      activeCard.focus()
    }
  }
}

// Search functionality for faculty page
class FacultySearch {
  constructor() {
    this.searchInput = document.querySelector(".search-input")
    this.facultyCards = document.querySelectorAll(".faculty-member-card")
    this.originalFilter = "all"

    this.init()
  }

  init() {
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchFaculty(e.target.value)
      })

      this.searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          this.searchFaculty(e.target.value)
        }
      })
    }
  }

  searchFaculty(query) {
    const searchTerm = query.toLowerCase().trim()

    if (searchTerm === "") {
      // Reset to show all cards
      this.facultyCards.forEach((card) => {
        card.style.display = ""
      })
      return
    }

    this.facultyCards.forEach((card) => {
      const name = card.querySelector(".faculty-name").textContent.toLowerCase()
      const position = card.querySelector(".faculty-position").textContent.toLowerCase()
      const specialization = card.querySelector(".info-value").textContent.toLowerCase()

      const matches = name.includes(searchTerm) || position.includes(searchTerm) || specialization.includes(searchTerm)

      if (matches) {
        card.style.display = ""
        this.highlightSearchTerm(card, searchTerm)
      } else {
        card.style.display = "none"
      }
    })
  }

  highlightSearchTerm(card, term) {
    // Remove previous highlights
    const highlighted = card.querySelectorAll(".search-highlight")
    highlighted.forEach((el) => {
      el.outerHTML = el.innerHTML
    })

    if (term === "") return

    // Highlight new term
    const textElements = card.querySelectorAll(".faculty-name, .faculty-position, .info-value")
    textElements.forEach((el) => {
      const regex = new RegExp(`(${term})`, "gi")
      el.innerHTML = el.textContent.replace(regex, '<span class="search-highlight">$1</span>')
    })
  }
}

// Animation controller for faculty page
class FacultyAnimations {
  constructor() {
    this.init()
  }

  init() {
    this.setupScrollAnimations()
    this.setupHoverEffects()
  }

  setupScrollAnimations() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1"
              entry.target.style.transform = "translateY(0)"
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        },
      )

      // Observe faculty cards
      const cards = document.querySelectorAll(".faculty-member-card")
      cards.forEach((card, index) => {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
        observer.observe(card)
      })
    }
  }

  setupHoverEffects() {
    const cards = document.querySelectorAll(".faculty-member-card")

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        // Add subtle animation to other cards
        cards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.style.opacity = "0.7"
          }
        })
      })

      card.addEventListener("mouseleave", () => {
        // Reset all cards
        cards.forEach((otherCard) => {
          otherCard.style.opacity = "1"
        })
      })
    })
  }
}

// Initialize faculty page functionality
document.addEventListener("DOMContentLoaded", () => {
  new FacultyPage()
  new FacultySearch()
  new FacultyAnimations()

  console.log("Faculty page initialized successfully!")
})

// Add search highlight styles
const style = document.createElement("style")
style.textContent = `
    .search-highlight {
        background-color: #fef3c7;
        color: #92400e;
        padding: 0.125rem 0.25rem;
        border-radius: 0.25rem;
        font-weight: 600;
    }
`
document.head.appendChild(style)

// Debounce function
function debounce(func, wait) {
  let timeout
  return function (...args) {
    
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

const utils = {
  debounce: debounce,
}
