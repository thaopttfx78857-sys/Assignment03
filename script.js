/* =========================================================
   1. SMOOTH SCROLL FOR INTERNAL LINKS
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1) { // tránh trường hợp href="#"
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});


/* =========================================================
   2. ANIMATE PROGRESS BARS ON SCROLL (RUNS ONCE)
========================================================= */

// Hàm kích hoạt thanh progress
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-bar');
  const triggerAt = window.innerHeight * 0.85;

  bars.forEach(bar => {
    const rect = bar.getBoundingClientRect();

    if (rect.top < triggerAt) {
      const targetWidth =
        bar.getAttribute('data-width') ||
        bar.style.width ||
        bar.style.getPropertyValue('--w') ||
        '50%';

      bar.style.width = targetWidth;
    }
  });
}

// Khi load → set width = 0 để chuẩn bị animation
window.addEventListener('load', () => {
  document.querySelectorAll('.progress-bar').forEach(pb => {
    const inline = pb.getAttribute('style');

    if (inline && inline.includes("width")) {
      const matches = inline.match(/width\s*:\s*([\d.]+%)/);
      if (matches) {
        pb.setAttribute("data-width", matches[1]);
        pb.style.width = "0%";
      }
    } else {
      pb.setAttribute("data-width", pb.style.width || "50%");
      pb.style.width = "0%";
    }
  });

  setTimeout(animateProgressBars, 300);
});

window.addEventListener('scroll', animateProgressBars);


/* =========================================================
   3. SOCIAL ICON CLICK FEEDBACK
========================================================= */
document.querySelectorAll('.social-link, .social-icons a, .social-icons i')
  .forEach(el => {
    el.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }
      console.log("Social icon clicked");
    });
  });


/* =========================================================
   4. CLICK PROJECT ITEM (HIGHLIGHT EFFECT)
========================================================= */
document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#') e.preventDefault();

    this.classList.add('border-primary');
    setTimeout(() => this.classList.remove('border-primary'), 600);

    console.log("Project clicked:",
      this.querySelector('.project-title')?.textContent?.trim()
    );
  });
});
