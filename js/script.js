document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item")

    if (faqItems.length > 0) {
        faqItems.forEach((item) => {
            const question = item.querySelector(".faq-question")
            const answer = item.querySelector(".faq-answer")

            question.addEventListener("click", () => {
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item && otherItem.classList.contains("active")) {
                        otherItem.classList.remove("active")
                        otherItem.querySelector(".faq-answer").style.maxHeight = "0"
                    }
                })

                item.classList.toggle("active")

                if (item.classList.contains("active")) {
                    answer.style.maxHeight = answer.scrollHeight + "px"
                } else {
                    answer.style.maxHeight = "0"
                }
            })
        })
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            if (targetId === "#") return

            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
                })
            }
        })
    })

    window.addEventListener("mousemove", (e) => {
        const glows = document.querySelectorAll(".glow")
        const x = e.clientX / window.innerWidth
        const y = e.clientY / window.innerHeight

        glows.forEach((glow, index) => {
            const speed = (index + 1) * 20
            const xOffset = (x - 0.5) * speed
            const yOffset = (y - 0.5) * speed

            glow.style.transform = `translate(${xOffset}px, ${yOffset}px)`
        })
    })

    const gameCards = document.querySelectorAll(".game-card")

    const animateOnScroll = () => {
        gameCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top
            const screenPosition = window.innerHeight / 1

            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = "1"
                    card.style.transform = "translateY(0)"
                }, index * 100)
            }
        })
    }

    gameCards.forEach((card) => {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })

    window.addEventListener("scroll", animateOnScroll)
    animateOnScroll()

    const primaryButtons = document.querySelectorAll(".btn-primary")

    primaryButtons.forEach((button) => {
        button.addEventListener("mouseover", () => {
            button.style.animation = "pulse-btn 1.5s infinite"
        })

        button.addEventListener("mouseout", () => {
            button.style.animation = "none"
        })
    })

    window.addEventListener("scroll", () => {
        const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight)
        const glows = document.querySelectorAll(".glow")

        glows.forEach((glow) => {
            const baseOpacity = 0.15
            const newOpacity = baseOpacity + scrollPercentage * 0.1
            glow.style.opacity = Math.min(newOpacity, 0.3).toString()
        })
    })

    const modalTriggers = document.querySelectorAll("[data-modal]")

    if (modalTriggers.length > 0) {
        modalTriggers.forEach((trigger) => {
            trigger.addEventListener("click", function () {
                const modalId = this.getAttribute("data-modal")
                const modal = document.getElementById(modalId)

                if (modal) {
                    modal.classList.add("active")
                }
            })
        })

        const modalCloseButtons = document.querySelectorAll(".modal-close, .modal-cancel")

        modalCloseButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const modal = this.closest(".modal-overlay")
                modal.classList.remove("active")
            })
        })

        const modals = document.querySelectorAll(".modal-overlay")

        modals.forEach((modal) => {
            modal.addEventListener("click", function (e) {
                if (e.target === this) {
                    this.classList.remove("active")
                }
            })
        })
    }

    const deleteButtons = document.querySelectorAll(".delete-mod")

    if (deleteButtons.length > 0) {
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function (e) {
                e.preventDefault()

                const modId = this.getAttribute("data-id")
                const modName = this.getAttribute("data-name")

                const confirmModal = document.getElementById("deleteConfirmModal")
                const modalText = confirmModal.querySelector(".modal-text")
                const confirmButton = confirmModal.querySelector(".modal-confirm")

                modalText.textContent = `Are you sure you want to delete "${modName}"? This action cannot be undone.`
                confirmButton.setAttribute("data-id", modId)

                confirmModal.classList.add("active")
            })
        })
    }

    const editButtons = document.querySelectorAll(".edit-mod")

    if (editButtons.length > 0) {
        editButtons.forEach((button) => {
            button.addEventListener("click", function (e) {
                e.preventDefault()

                const modId = this.getAttribute("data-id")
                const modName = this.getAttribute("data-name")
                const modDescription = this.getAttribute("data-description")
                const modCategory = this.getAttribute("data-category")
                const modDownloads = this.getAttribute("data-downloads")
                const modRating = this.getAttribute("data-rating")
                const modStatus = this.getAttribute("data-status")

                const editModal = document.getElementById("editModModal")
                const nameInput = editModal.querySelector("#modName")
                const descriptionInput = editModal.querySelector("#modDescription")
                const categorySelect = editModal.querySelector("#modCategory")
                const downloadsInput = editModal.querySelector("#modDownloads")
                const ratingInput = editModal.querySelector("#modRating")
                const statusInput = editModal.querySelector("#modStatus")
                const saveButton = editModal.querySelector(".modal-save")

                nameInput.value = modName
                descriptionInput.value = modDescription

                for (let i = 0; i < categorySelect.options.length; i++) {
                    if (categorySelect.options[i].value === modCategory) {
                        categorySelect.selectedIndex = i
                        break
                    }
                }

                downloadsInput.value = modDownloads
                ratingInput.value = modRating
                statusInput.checked = modStatus === "active"

                saveButton.setAttribute("data-id", modId)

                editModal.classList.add("active")
            })
        })
    }
})