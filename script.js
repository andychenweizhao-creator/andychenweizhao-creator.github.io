document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Navbar transparency effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        }
    });

    // Expanding Card Modal Logic
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.querySelector('.modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    if (modalOverlay) {
        const clickableItems = document.querySelectorAll('.feature-card, .tech-item');
        let activeItem = null;

        const detailsMap = {
            'Gemini AI Integration': 'SkyAware utilizes the Google Gemini API to parse complex METAR and TAF reports, converting cryptic aviation weather data into clear, actionable safety briefings for pilots.',
            'Weather & Terrain Analysis': 'By overlaying real-time precipitation radar with high-resolution digital elevation models, the app identifies potential CFIT (Controlled Flight Into Terrain) risks along your flight path.',
            'Simulation Validated': 'Our logic is tested using simulated data from VATSIM, ensuring that navigation alerts and safety notifications trigger correctly during high-pressure flight phases.',
            'Flutter': 'The core application is built using Flutter for a high-performance, cross-platform experience that ensures a smooth UI even when processing heavy data streams.',
            'Dart': 'Dart provides the underlying reactive programming model that allows SkyAware to update situational awareness data in real-time without UI lag.',
            'JavaScript': 'Used to power the interactive elements of this website and handle complex client-side logic for data visualization.',
            'Gemini API': 'The "brain" of SkyAware, providing advanced natural language processing to interpret complex aviation regulations and weather updates.',
            'Firebase': 'Handles secure user authentication and cloud synchronization, allowing pilots to save their preferences and flight safety logs across multiple devices.'
        };

        const imageMap = {
            'Gemini AI Integration': 'image1.png',
            'Weather & Terrain Analysis': 'image.png',
            'Simulation Validated': 'image2.png',
            'Flutter': 'image8.png',
            'Dart': 'image7.png',
            'JavaScript': 'image6.png',
            'Gemini API': 'image4.png',
            'Firebase': 'image 5.png'
        };

        const openModal = (item) => {
            activeItem = item;
            const rect = item.getBoundingClientRect();
            const title = item.querySelector('h3')?.innerText || item.querySelector('.tech-name')?.innerText;
            const modalImage = document.getElementById('modal-image');
            const modalDetails = document.querySelector('.modal-details');

            if (modalImage) {
                if (imageMap[title]) {
                    modalImage.src = imageMap[title];
                    modalImage.style.display = 'block';
                    // Hide the placeholder span if image exists
                    const span = modalImage.nextElementSibling;
                    if (span && span.tagName === 'SPAN') span.style.display = 'none';
                } else {
                    modalImage.style.display = 'none';
                    // Show placeholder text
                    const span = modalImage.nextElementSibling;
                    if (span && span.tagName === 'SPAN') span.style.display = 'block';
                }
            }

            // Adjust text position based on which feature card is clicked
            if (title === 'Simulation Validated') {
                modalDetails.classList.add('center-left');
            } else {
                modalDetails.classList.remove('center-left');
            }

            // Set initial state matching the card
            modalContent.style.top = `${rect.top}px`;
            modalContent.style.left = `${rect.left}px`;
            modalContent.style.width = `${rect.width}px`;
            modalContent.style.height = `${rect.height}px`;
            modalContent.style.borderRadius = window.getComputedStyle(item).borderRadius;

            modalTitle.innerText = title;
            modalBody.innerText = detailsMap[title] || 'Expanded details for ' + title + ' will be available in the full documentation.';

            modalOverlay.classList.add('active');
            item.style.opacity = '0'; // Hide original card

            // Force reflow
            modalContent.offsetHeight;

            // Animate to expanded state
            const expandedWidth = Math.min(1200, window.innerWidth * 0.95);
            const expandedHeight = Math.min(900, window.innerHeight * 0.9);

            modalContent.style.top = `${(window.innerHeight - expandedHeight) / 2}px`;
            modalContent.style.left = `${(window.innerWidth - expandedWidth) / 2}px`;
            modalContent.style.width = `${expandedWidth}px`;
            modalContent.style.height = `${expandedHeight}px`;
            modalContent.style.borderRadius = '32px';
        };

        const closeModal = () => {
            if (!activeItem) return;
            const rect = activeItem.getBoundingClientRect();

            // Animate back to card position
            modalContent.style.top = `${rect.top}px`;
            modalContent.style.left = `${rect.left}px`;
            modalContent.style.width = `${rect.width}px`;
            modalContent.style.height = `${rect.height}px`;
            modalContent.style.borderRadius = window.getComputedStyle(activeItem).borderRadius;

            modalOverlay.classList.remove('active');

            setTimeout(() => {
                activeItem.style.opacity = '1';
                activeItem = null;
            }, 600); // Match CSS transition time
        };

        clickableItems.forEach(item => {
            item.addEventListener('click', () => openModal(item));
        });

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        // Close on escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // Apple-style Carousel Dot Logic
    const carouselWrappers = document.querySelectorAll('.apple-carousel-wrapper');

    carouselWrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const dots = wrapper.querySelectorAll('.nav-dot');
        const leftArrow = wrapper.querySelector('.left-arrow');
        const rightArrow = wrapper.querySelector('.right-arrow');

        if (track) {
            const getSlideWidth = () => {
                const slide = track.querySelector('.carousel-slide');
                return slide ? slide.offsetWidth + 20 : 0; // 20 is gap
            };

            // Sync dots with scroll
            if (dots.length > 0) {
                track.addEventListener('scroll', () => {
                    const slideWidth = getSlideWidth();
                    if (slideWidth > 0) {
                        const activeIndex = Math.round(track.scrollLeft / slideWidth);
                        dots.forEach((dot, index) => {
                            dot.classList.toggle('active', index === activeIndex);
                        });
                    }
                });

                // Make dots clickable
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        const slideWidth = getSlideWidth();
                        track.scrollTo({
                            left: index * slideWidth,
                            behavior: 'smooth'
                        });
                    });
                });
            }

            // Make arrows clickable
            if (leftArrow) {
                leftArrow.addEventListener('click', () => {
                    const slideWidth = getSlideWidth();
                    track.scrollBy({
                        left: -slideWidth,
                        behavior: 'smooth'
                    });
                });
            }

            if (rightArrow) {
                rightArrow.addEventListener('click', () => {
                    const slideWidth = getSlideWidth();
                    track.scrollBy({
                        left: slideWidth,
                        behavior: 'smooth'
                    });
                });
            }
        }
    });

    // Hotspot Click Logic
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent carousel scroll/click interference

            // Close other hotspots
            hotspots.forEach(h => {
                if (h !== hotspot) h.classList.remove('active');
            });

            // Toggle current hotspot
            hotspot.classList.toggle('active');
        });
    });

    // Close hotspots when clicking elsewhere
    document.addEventListener('click', () => {
        hotspots.forEach(h => h.classList.remove('active'));
    });

    // Hero Mockup Tab Switcher Logic
    const heroMockupNav = document.getElementById('hero-mockup-nav');
    const heroMockupTrack = document.getElementById('hero-mockup-track');
    const heroPrevBtn = document.getElementById('hero-prev-btn');
    const heroNextBtn = document.getElementById('hero-next-btn');

    if (heroMockupNav && heroMockupTrack) {
        const dots = heroMockupNav.querySelectorAll('.nav-dot');
        const containers = heroMockupTrack.querySelectorAll('.mockup-container');
        let currentIndex = 0;

        const switchToIndex = (index) => {
            // Validate index
            if (index < 0 || index >= dots.length) return;
            currentIndex = index;

            // Update active dot
            dots.forEach(d => d.classList.remove('active'));
            dots[currentIndex].classList.add('active');

            // Move track
            heroMockupTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Auto pause/play videos on tab switch
            containers.forEach((container, i) => {
                const vid = container.querySelector('video');
                if (vid) {
                    if (i === currentIndex) {
                        vid.play();
                    } else {
                        vid.pause();
                    }
                }
            });
        };

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                switchToIndex(index);
            });
        });

        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', () => {
                switchToIndex((currentIndex - 1 + dots.length) % dots.length);
            });
        }

        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', () => {
                switchToIndex((currentIndex + 1) % dots.length);
            });
        }
    }

    // Unified Video Controls & Synchronization Logic
    const videoContainers = document.querySelectorAll('.video-container');
    const speeds = [1, 1.5, 2, 0.5];
    let globalSpeedIndex = 0;
    let globalMuted = true; // Videos start muted

    // Function to apply global speed and volume to all videos
    const syncGlobalVideoState = () => {
        videoContainers.forEach(container => {
            const vid = container.querySelector('video');
            if (vid) {
                vid.playbackRate = speeds[globalSpeedIndex];
                vid.muted = globalMuted;
            }
        });
    };

    videoContainers.forEach(container => {
        const video = container.querySelector('video');
        const playPauseBtn = container.querySelector('.play-pause-btn');
        const playIcon = container.querySelector('.play-icon');
        const pauseIcon = container.querySelector('.pause-icon');
        const progressBar = container.querySelector('.progress-bar');
        const progressContainer = container.querySelector('.progress-bar-container');
        const speedBtn = container.querySelector('.speed-btn');
        const volumeBtn = container.querySelector('.volume-btn');
        const volumeOnIcon = container.querySelector('.volume-on-icon');
        const volumeOffIcon = container.querySelector('.volume-off-icon');
        const fullscreenBtn = container.querySelector('.fullscreen-btn');

        if (!video) return;

        // --- Play/Pause Synchronization ---
        // Listen directly to the video's events so it never goes out of sync
        // with the button UI, even when auto-playing/pausing via the tab switcher
        video.addEventListener('play', () => {
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        });

        video.addEventListener('pause', () => {
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        });

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                if (video.paused) video.play();
                else video.pause();
            });
        }

        // --- Volume Synchronization ---
        video.addEventListener('volumechange', () => {
            if (video.muted) {
                if (volumeOnIcon) volumeOnIcon.style.display = 'none';
                if (volumeOffIcon) volumeOffIcon.style.display = 'block';
            } else {
                if (volumeOnIcon) volumeOnIcon.style.display = 'block';
                if (volumeOffIcon) volumeOffIcon.style.display = 'none';
            }
        });

        if (volumeBtn) {
            volumeBtn.addEventListener('click', () => {
                // Update the global state and push to all videos
                globalMuted = !globalMuted;
                syncGlobalVideoState();
            });
        }

        // --- Speed Synchronization ---
        video.addEventListener('ratechange', () => {
            if (speedBtn) speedBtn.innerText = `${video.playbackRate}x`;
        });

        if (speedBtn) {
            speedBtn.addEventListener('click', () => {
                // Update the global state and push to all videos
                globalSpeedIndex = (globalSpeedIndex + 1) % speeds.length;
                syncGlobalVideoState();
            });
        }

        // --- Progress Bar Logic ---
        if (progressBar && progressContainer) {
            video.addEventListener('timeupdate', () => {
                const percent = (video.currentTime / video.duration) * 100;
                progressBar.style.width = `${percent || 0}%`;
            });

            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
            });
        }

        // --- Fullscreen Logic ---
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                if (video.requestFullscreen) video.requestFullscreen();
                else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
                else if (video.msRequestFullscreen) video.msRequestFullscreen();
            });
        }
    });

    // Auto-hide arrows on idle
    const autoHideWrappers = document.querySelectorAll('.mockup-carousel-wrapper, .apple-carousel-wrapper');

    autoHideWrappers.forEach(wrapper => {
        let idleTimeout;

        const resetIdleTimer = () => {
            wrapper.classList.remove('idle');
            clearTimeout(idleTimeout);
            idleTimeout = setTimeout(() => {
                wrapper.classList.add('idle');
            }, 2500); // Hide after 2.5 seconds of inactivity
        };

        // Initialize state
        resetIdleTimer();

        // Listen for user interactions to reset the timer
        wrapper.addEventListener('mousemove', resetIdleTimer);
        wrapper.addEventListener('touchstart', resetIdleTimer, { passive: true });
        wrapper.addEventListener('click', resetIdleTimer);
        wrapper.addEventListener('keydown', resetIdleTimer);

        // Immediately hide when mouse leaves the carousel area
        wrapper.addEventListener('mouseleave', () => {
            clearTimeout(idleTimeout);
            wrapper.classList.add('idle');
        });

        wrapper.addEventListener('mouseenter', resetIdleTimer);
    });
});

