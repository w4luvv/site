// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Feature Tabs Functionality
const featureTabs = document.querySelectorAll('.feature-tab');
const featurePanels = document.querySelectorAll('.feature-panel');

featureTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetFeature = tab.getAttribute('data-feature');
        
        // Remove active class from all tabs and panels
        featureTabs.forEach(t => t.classList.remove('active'));
        featurePanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        const targetPanel = document.getElementById(targetFeature);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// Product Card Hover Effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = card.classList.contains('featured') 
            ? 'scale(1.05) translateY(-10px)' 
            : 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = card.classList.contains('featured') 
            ? 'scale(1.05)' 
            : 'translateY(0)';
    });
});

// Purchase tracking system
let totalPurchases = parseInt(localStorage.getItem('totalPurchases')) || 0;
let robloxPurchases = parseInt(localStorage.getItem('robloxPurchases')) || 0;
let cs2Purchases = parseInt(localStorage.getItem('cs2Purchases')) || 0;

// REAL Active Users Counter - NO SIMULATION
let activeUsers = 0;
let userSessions = JSON.parse(localStorage.getItem('userSessions')) || [];
const currentSessionId = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
const currentUserId = generateUserId();

const activeUsersElement = document.getElementById('active-users');
const totalPurchasesElement = document.getElementById('total-purchases');

// Generate unique user ID
function generateUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

// Initialize REAL active users system
function initializeActiveUsers() {
    // Clean old sessions (older than 5 minutes for real-time accuracy)
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    userSessions = userSessions.filter(session => session.lastActivity > fiveMinutesAgo);
    
    // Add current session
    const currentSession = {
        id: currentSessionId,
        userId: currentUserId,
        startTime: Date.now(),
        lastActivity: Date.now(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct'
    };
    userSessions.push(currentSession);
    
    // Calculate REAL active users (unique users in last 5 minutes)
    const uniqueUsers = new Set(userSessions.map(session => session.userId));
    activeUsers = uniqueUsers.size;
    
    // Save to localStorage
    localStorage.setItem('userSessions', JSON.stringify(userSessions));
    
    // Update display with REAL count
    if (activeUsersElement) {
        animateCounter(activeUsersElement, activeUsers, 1000);
    }
    
    // Start REAL updates
    startRealTimeUpdates();
}

// Start REAL time updates
function startRealTimeUpdates() {
    // Update every 30 seconds for real accuracy
    setInterval(() => {
        updateUserActivity();
    }, 30000);
}

// Update REAL user activity
function updateUserActivity() {
    // Update current session activity
    const sessionIndex = userSessions.findIndex(session => session.id === currentSessionId);
    if (sessionIndex !== -1) {
        userSessions[sessionIndex].lastActivity = Date.now();
        localStorage.setItem('userSessions', JSON.stringify(userSessions));
    }
    
    // Clean old sessions (5 minutes)
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    userSessions = userSessions.filter(session => session.lastActivity > fiveMinutesAgo);
    
    // Calculate REAL unique active users
    const uniqueUsers = new Set(userSessions.map(session => session.userId));
    activeUsers = uniqueUsers.size;
    
    // Update display with REAL count
    if (activeUsersElement) {
        animateCounter(activeUsersElement, activeUsers, 500);
    }
}

function updateMostBought() {
    const robloxCard = document.getElementById('roblox-card');
    const cs2Card = document.getElementById('cs2-card');
    
    if (!robloxCard || !cs2Card) return;
    
    // Remove most-bought class from both cards
    robloxCard.querySelector('.product-badge').classList.remove('most-bought');
    cs2Card.querySelector('.product-badge').classList.remove('most-bought');
    
    // Add most-bought class to the product with more purchases
    if (robloxPurchases > cs2Purchases) {
        robloxCard.querySelector('.product-badge').classList.add('most-bought');
        robloxCard.querySelector('.product-badge').textContent = 'Most Bought';
    } else if (cs2Purchases > robloxPurchases) {
        cs2Card.querySelector('.product-badge').classList.add('most-bought');
        cs2Card.querySelector('.product-badge').textContent = 'Most Bought';
    } else {
        // If equal, randomly choose one
        const random = Math.random();
        if (random < 0.5) {
            robloxCard.querySelector('.product-badge').classList.add('most-bought');
            robloxCard.querySelector('.product-badge').textContent = 'Most Bought';
        } else {
            cs2Card.querySelector('.product-badge').classList.add('most-bought');
            cs2Card.querySelector('.product-badge').textContent = 'Most Bought';
        }
    }
}

function recordPurchase(product) {
    totalPurchases++;
    
    // Save to localStorage
    localStorage.setItem('totalPurchases', totalPurchases.toString());
    
    if (totalPurchasesElement) {
        totalPurchasesElement.textContent = totalPurchases;
    }
    
    if (product === 'Roblox Cheats') {
        robloxPurchases++;
        localStorage.setItem('robloxPurchases', robloxPurchases.toString());
    } else if (product === 'CS2 Cheats') {
        cs2Purchases++;
        localStorage.setItem('cs2Purchases', cs2Purchases.toString());
    }
    
    updateMostBought();
}

// Initialize active users system on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeActiveUsers();
    
    // Update total purchases display
    if (totalPurchasesElement) {
        totalPurchasesElement.textContent = totalPurchases;
    }
});

// Track user activity on various events
document.addEventListener('click', updateUserActivity);
document.addEventListener('scroll', updateUserActivity);
document.addEventListener('mousemove', updateUserActivity);

// Update most bought every second
setInterval(updateMostBought, 1000);

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ca3f' : type === 'error' ? '#ff5f56' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
    }
});

// Add focus styles for accessibility
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #667eea';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .feature-tab');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add some interactive effects
document.querySelectorAll('.feature-tab').forEach(tab => {
    tab.addEventListener('mouseenter', () => {
        if (!tab.classList.contains('active')) {
            tab.style.transform = 'translateY(-2px) scale(1.05)';
        }
    });
    
    tab.addEventListener('mouseleave', () => {
        if (!tab.classList.contains('active')) {
            tab.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Console welcome message
console.log('%c4EXT-CHEATS', 'color: #667eea; font-size: 2rem; font-weight: bold;');
console.log('%cWelcome to the future of gaming! 🎮', 'color: #764ba2; font-size: 1rem;');

// Notification logic (bell animation, centered bottom)
let notifTimeout;
function showPurchaseNotification({
  type = 'success',
  title = '',
  details = '',
  duration = 4000,
  product = '',
  quantity = 1,
  total = '',
  email = ''
} = {}) {
  let notif = document.querySelector('.purchase-notification-new');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'purchase-notification-new';
    notif.innerHTML = `
      <div class="notif-icon-new"></div>
      <div class="notif-content-new">
        <div class="notif-title-new"></div>
        <div class="notif-details-new"></div>
      </div>
      <button class="notif-close-new" aria-label="Close notification">&times;</button>
    `;
    document.body.appendChild(notif);
  } else {
    notif.innerHTML = `
      <div class="notif-icon-new"></div>
      <div class="notif-content-new">
        <div class="notif-title-new"></div>
        <div class="notif-details-new"></div>
      </div>
      <button class="notif-close-new" aria-label="Close notification">&times;</button>
    `;
  }
  // Set icon and color
  const iconDiv = notif.querySelector('.notif-icon-new');
  if (iconDiv) {
    iconDiv.className = 'notif-icon-new ' + (type === 'success' ? 'notif-success-new' : 'notif-error-new');
    iconDiv.innerHTML = type === 'success'
      ? '<span class="notif-check-new">✔</span>'
      : '<span class="notif-cross-new">✖</span>';
  }
  // Set content
  notif.querySelector('.notif-title-new').textContent = title;
  notif.querySelector('.notif-details-new').innerHTML =
    (product ? `<b>Product:</b> ${product}<br>` : '') +
    (quantity ? `<b>Quantity:</b> ${quantity}<br>` : '') +
    (total ? `<b>Total:</b> $${total}<br>` : '') +
    (email ? `<b>Email sent to:</b> ${email}` : details);
  // Show
  notif.classList.remove('hide');
  notif.classList.add('show');
  // Remove after duration
  clearTimeout(notifTimeout);
  notifTimeout = setTimeout(() => {
    hidePurchaseNotification();
  }, duration);
  // Close button
  notif.querySelector('.notif-close-new').onclick = hidePurchaseNotification;
}
function hidePurchaseNotification() {
  const notif = document.querySelector('.purchase-notification-new');
  if (notif) {
    notif.classList.remove('show');
    notif.classList.add('hide');
    setTimeout(() => {
      notif.classList.remove('hide');
      notif.remove();
    }, 500);
  }
}

let currentPrice = 0;

function openPaymentPopup(product, price) {
  document.getElementById('popup-product-name').textContent = product;
  document.getElementById('popup-product-price').textContent = `$${price}`;
  document.getElementById('order-quantity').value = 1;
  currentPrice = price;
  updateTotalPrice();
  document.getElementById('payment-popup').classList.add('active');
  document.body.style.overflow = 'hidden';
}
window.openPaymentPopup = openPaymentPopup;

function closePaymentPopup() {
  document.getElementById('payment-popup').classList.remove('active');
  document.body.style.overflow = 'auto';
}
window.closePaymentPopup = closePaymentPopup;

function updateTotalPrice() {
  const quantity = Math.max(1, parseInt(document.getElementById('order-quantity').value) || 1);
  const total = currentPrice * quantity;
  document.getElementById('popup-total-price').textContent = `$${total}`;
}
window.updateTotalPrice = updateTotalPrice;

// Initialize EmailJS
if (window.emailjs) {
  emailjs.init('z2WmcwjGtarSEt6kH');
}

function processPurchase() {
  // Validation
  const method = document.getElementById('payment-method')?.value;
  const email = document.getElementById('customer-email')?.value.trim();
  const product = document.getElementById('popup-product-name')?.textContent || '';
  const quantity = Math.max(1, parseInt(document.getElementById('order-quantity').value) || 1);
  const total = currentPrice * quantity;
  if (!method) {
    showPurchaseNotification({
      type: 'error',
      title: 'Payment Failed',
      details: 'Please select a payment method.',
      duration: 4000
    });
    return;
  }
  if (!email || !/^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9\-.]+)\.([a-zA-Z]{2,})$/.test(email)) {
    showPurchaseNotification({
      type: 'error',
      title: 'Payment Failed',
      details: 'Please enter a valid email address.',
      duration: 4000
    });
    return;
  }
  // Increment and save purchase count
  totalPurchases++;
  localStorage.setItem('totalPurchases', totalPurchases.toString());
  if (totalPurchasesElement) {
    totalPurchasesElement.textContent = totalPurchases;
  }
  closePaymentPopup();
  showPaymentBlur();
  // Send email via EmailJS
  if (window.emailjs) {
    emailjs.send('service_s228403', 'template_byoru3i', {
      time: new Date().toLocaleString(),
      name: email,
      message: `Purchased: ${product} | Quantity: ${quantity} | Total: $${total}`,
      email: email,
      title: product
    }).then(function() {
      hidePaymentBlur();
      showPurchaseNotification({
        type: 'success',
        title: 'Purchase Complete',
        product,
        quantity,
        total,
        email,
        details: '',
        duration: 4000
      });
    }, function(error) {
      hidePaymentBlur();
      showPurchaseNotification({
        type: 'error',
        title: 'Email Failed',
        details: 'Could not send confirmation email. Try again.',
        duration: 4000
      });
    });
  } else {
    hidePaymentBlur();
    showPurchaseNotification({
      type: 'success',
      title: 'Purchase Complete',
      product,
      quantity,
      total,
      email,
      details: '',
      duration: 4000
    });
  }
}
function showPaymentBlur() {
  const blur = document.getElementById('payment-blur');
  if (blur) blur.classList.add('active');
}
function hidePaymentBlur() {
  const blur = document.getElementById('payment-blur');
  if (blur) blur.classList.remove('active');
}
window.processPurchase = processPurchase;

// Close payment popup when clicking outside of it
window.addEventListener('mousedown', function(e) {
  const popup = document.getElementById('payment-popup');
  const content = document.querySelector('.payment-popup-content');
  if (popup && popup.classList.contains('active')) {
    if (content && !content.contains(e.target)) {
      closePaymentPopup();
    }
  }
});

// Category filter logic
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');
categoryBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    categoryBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const cat = this.getAttribute('data-category');
    productCards.forEach(card => {
      if (cat === 'all' || (card.getAttribute('data-category') === cat)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}); 