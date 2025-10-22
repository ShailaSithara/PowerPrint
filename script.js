
    // Ultra smooth parallax with enhanced easing
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      mouseX = (rect.width / 2 - (e.clientX - rect.left)) / 45;
      mouseY = (rect.height / 2 - (e.clientY - rect.top)) / 45;
    });

    function animate() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      
      heroContent.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      heroImage.style.transform = `translate3d(${-currentX * 0.7}px, ${-currentY * 0.7}px, 0) rotateY(${-currentX * 0.4}deg) rotateX(${currentY * 0.4}deg)`;
      
      requestAnimationFrame(animate);
    }
    animate();

    // Enhanced image slideshow with smooth transitions
    const heroImages = [
      'images/press.jpg',
      'images/prepress.jpg',
      'images/postpress.jpg'
    ];
    let index = 0;
    const heroImg = document.getElementById('hero-img');

    setInterval(() => {
      index = (index + 1) % heroImages.length;
      heroImg.classList.add('fade-out');
      setTimeout(() => {
        heroImg.src = heroImages[index];
        heroImg.classList.remove('fade-out');
        heroImg.classList.add('fade-in');
      }, 800);
      setTimeout(() => heroImg.classList.remove('fade-in'), 1600);
    }, 6000);

    // Enhanced button ripple effect with glow
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2.5;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 30%, transparent 70%);
          border-radius: 50%;
          transform: scale(0);
          pointer-events: none;
          z-index: 10;
        `;
        
        this.appendChild(ripple);
        
        ripple.animate([
          { transform: 'scale(0)', opacity: 1 },
          { transform: 'scale(1)', opacity: 0 }
        ], {
          duration: 800,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        });
        
        setTimeout(() => ripple.remove(), 800);
      });

      // Magnetic button effect
      btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.2;
        const moveY = y * 0.2;
        
        this.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-6px) scale(1.08)`;
      });

      btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });

    // Cursor glow effect
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(175,203,31,0.15) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.3s;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(cursorGlow);

    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', e => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorGlow.style.opacity = '1';
    });

    function animateGlow() {
      glowX += (cursorX - glowX) * 0.1;
      glowY += (cursorY - glowY) * 0.1;
      
      cursorGlow.style.left = (glowX - 150) + 'px';
      cursorGlow.style.top = (glowY - 150) + 'px';
      
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });

    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    // Image hover 3D effect
    heroImage.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const rotateX = (y - 0.5) * 15;
      const rotateY = (x - 0.5) * -15;
      
      this.querySelector('img').style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(1.08)
      `;
    });

    heroImage.addEventListener('mouseleave', function() {
      this.querySelector('img').style.transform = '';
    });

    // Particle interaction on mouse move
    const particles = document.querySelectorAll('.particles span');
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      particles.forEach((particle, index) => {
        const particleRect = particle.getBoundingClientRect();
        const particleX = particleRect.left + particleRect.width / 2 - rect.left;
        const particleY = particleRect.top + particleRect.height / 2 - rect.top;
        
        const distance = Math.sqrt(
          Math.pow(x - particleX, 2) + Math.pow(y - particleY, 2)
        );
        
        if (distance < 150) {
          const angle = Math.atan2(y - particleY, x - particleX);
          const force = (150 - distance) / 150;
          const moveX = Math.cos(angle) * force * -30;
          const moveY = Math.sin(angle) * force * -30;
          
          particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
          particle.style.transition = 'transform 0.3s ease-out';
        } else {
          particle.style.transform = '';
        }
      });
    });

    // Keyboard accessibility for buttons
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });

    // Performance optimization - pause animations when tab not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
      } else {
        document.body.style.animationPlayState = 'running';
      }
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
 const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdown = document.querySelector('.dropdown');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Toggle services dropdown on mobile
dropdown.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) { // Only for mobile
    e.preventDefault(); // prevent default anchor
    dropdown.querySelector('.dropdown-menu').classList.toggle('show');
  }
});
