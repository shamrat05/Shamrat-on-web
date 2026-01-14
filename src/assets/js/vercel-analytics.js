/**
 * Vercel Analytics and Speed Insights Integration
 * Tracks page views, events, and performance metrics for Shamrat's portfolio
 * 
 * This implementation follows Vercel's official Web Analytics guide
 * Reference: https://vercel.com/docs/analytics/quickstart
 */

// ===============================================
// Vercel Analytics Setup (Official Method)
// ===============================================

(function() {
  try {
    console.log('Initializing Vercel Analytics custom tracking...');
    
    // Note: Basic page view tracking is handled by /_vercel/insights/script.js in base.njk
    // We don't need to import @vercel/analytics because we are using the Script Tag method

    // ===============================================
    // Custom Event Tracking System
    // ===============================================

    window.trackEvent = function(eventName, eventData = {}) {
      try {
        // Use the window.va function for Web Analytics events
        if (typeof window.va === 'function') {
          window.va('event', {
            name: eventName,
            data: eventData
          });
          // Debug log (only visible in development usually, but helpful here)
          // console.log(`✓ Event tracked via Web Analytics: ${eventName}`, eventData);
        }
        
        // Also send to Vercel Analytics if available (legacy/alternative)
        if (window.analytics && typeof window.analytics.track === 'function') {
          window.analytics.track(eventName, eventData);
        }
        
        // Also send to Google Analytics if available
        if (typeof gtag === 'function') {
          gtag('event', eventName, eventData);
        }
      } catch (error) {
        console.warn(`⚠ Error tracking event "${eventName}":`, error.message);
      }
    };

    // ===============================================
    // Automatic Event Tracking
    // ===============================================

    // Track when user interacts with portfolio items
    document.addEventListener('click', function(e) {
      const portfolioItem = e.target.closest('.portfolio-item, .portfolio-card, .blog-card');
      if (portfolioItem) {
        const itemTitle = portfolioItem.querySelector('h3, .card-title')?.textContent || 'Unknown Item';
        window.trackEvent('portfolio_item_click', {
          item_title: itemTitle,
          item_category: portfolioItem.getAttribute('data-category') || 'portfolio'
        });
      }

      // Track contact form submissions
      const submitBtn = e.target.closest('.form-submit, [type="submit"]');
      if (submitBtn && submitBtn.closest('.contact-form')) {
        window.trackEvent('contact_form_submitted', {
          form_type: 'contact'
        });
      }

      // Track CTA button clicks
      if (e.target.closest('.btn-primary, .btn-secondary')) {
        const btnText = e.target.textContent || 'Button Click';
        window.trackEvent('cta_button_click', {
          button_text: btnText.trim()
        });
      }
    });

    // Track navigation to different sections
    const originalScrollToSection = window.scrollToSection;
    if (originalScrollToSection) {
      window.scrollToSection = function(sectionId) {
        window.trackEvent('section_navigation', {
          section: sectionId
        });
        return originalScrollToSection.call(this, sectionId);
      };
    }

    // Track page visibility changes
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) {
        window.trackEvent('page_focus_gained', {
          timestamp: new Date().toISOString()
        });
      } else {
        window.trackEvent('page_focus_lost', {
          timestamp: new Date().toISOString()
        });
      }
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;
        
        // Track milestones
        if (maxScrollDepth >= 25 && maxScrollDepth < 26) {
          window.trackEvent('scroll_depth_25');
        } else if (maxScrollDepth >= 50 && maxScrollDepth < 51) {
          window.trackEvent('scroll_depth_50');
        } else if (maxScrollDepth >= 75 && maxScrollDepth < 76) {
          window.trackEvent('scroll_depth_75');
        } else if (maxScrollDepth >= 90 && maxScrollDepth < 91) {
          window.trackEvent('scroll_depth_90');
        }
      }
    }, { passive: true });

    // Track time on page
    const pageLoadTime = Date.now();
    window.addEventListener('beforeunload', function() {
      const timeOnPage = (Date.now() - pageLoadTime) / 1000; // Convert to seconds
      window.trackEvent('page_unload', {
        time_on_page_seconds: Math.round(timeOnPage),
        page_url: window.location.pathname
      });
    });

    console.log('✓ Custom event tracking initialized');

  } catch (error) {
    console.error('✗ Error initializing Vercel Analytics:', error);
  }
})();

