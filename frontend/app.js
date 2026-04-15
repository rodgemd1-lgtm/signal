// ═══════════════════════════════════════════════════════════════════════
// SIGNAL V20 — Animation Engine & Application Controller
// Version: 20.0 | April 2026 | Rodgers Intelligence Group
// Pure Vanilla JS — No GSAP, No External Animation Libraries
// ═══════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ─── Utility ─────────────────────────────────────────────────────────────
  const el = (sel, ctx) => (ctx || document).querySelector(sel);
  const elAll = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  // ─── Configuration ────────────────────────────────────────────────────────
  const CONFIG = {
    API_BASE: (window.location.origin === 'file://' || window.location.port === '')
      ? 'http://localhost:8081/v1'
      : window.location.origin + '/v1',
    USER_ID_KEY: 'signal_user_id',
    USER_DATA_KEY: 'signal_user_data',
    CURSOR_LERP: 0.1,
    CURSOR_TRAIL_COUNT: 5,
    SCROLL_VELOCITY_SMOOTHING: 0.9,
    REVEAL_STAGGER_BASE: 80,
    PARALLAX_LOW_THRESHOLD: 0.1,
    PARALLAX_MID_THRESHOLD: 0.3,
    PARALLAX_HIGH_THRESHOLD: 0.6,
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 1. LOADING SCREEN
  // ═══════════════════════════════════════════════════════════════════════
  const LoadingScreen = {
    el: null,

    init() {
      this.el = el('.loading-screen');
      if (!this.el) return;

      // Fade out and scale on DOMContentLoaded
      this.el.classList.add('loaded');

      // Remove after transition completes
      setTimeout(() => {
        if (this.el && this.el.parentNode) {
          this.el.parentNode.removeChild(this.el);
        }
        this.el = null;

        // Dispatch custom event for other modules waiting on load
        document.dispatchEvent(new CustomEvent('signal:loaded'));
      }, 600);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 2. CUSTOM CURSOR
  // ═══════════════════════════════════════════════════════════════════════
  const Cursor = {
    dot: null,
    ring: null,
    trail: [],
    ringX: 0,
    ringY: 0,
    dotX: -100,
    dotY: -100,
    targetX: -100,
    targetY: -100,
    rafId: null,
    isVisible: false,
    isInteractive: false,
    clickScale: 1,

    lerp(start, end, factor) {
      return start + (end - start) * factor;
    },

    init() {
      this.dot = el('.cursor-dot');
      this.ring = el('.cursor-ring');

      if (!this.dot || !this.ring) return;

      // Create trail dots
      this.trail = [];
      for (let i = 0; i < CONFIG.CURSOR_TRAIL_COUNT; i++) {
        const trailDot = document.createElement('div');
        trailDot.className = 'cursor-trail';
        trailDot.style.cssText = `
          position: fixed;
          width: 6px;
          height: 6px;
          background: rgba(59,130,246,${0.4 - i * 0.07});
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          opacity: 0;
          transform: translate(-50%, -50%);
        `;
        document.body.appendChild(trailDot);
        this.trail.push({
          el: trailDot,
          x: -100,
          y: -100,
          targets: [],
        });
      }

      // Mousemove listener
      document.addEventListener('mousemove', (e) => {
        this.targetX = e.clientX;
        this.targetY = e.clientY;
        this.isVisible = true;
        this.dot.style.opacity = '1';
        this.ring.style.opacity = '1';
        this.trail.forEach(t => {
          t.el.style.opacity = '1';
        });
      }, { passive: true });

      // Mouse leave viewport
      document.addEventListener('mouseleave', () => {
        this.isVisible = false;
        this.dot.style.opacity = '0';
        this.ring.style.opacity = '0';
        this.trail.forEach(t => {
          t.el.style.opacity = '0';
        });
      });

      // Interactive element detection
      document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, [data-cursor="interactive"], input, textarea, select')) {
          this.isInteractive = true;
          this.ring.classList.add('cursor-interactive');
        }
      });

      document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, [data-cursor="interactive"], input, textarea, select')) {
          this.isInteractive = false;
          this.ring.classList.remove('cursor-interactive');
        }
      });

      // Click pulse
      document.addEventListener('mousedown', () => {
        this.clickScale = 0.85;
        this.ring.classList.add('cursor-click');
      });

      document.addEventListener('mouseup', () => {
        this.clickScale = 1;
        this.ring.classList.remove('cursor-click');
      });

      // Start RAF loop
      this.startLoop();
    },

    startLoop() {
      const tick = () => {
        this.update();
        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);
    },

    update() {
      // Immediate dot update
      this.dotX = this.lerp(this.dotX, this.targetX, 1);
      this.dotY = this.lerp(this.dotY, this.targetY, 1);
      this.dot.style.transform = `translate(${this.dotX}px, ${this.dotY}px) translate(-50%, -50%)`;

      // Ring follows with lerp
      if (!this.isInteractive) {
        this.ringX = this.lerp(this.ringX, this.targetX, CONFIG.CURSOR_LERP);
        this.ringY = this.lerp(this.ringY, this.targetY, CONFIG.CURSOR_LERP);
      } else {
        this.ringX = this.lerp(this.ringX, this.targetX, CONFIG.CURSOR_LERP * 1.5);
        this.ringY = this.lerp(this.ringY, this.targetY, CONFIG.CURSOR_LERP * 1.5);
      }

      const scale = this.isInteractive ? 1.4 : (this.clickScale < 1 ? 0.9 : 1);
      this.ring.style.transform = `translate(${this.ringX}px, ${this.ringY}px) translate(-50%, -50%) scale(${scale})`;

      // Trail follows with increasing lag
      let prevX = this.dotX;
      let prevY = this.dotY;
      this.trail.forEach((trail, i) => {
        const lagFactor = 0.15 - i * 0.025;
        trail.x = this.lerp(trail.x, prevX, Math.max(lagFactor, 0.02));
        trail.y = this.lerp(trail.y, prevY, Math.max(lagFactor, 0.02));
        trail.el.style.transform = `translate(${trail.x}px, ${trail.y}px) translate(-50%, -50%)`;
        prevX = trail.x;
        prevY = trail.y;
      });
    },

    destroy() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.trail.forEach(t => t.el.remove());
      this.trail = [];
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 3. SCROLL ENGINE
  // ═══════════════════════════════════════════════════════════════════════
  const Scroll = {
    y: 0,
    velocity: 0,
    direction: 0,
    lastY: 0,
    rafId: null,
    ticking: false,

    init() {
      this.lastY = window.scrollY;
      this.y = this.lastY;

      window.addEventListener('scroll', () => {
        this.ticking = true;
      }, { passive: true });

      this.startLoop();
    },

    startLoop() {
      const tick = () => {
        if (this.ticking) {
          const currentY = window.scrollY;
          const delta = currentY - this.y;
          this.velocity = delta * 0.1; // Smooth velocity estimate
          this.direction = delta > 0 ? 1 : delta < 0 ? -1 : this.direction;
          this.y = currentY;
          this.ticking = false;

          // Update parallax layers
          Parallax.update();
        }
        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);
    },

    getParallaxDepth(factor) {
      return this.y * factor * this.direction;
    },

    getVelocity() {
      return this.velocity;
    },

    getDirection() {
      return this.direction;
    },

    getScrollY() {
      return this.y;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 4. INTERSECTION OBSERVER ENGINE
  // ═══════════════════════════════════════════════════════════════════════
  const Observer = {
    instances: [],
    sharedObserver: null,
    reducedMotion: false,

    init() {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (this.reducedMotion) {
        elAll('.reveal-word, .reveal-line, .reveal-char, .animate-in').forEach(el => {
          el.classList.add('visible');
        });
        return;
      }

      this.sharedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delayAttr = parseInt(el.dataset.delay || '0', 10);
            const type = el.dataset.revealType;

            if (type === 'word') {
              this.revealWords(el, delayAttr);
            } else if (type === 'char') {
              this.revealChars(el, delayAttr);
            } else if (type === 'line') {
              this.revealLines(el, delayAttr);
            } else {
              this.reveal(el, delayAttr);
            }

            this.sharedObserver.unobserve(el);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      // Observe standard elements
      elAll('.animate-in, .reveal-word, .reveal-line, .reveal-char').forEach(el => {
        this.sharedObserver.observe(el);
      });
    },

    reveal(el, delay) {
      if (this.reducedMotion) {
        el.classList.add('visible');
        return;
      }
      delay = delay || 0;
      setTimeout(() => {
        el.classList.add('visible');
        el.dispatchEvent(new CustomEvent('signal:revealed'));
      }, delay);
    },

    revealWords(selector, baseDelay) {
      if (!selector) return;
      const words = elAll('.word', selector);
      baseDelay = baseDelay || 0;
      words.forEach((word, i) => {
        word.style.setProperty('--i', i);
        const delay = baseDelay + i * CONFIG.REVEAL_STAGGER_BASE;
        setTimeout(() => {
          word.classList.add('visible');
        }, delay);
      });
    },

    revealChars(selector, baseDelay) {
      if (!selector) return;
      const chars = elAll('.char', selector);
      baseDelay = baseDelay || 0;
      chars.forEach((char, i) => {
        char.style.setProperty('--i', i);
        const delay = baseDelay + i * 40;
        setTimeout(() => {
          char.classList.add('visible');
        }, delay);
      });
    },

    revealLines(selector, baseDelay) {
      if (!selector) return;
      const lines = elAll('.line', selector);
      baseDelay = baseDelay || 0;
      lines.forEach((line, i) => {
        line.style.setProperty('--i', i);
        const delay = baseDelay + i * 120;
        setTimeout(() => {
          line.classList.add('visible');
        }, delay);
      });
    },

    observe(el, callback) {
      if (!this.sharedObserver) return;
      this.sharedObserver.observe(el);
      el.addEventListener('signal:revealed', callback);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 5. PARALLAX LAYER CONTROLLER
  // ═══════════════════════════════════════════════════════════════════════
  const Parallax = {
    layers: [],

    add(el, depthFactor) {
      if (!el) return;
      this.layers.push({
        el,
        factor: depthFactor,
        initialTransform: el.style.transform || '',
      });
    },

    update() {
      const scrollY = Scroll.y;
      const direction = Scroll.direction;

      this.layers.forEach(layer => {
        const offset = scrollY * layer.factor * direction;
        layer.el.style.transform = `${layer.initialTransform} translateY(${offset}px)`;
      });
    },

    removeAll() {
      this.layers = [];
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 6. COUNT-UP NUMBER ANIMATOR
  // ═══════════════════════════════════════════════════════════════════════
  const CountUp = {
    animate(el, target, duration, suffix) {
      if (!el) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        el.textContent = this.formatNumber(Math.round(target), suffix);
        return;
      }

      duration = duration || 1500;
      const start = performance.now();
      const from = parseFloat(el.textContent.replace(/[^0-9.-]/g, '')) || 0;

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = this.easeOutQuart(progress);
        const current = from + (target - from) * eased;

        el.textContent = this.formatNumber(Math.round(current), suffix);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.classList.add('bounce');
          setTimeout(() => el.classList.remove('bounce'), 400);
          el.dispatchEvent(new CustomEvent('signal:count-complete'));
        }
      };

      requestAnimationFrame(tick);
    },

    easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    },

    formatNumber(num, suffix) {
      const formatted = num.toLocaleString('en-US');
      return suffix ? formatted + suffix : formatted;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 7. KINETIC TEXT (Word/Char Split)
  // ═══════════════════════════════════════════════════════════════════════
  const Kinetic = {
    splitWords(el) {
      if (!el) return [];

      const text = el.textContent || '';
      const words = text.trim().split(/\s+/);
      const wrapped = [];

      el.innerHTML = words.map((word, i) => {
        wrapped.push({ word, index: i });
        return `<span class="word" style="--i:${i};display:inline-block;transition:opacity 0.5s,transform 0.5s;opacity:0;transform:translateY(20px)">${word}</span>`;
      }).join(' ');

      return el.querySelectorAll('.word');
    },

    splitChars(el) {
      if (!el) return [];

      const text = el.textContent || '';
      el.innerHTML = text.split('').map((char, i) => {
        return `<span class="char" style="--i:${i};display:inline-block;transition:opacity 0.4s,transform 0.4s;opacity:0;transform:translateY(10px) rotateX(-90deg)">${char === ' ' ? '&nbsp;' : char}</span>`;
      }).join('');

      return el.querySelectorAll('.char');
    },

    splitLines(el) {
      if (!el) return [];

      // Get computed style to determine line height and content structure
      const computedStyle = window.getComputedStyle(el);
      const lineHeight = parseFloat(computedStyle.lineHeight) || 24;
      const content = el.innerHTML;

      // Simple line split - wrap content in overflow:hidden containers
      el.innerHTML = content.split(/\n<br.*>\n/).
      map(line => `<div class="line" style="overflow:hidden;display:block"><span style="display:block;transform:translateY(100%);transition:transform 0.6s">${line}</span></div>`).
      join('');

      // Also handle regular blocks and flex containers
      const lines = el.querySelectorAll('.line');

      return lines;
    },

    animateWordsIn(el, delayBase) {
      delayBase = delayBase || 0;
      const words = el.querySelectorAll('.word');
      words.forEach((word, i) => {
        setTimeout(() => {
          word.style.opacity = '1';
          word.style.transform = 'translateY(0)';
        }, delayBase + i * 100);
      });
    },

    animateCharsIn(el, delayBase) {
      delayBase = delayBase || 0;
      const chars = el.querySelectorAll('.char');
      chars.forEach((char, i) => {
        setTimeout(() => {
          char.style.opacity = '1';
          char.style.transform = 'translateY(0) rotateX(0)';
        }, delayBase + i * 30);
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 8. GLASSMORPHISM CARDS
  // ═══════════════════════════════════════════════════════════════════════
  const Glass = {
    init() {
      const cards = elAll('.glass-card-hover');

      cards.forEach(card => {
        // Hover: lift and glow
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-4px)';
          card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2), 0 0 30px rgba(59,130,246,0.15)';
          card.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s';
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
          card.style.boxShadow = '';
        });

        // Click: press feedback
        card.addEventListener('mousedown', () => {
          card.style.transform = 'translateY(-2px) scale(0.98)';
          card.style.transition = 'transform 0.1s';
        });

        card.addEventListener('mouseup', () => {
          card.style.transform = 'translateY(-4px) scale(1)';
        });
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 9. NAVIGATION SCROLL STATE
  // ═══════════════════════════════════════════════════════════════════════
  const Nav = {
    nav: null,
    toggle: null,
    links: null,
    threshold: 100,

    init() {
      this.nav = el('.nav');
      this.toggle = el('.nav-toggle');
      this.links = el('.nav-links');

      if (!this.nav) return;

      // Scroll state listener
      window.addEventListener('scroll', () => {
        this.nav.classList.toggle('scrolled', window.scrollY > this.threshold);
      }, { passive: true });

      // Mobile toggle
      if (this.toggle && this.links) {
        this.toggle.addEventListener('click', () => {
          this.toggle.classList.toggle('active');
          this.links.classList.toggle('open');
        });

        // Close on link click
        elAll('a', this.links).forEach(link => {
          link.addEventListener('click', () => {
            this.toggle.classList.remove('active');
            this.links.classList.remove('open');
          });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
          if (!this.nav.contains(e.target)) {
            this.toggle.classList.remove('active');
            this.links.classList.remove('open');
          }
        });
      }

      // Active page highlight
      this.highlightActivePage();
    },

    highlightActivePage() {
      if (!this.links) return;
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      elAll('a', this.links).forEach(a => {
        const href = a.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    },

    setThreshold(threshold) {
      this.threshold = threshold;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 10. HORIZONTAL SCROLL CONVERTER
  // ═══════════════════════════════════════════════════════════════════════
  const HorizontalScroll = {
    wrapper: null,
    scrollLeft: 0,
    targetScrollLeft: 0,
    isDragging: false,
    startX: 0,
    rafId: null,
    progressBar: null,

    init(sectionEl) {
      if (!sectionEl) return;

      this.wrapper = sectionEl;
      this.scrollLeft = 0;
      this.targetScrollLeft = 0;

      // Create progress bar if not exists
      this.progressBar = el('.h-scroll-progress', this.wrapper);
      if (!this.progressBar) {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'h-scroll-progress';
        this.progressBar.style.cssText = `
          position:absolute;bottom:0;left:0;height:3px;
          background:linear-gradient(90deg,#3b82f6,#00ff88);
          width:0%;transition:width 0.1s;
        `;
        this.wrapper.style.position = 'relative';
        this.wrapper.appendChild(this.progressBar);
      }

      // Mouse wheel - convert to horizontal scroll
      this.wrapper.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          this.targetScrollLeft += e.deltaY;
          this.clampScroll();
        }
      }, { passive: false });

      // Touch/drag support
      this.wrapper.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.startX = e.pageX - this.scrollLeft;
        this.wrapper.style.cursor = 'grabbing';
      });

      document.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        e.preventDefault();
        this.targetScrollLeft = e.pageX - this.startX;
        this.clampScroll();
      });

      document.addEventListener('mouseup', () => {
        this.isDragging = false;
        this.wrapper.style.cursor = '';
      });

      // Touch events
      this.wrapper.addEventListener('touchstart', (e) => {
        this.isDragging = true;
        this.startX = e.touches[0].pageX - this.scrollLeft;
      }, { passive: true });

      this.wrapper.addEventListener('touchmove', (e) => {
        if (!this.isDragging) return;
        this.targetScrollLeft = e.touches[0].pageX - this.startX;
        this.clampScroll();
      }, { passive: true });

      this.wrapper.addEventListener('touchend', () => {
        this.isDragging = false;
      });

      // Start RAF loop
      this.startLoop();
    },

    clampScroll() {
      const maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
      this.targetScrollLeft = Math.max(0, Math.min(this.targetScrollLeft, maxScroll));
    },

    startLoop() {
      const tick = () => {
        this.scrollLeft = this.lerp(this.scrollLeft, this.targetScrollLeft, 0.1);
        this.wrapper.scrollLeft = this.scrollLeft;

        // Update progress bar
        const maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
        const progress = maxScroll > 0 ? (this.scrollLeft / maxScroll) * 100 : 0;
        this.progressBar.style.width = `${progress}%`;

        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);
    },

    lerp(start, end, factor) {
      return start + (end - start) * factor;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 11. SKILL WEB INTERACTIVE
  // ═══════════════════════════════════════════════════════════════════════
  const SkillWeb = {
    svg: null,
    nodes: [],
    lines: [],
    tooltip: null,
    centerX: 0,
    centerY: 0,
    radius: 0,

    init(svgEl) {
      if (!svgEl) return;
      this.svg = svgEl;

      const rect = this.svg.getBoundingClientRect();
      this.centerX = rect.width / 2;
      this.centerY = rect.height / 2;
      this.radius = Math.min(rect.width, rect.height) * 0.35;

      // Create tooltip
      this.tooltip = document.createElement('div');
      this.tooltip.className = 'skill-tooltip';
      this.tooltip.style.cssText = `
        position:absolute;background:rgba(15,23,42,0.95);
        border:1px solid rgba(59,130,246,0.3);color:#fff;
        padding:12px 16px;border-radius:8px;font-size:13px;
        pointer-events:none;opacity:0;transform:translateY(8px);
        transition:opacity 0.2s,transform 0.2s;z-index:100;
        max-width:200px;font-family:Inter,sans-serif;
      `;
      this.svg.style.position = 'relative';
      this.svg.appendChild(this.tooltip);

      this.layout();
      this.bindEvents();
    },

    layout() {
      const skillNodes = elAll('.skill-node', this.svg);

      skillNodes.forEach((node, i) => {
        const angle = (i / skillNodes.length) * 2 * Math.PI - Math.PI / 2;
        const x = this.centerX + this.radius * Math.cos(angle);
        const y = this.centerY + this.radius * Math.sin(angle);

        node.dataset.cx = x;
        node.dataset.cy = y;
        node.style.transform = `translate(${x}px, ${y}px)`;
      });

      this.nodes = skillNodes;
    },

    bindEvents() {
      this.nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
          this.highlightConnections(node);
        });

        node.addEventListener('mouseleave', () => {
          this.clearHighlights();
        });

        node.addEventListener('click', () => {
          this.showTooltip(node);
        });
      });

      // Hide tooltip on scroll
      window.addEventListener('scroll', () => {
        this.hideTooltip();
      }, { passive: true });
    },

    highlightConnections(node) {
      const nodeId = node.dataset.id;
      const connections = JSON.parse(node.dataset.connections || '[]');

      this.nodes.forEach(n => {
        const id = n.dataset.id;
        if (id === nodeId || connections.includes(id)) {
          n.classList.add('skill-highlighted');
        } else {
          n.classList.add('skill-dimmed');
        }
      });
    },

    clearHighlights() {
      this.nodes.forEach(n => {
        n.classList.remove('skill-highlighted', 'skill-dimmed');
      });
    },

    showTooltip(node) {
      const name = node.dataset.name || '';
      const level = node.dataset.level || '';
      const desc = node.dataset.desc || '';

      this.tooltip.innerHTML = `
        <div style="font-weight:600;margin-bottom:4px">${name}</div>
        <div style="color:#3b82f6;font-size:11px;margin-bottom:6px">${level}</div>
        <div style="color:#94a3b8;font-size:12px;line-height:1.4">${desc}</div>
      `;

      const cx = parseFloat(node.dataset.cx) || 0;
      const cy = parseFloat(node.dataset.cy) || 0;

      this.tooltip.style.left = `${cx + 30}px`;
      this.tooltip.style.top = `${cy - 20}px`;
      this.tooltip.style.opacity = '1';
      this.tooltip.style.transform = 'translateY(0)';
    },

    hideTooltip() {
      this.tooltip.style.opacity = '0';
      this.tooltip.style.transform = 'translateY(8px)';
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 12. JOURNEY TIMELINE
  // ═══════════════════════════════════════════════════════════════════════
  const Timeline = {
    line: null,
    path: null,
    nodes: [],
    length: 0,
    rafId: null,

    init(lineEl) {
      if (!lineEl) return;
      this.line = lineEl;
      this.path = el('path[data-timeline]', this.line);

      if (this.path) {
        this.length = this.path.getTotalLength();
        this.path.style.strokeDasharray = this.length;
        this.path.style.strokeDashoffset = this.length;
      }

      this.nodes = elAll('.timeline-node', this.line);

      window.addEventListener('scroll', () => {
        this.update();
      }, { passive: true });

      this.update();
    },

    update() {
      if (!this.path) return;

      const rect = this.line.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate visibility
      const progress = 1 - (rect.bottom / (rect.height + windowHeight));
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Animate path
      const offset = this.length * (1 - clampedProgress);
      this.path.style.strokeDashoffset = offset;

      // Pulse nodes when in viewport
      this.nodes.forEach(node => {
        const nodeRect = node.getBoundingClientRect();
        const nodeProgress = 1 - (nodeRect.bottom / (nodeRect.height + windowHeight));

        if (nodeProgress > 0.3) {
          node.classList.add('timeline-active');
        } else {
          node.classList.remove('timeline-active');
        }
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 13. VIDEO LAZY LOAD
  // ═══════════════════════════════════════════════════════════════════════
  const VideoLazy = {
    observer: null,

    init() {
      const videos = elAll('video[data-src]');

      if (!videos.length) return;

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = entry.target;
            const src = video.dataset.src;
            const poster = video.dataset.poster;

            if (poster) video.poster = poster;
            video.src = src;
            video.load();

            video.addEventListener('canplay', () => {
              video.classList.add('video-loaded');
              video.dispatchEvent(new CustomEvent('signal:video-loaded'));
            }, { once: true });

            this.observer.unobserve(video);
          }
        });
      }, { threshold: 0.1 });

      videos.forEach(video => {
        this.observer.observe(video);
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 14. TOAST / NOTIFICATION SYSTEM
  // ═══════════════════════════════════════════════════════════════════════
  const Toast = {
    container: null,
    queue: [],
    isShowing: false,

    init() {
      this.container = document.createElement('div');
      this.container.id = 'toast-container-v20';
      this.container.style.cssText = `
        position:fixed;bottom:24px;right:24px;z-index:9999;
        display:flex;flex-direction:column;gap:8px;
        pointer-events:none;font-family:Inter,sans-serif;
      `;
      document.body.appendChild(this.container);
    },

    show(message, type, duration) {
      type = type || 'info';
      duration = duration || 4000;

      const colors = {
        success: { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)', text: '#10b981' },
        error:   { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', text: '#ef4444' },
        info:    { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', text: '#3b82f6' },
        hope:    { bg: 'rgba(251,191,36,0.15)', border: 'rgba(251,191,36,0.4)', text: '#fbbf24' },
        neutral: { bg: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.4)', text: '#64748b' },
      };

      const c = colors[type] || colors.info;

      const toast = document.createElement('div');
      toast.style.cssText = `
        background:${c.bg};border:1px solid ${c.border};color:${c.text};
        padding:14px 20px;border-radius:10px;font-size:14px;
        pointer-events:auto;opacity:0;transform:translateY(16px) scale(0.95);
        transition:opacity 0.3s cubic-bezier(0.34,1.56,0.64,1),
                   transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        max-width:380px;backdrop-filter:blur(10px);
        box-shadow:0 4px 20px rgba(0,0,0,0.15);
      `;
      toast.textContent = message;
      this.container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0) scale(1)';
      });

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(16px) scale(0.95)';
        setTimeout(() => {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
      }, duration);
    },

    showSuccess(message, duration) { this.show(message, 'success', duration); },
    showError(message, duration) { this.show(message, 'error', duration); },
    showInfo(message, duration) { this.show(message, 'info', duration); },
    showHope(message, duration) { this.show(message, 'hope', duration); }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 15. SMOOTH ANCHOR LINKS
  // ═══════════════════════════════════════════════════════════════════════
  const SmoothNav = {
    init() {
      const anchors = elAll('a[href^="#"]');

      anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId === '#' || !targetId) return;

          const target = el(targetId);
          if (!target) return;

          e.preventDefault();

          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Dispatch custom event
          target.dispatchEvent(new CustomEvent('signal:navigated', {
            detail: { anchor: anchor.href }
          }));
        });
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 16. MOMENTUM SCROLL / INERTIA
  // ═══════════════════════════════════════════════════════════════════════
  const MomentumScroll = {
    velocity: 0,
    rafId: null,
    isActive: false,

    init() {
      // Passive listener for momentum
      window.addEventListener('scroll', () => {
        if (!this.isActive) {
          this.startMomentum();
        }
        this.velocity = Scroll.getVelocity();
      }, { passive: true });
    },

    startMomentum() {
      this.isActive = true;

      const tick = () => {
        if (Math.abs(this.velocity) > 0.01) {
          this.velocity *= 0.95; // Deceleration
          window.scrollBy(0, this.velocity);

          if (Math.abs(this.velocity) < 0.5) {
            this.velocity = 0;
            this.isActive = false;
            return;
          }
        }
        this.rafId = requestAnimationFrame(tick);
      };

      this.rafId = requestAnimationFrame(tick);
    },

    stop() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.velocity = 0;
      this.isActive = false;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 17. TESTIMONIAL DRIFT
  // ═══════════════════════════════════════════════════════════════════════
  const TestimonialDrift = {
    quotes: [],

    init() {
      this.quotes = elAll('.testimonial-quote-icon, .quote-drift');

      if (!this.quotes.length) return;

      // Subtle parallax on scroll
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        this.quotes.forEach((quote, i) => {
          const factor = (i + 1) * 0.05;
          const offset = scrollY * factor;
          quote.style.transform = `translateY(${offset}px)`;
        });
      }, { passive: true });
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 18. BENTO GRID ANIMATIONS
  // ═══════════════════════════════════════════════════════════════════════
  const BentoGrid = {
    init() {
      const grids = elAll('.bento-grid');

      grids.forEach(grid => {
        const cards = elAll('.bento-card', grid);
        if (!cards.length) return;

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const card = entry.target;
              const row = parseInt(card.dataset.row || '0', 10);
              const col = parseInt(card.dataset.col || '0', 10);
              const delay = (row + col) * 100;

              setTimeout(() => {
                card.classList.add('bento-visible');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
              }, delay);

              observer.unobserve(card);
            }
          });
        }, { threshold: 0.1 });

        cards.forEach(card => {
          // Set initial hidden state
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px) scale(0.95)';
          card.style.transition = 'opacity 0.6s cubic-bezier(0.34,1.56,0.64,1), transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
          observer.observe(card);
        });
      });
    },

    // Manual reveal for dynamically added cards
    revealCard(card, row, col) {
      const delay = (row + col) * 100;
      setTimeout(() => {
        card.classList.add('bento-visible');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, delay);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 19. FORM / ASSESSMENT INTERACTIONS
  // ═══════════════════════════════════════════════════════════════════════
  const Assessment = {
    form: null,
    currentSection: 0,
    sections: [],
    progressBar: null,
    tags: [],

    init() {
      this.form = el('.assessment-form');
      if (!this.form) return;

      this.sections = elAll('.assessment-section', this.form);
      this.progressBar = el('.assessment-progress-bar');

      if (this.sections.length) {
        this.showSection(0);
      }

      this.initTagInput();
      this.initSliders();
      this.initSubmit();
    },

    showSection(index) {
      this.sections.forEach((section, i) => {
        section.classList.toggle('section-active', i === index);
        section.classList.toggle('section-hidden', i !== index);
      });

      this.currentSection = index;
      this.updateProgress();

      // Dispatch event
      this.form.dispatchEvent(new CustomEvent('signal:section-change', {
        detail: { current: index, total: this.sections.length }
      }));
    },

    updateProgress() {
      if (!this.progressBar) return;
      const progress = ((this.currentSection + 1) / this.sections.length) * 100;
      this.progressBar.style.width = `${progress}%`;
    },

    initTagInput() {
      const input = el('.tag-input', this.form);
      const container = el('.tag-container', this.form);

      if (!input || !container) return;

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const value = input.value.trim();
          if (value && !this.tags.includes(value)) {
            this.tags.push(value);
            this.renderTags();
            input.value = '';
          }
        }
        if (e.key === 'Backspace' && !input.value && this.tags.length) {
          this.tags.pop();
          this.renderTags();
        }
      });

      container.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag-remove')) {
          const tagValue = e.target.parentElement.dataset.tag;
          this.tags = this.tags.filter(t => t !== tagValue);
          this.renderTags();
        }
      });
    },

    renderTags() {
      const container = el('.tag-container', this.form);
      if (!container) return;

      container.innerHTML = this.tags.map(tag => `
        <span class="tag" data-tag="${tag}">
          ${tag}
          <button type="button" class="tag-remove">&times;</button>
        </span>
      `).join('');
    },

    initSliders() {
      const sliders = elAll('input[type="range"]', this.form);

      sliders.forEach(slider => {
        const valueDisplay = el(`.slider-value[data-for="${slider.id}"]`);

        slider.addEventListener('input', () => {
          if (valueDisplay) {
            valueDisplay.textContent = slider.value;
          }
        });
      });
    },

    initSubmit() {
      const submitBtn = el('.assessment-submit', this.form);

      if (!submitBtn) return;

      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Celebrate animation
        this.celebrate();

        submitBtn.dispatchEvent(new CustomEvent('signal:assessment-complete', {
          detail: { tags: this.tags }
        }));
      });
    },

    celebrate() {
      const particles = 50;
      const container = this.form;

      for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position:absolute;width:8px;height:8px;border-radius:50%;
          background:${['#3b82f6','#00ff88','#fbbf24','#a855f7'][i % 4]};
          pointer-events:none;z-index:1000;
          animation:celebrateParticle 1s cubic-bezier(0.34,1.56,0.64,1) forwards;
          left:${50 + (Math.random() - 0.5) * 20}%;
          top:50%;
        `;
        particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 300}px`);
        particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 300}px`);
        container.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
      }

      // Add keyframes if not exists
      if (!el('#celebrate-keyframes')) {
        const style = document.createElement('style');
        style.id = 'celebrate-keyframes';
        style.textContent = `
          @keyframes celebrateParticle {
            0% { transform: translate(0,0) scale(1); opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 20. API CLIENT
  // ═══════════════════════════════════════════════════════════════════════
  const API = {
    base: CONFIG.API_BASE,

    async request(method, path, body) {
      const url = this.base + path;
      const opts = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (body) opts.body = JSON.stringify(body);

      try {
        const res = await fetch(url, opts);
        const data = await res.json();
        if (!res.ok) {
          return { _error: true, status: res.status, ...data };
        }
        return data;
      } catch (e) {
        return { _error: true, status: 0, error: 'Network error — is the server running?' };
      }
    },

    getUser(id)          { return this.request('GET', `/users/${id}`); },
    createUser(data)     { return this.request('POST', '/users', data); },
    updateUser(id, d)    { return this.request('PUT', `/users/${id}`, d); },

    getJobs(userId)      { return this.request('GET', `/jobs?user_id=${userId}&limit=100`); },
    createJob(data)      { return this.request('POST', '/jobs', data); },
    updateJob(id, d)     { return this.request('PUT', `/jobs/${id}`, d); },
    updateJobStatus(id, status) { return this.request('PATCH', `/jobs/${id}/status`, { status }); },
    deleteJob(id)        { return this.request('DELETE', `/jobs/${id}`); },

    score(userId, jobId) { return this.request('POST', '/score', { user_id: userId, job_id: jobId }); },
    bulkScore(userId)    { return this.request('POST', '/score/bulk', { user_id: userId }); },

    getApplications(userId) { return this.request('GET', `/applications?user_id=${userId}&limit=100`); },
    createApplication(jobId, userId) { return this.request('POST', '/applications', { job_id: jobId, user_id: userId }); },
    updateAppStatus(id, status) { return this.request('PATCH', `/applications/${id}/status`, { status }); },

    getDashboard(userId) { return this.request('GET', `/dashboard/${userId}`); },
    getCoachingTip()     { return this.request('GET', '/coaching-tip'); },
    getPersona(userId)   { return this.request('GET', `/persona/${userId}`); },

    health() { return this.request('GET', '/health'); },
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 21. STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════
  const State = {
    userId: localStorage.getItem(CONFIG.USER_ID_KEY),
    data: null,

    getUserId() {
      return this.userId;
    },

    setUserId(id) {
      this.userId = id;
      localStorage.setItem(CONFIG.USER_ID_KEY, id);
    },

    getUserData() {
      if (!this.data) {
        try {
          this.data = JSON.parse(localStorage.getItem(CONFIG.USER_DATA_KEY) || 'null');
        } catch {
          this.data = null;
        }
      }
      return this.data;
    },

    setUserData(d) {
      this.data = d;
      localStorage.setItem(CONFIG.USER_DATA_KEY, JSON.stringify(d));
    },

    clearUser() {
      this.userId = null;
      this.data = null;
      localStorage.removeItem(CONFIG.USER_ID_KEY);
      localStorage.removeItem(CONFIG.USER_DATA_KEY);
    },

    requireUser(redirectUrl) {
      if (!this.userId) {
        window.location.href = redirectUrl || 'assessment.html';
        return false;
      }
      return true;
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 22. CLIP-PATH SECTION REVEALS
  // ═══════════════════════════════════════════════════════════════════════
  const SectionReveal = {
    init() {
      const sections = elAll('.section-reveal[data-clip-type]');
      if (!sections.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            const clipType = section.dataset.clipType;
            this.applyReveal(section, clipType);
            observer.unobserve(section);
          }
        });
      }, { threshold: 0.1 });

      sections.forEach(section => {
        const clipType = section.dataset.clipType;
        this.setInitialState(section, clipType);
        observer.observe(section);
      });
    },

    setInitialState(section, clipType) {
      switch (clipType) {
        case 'wipe-down':
          section.style.clipPath = 'inset(100% 0 0 0)';
          break;
        case 'wipe-up':
          section.style.clipPath = 'inset(0 0 100% 0)';
          break;
        case 'diagonal':
          section.style.clipPath = 'inset(0 0 100% 0)';
          break;
        case 'circle-expand':
          section.style.clipPath = 'circle(0% at 50% 50%)';
          break;
        case 'corner-expand':
          section.style.clipPath = 'inset(50% 50% 50% 50%)';
          break;
        default:
          section.style.clipPath = 'inset(100% 0 0 0)';
      }
      section.style.transition = 'clip-path 0.8s cubic-bezier(0.34,1.56,0.64,1)';
    },

    applyReveal(section, clipType) {
      switch (clipType) {
        case 'wipe-down':
          section.style.clipPath = 'inset(0 0 0 0)';
          break;
        case 'wipe-up':
          section.style.clipPath = 'inset(0 0 0 0)';
          break;
        case 'diagonal':
          section.style.clipPath = 'inset(0 0 0 0)';
          break;
        case 'circle-expand':
          section.style.clipPath = 'circle(100% at 50% 50%)';
          break;
        case 'corner-expand':
          section.style.clipPath = 'inset(0 0 0 0)';
          break;
        default:
          section.style.clipPath = 'inset(0 0 0 0)';
      }

      section.dispatchEvent(new CustomEvent('signal:revealed'));
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 23. FORMATTING UTILITIES
  // ═══════════════════════════════════════════════════════════════════════
  const Format = {
    salary(min, max) {
      if (!min && !max) return '';
      const fmt = v => v >= 1000 ? '$' + Math.round(v / 1000) + 'K' : '$' + v;
      if (min && max) return fmt(min) + ' - ' + fmt(max);
      if (min) return 'From ' + fmt(min);
      return 'Up to ' + fmt(max);
    },

    score(n) {
      if (n == null) return '--';
      return Math.round(n);
    },

    scoreColor(n) {
      if (n == null) return '#64748b';
      if (n >= 90) return '#10b981';
      if (n >= 75) return '#3b82f6';
      if (n >= 50) return '#fbbf24';
      return '#94a3b8';
    },

    timeAgo(date) {
      if (!date) return '';
      const d = new Date(date);
      const now = new Date();
      const diff = Math.floor((now - d) / 1000);
      if (diff < 60) return 'just now';
      if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
      if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
      return Math.floor(diff / 86400) + 'd ago';
    },

    statusLabel(s) {
      const map = {
        new: 'New', viewed: 'Viewed', interested: 'Interested',
        applied: 'Applied', interviewing: 'Interviewing',
        offered: 'Offered', rejected: 'Not a match',
        withdrawn: 'Withdrawn', drafting: 'Drafting',
        submitted: 'Submitted', screening: 'In Review',
        interview_scheduled: 'Interview Scheduled', offer: 'Offer',
      };
      return map[s] || s;
    },

    statusColor(s) {
      const map = {
        new: '#94a3b8', viewed: '#3b82f6', interested: '#10b981',
        applied: '#3b82f6', interviewing: '#a855f7',
        offered: '#00ff88', offer: '#00ff88',
        rejected: '#ef4444', withdrawn: '#64748b',
        drafting: '#94a3b8', submitted: '#3b82f6',
        screening: '#10b981', interview_scheduled: '#a855f7',
      };
      return map[s] || '#94a3b8';
    },

    count(n) {
      if (n == null) return '0';
      return n.toLocaleString('en-US');
    },

    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    formatRelativeDate(date) {
      if (!date) return '';
      const d = new Date(date);
      const now = new Date();
      const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return this.formatDate(date);
    }
  };

  // ═══════════════════════════════════════════════════════════════════════
  // 24. INITIALIZATION SEQUENCE
  // ═══════════════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen first
    LoadingScreen.init();

    // Wait for loading screen to complete, then initialize animations
    setTimeout(() => {
      Nav.init();
      Scroll.init();
      Observer.init();
      Parallax.init();

      // Cursor only on non-touch devices
      if (!('ontouchstart' in window)) {
        Cursor.init();
      }

      Glass.init();
      BentoGrid.init();
      TestimonialDrift.init();
      SmoothNav.init();
      Toast.init();

      // Conditional initializations
      if (el('.h-scroll-section')) HorizontalScroll.init(el('.h-scroll-section'));
      if (el('.skill-web')) SkillWeb.init(el('.skill-web'));
      if (el('.journey-line')) Timeline.init(el('.journey-line'));
      if (el('video[data-src]')) VideoLazy.init();
      if (el('.assessment-form')) Assessment.init();
      if (el('.section-reveal[data-clip-type]')) SectionReveal.init();

      // Count-up stats
      elAll('[data-count]').forEach(el => {
        CountUp.animate(el, parseFloat(el.dataset.count), parseInt(el.dataset.duration || '1500', 10), el.dataset.suffix);
      });

      // Initialize parallax layers
      elAll('[data-parallax]').forEach(parallaxEl => {
        const factor = parseFloat(parallaxEl.dataset.parallax);
        Parallax.add(parallaxEl, factor);
      });

      // Initialize kinetic text
      elAll('.kinetic-words').forEach(el => {
        Kinetic.splitWords(el);
      });
      elAll('.kinetic-chars').forEach(el => {
        Kinetic.splitChars(el);
      });

    }, 650);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // 25. EXPORT
  // ═══════════════════════════════════════════════════════════════════════
  window.SignalV20 = {
    // Core
    Cursor,
    Scroll,
    Observer,
    Parallax,
    CountUp,
    Kinetic,
    Glass,
    Nav,
    Toast,

    // Advanced features
    HorizontalScroll,
    SkillWeb,
    Timeline,
    VideoLazy,
    SmoothNav,
    MomentumScroll,
    TestimonialDrift,
    BentoGrid,
    Assessment,
    SectionReveal,

    // Data layer
    API,
    State,
    Format,
    CONFIG,

    // Utility
    el,
    elAll,
  };

})();