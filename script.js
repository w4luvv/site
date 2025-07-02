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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

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

function renderMessages() {
  const list = document.getElementById('shoutbox-messages');
  if (!list) return;
  list.innerHTML = '';
  messages.slice(-100).forEach((msg) => {
    const isOwn = msg.author === getCurrentUser();
    const isEditing = msg.id === editingMessageId;
    const msgEl = document.createElement('div');
    msgEl.className = 'shoutbox-message';
    let bannedStyle = '';
    let bannedName = '';
    if (msg.banned) {
      bannedStyle = 'opacity:0.5;position:relative;';
      bannedName = `<span style=\"position:relative;display:inline-block;\"><span style='position:absolute;left:0;right:0;top:0;height:4px;background:repeating-linear-gradient(90deg,#ff3b3b,#ff3b3b 10px,transparent 10px,transparent 20px);border-radius:2px;z-index:2;'></span>`;
    }
    msgEl.innerHTML = `
      <img src=\"${msg.banned ? 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png' : DEFAULT_PFP}\" class=\"pfp\" alt=\"pfp\">
      <div class=\"shoutbox-message-content\" style=\"${bannedStyle}\">
        <div class=\"shoutbox-message-meta\">
          ${msg.banned ? bannedName : ''}
          <a href=\"/profile.html?user=${encodeURIComponent(msg.author || 'Anonymous')}\" class=\"profile-link\" target=\"_blank\" style=\"${msg.banned ? 'color:#ff3b3b;text-decoration:line-through;' : ''}\">${escapeHTML(msg.author || 'Anonymous')}</a>
          ${msg.banned ? '</span>' : ''}
          <span class=\"shoutbox-message-time\">${timeAgo(new Date(msg.createdAt))}</span>
        </div>
        <div class=\"shoutbox-message-body\">${isEditing ? '' : escapeHTML(msg.body)}</div>
      </div>
      ${isOwn && !isEditing ? `<button class=\"shoutbox-dots-btn\" title=\"Options\"><i class=\"fas fa-ellipsis-v\"></i></button>` : ''}
      ${isEditing ? `
        <input class=\"shoutbox-edit-input\" type=\"text\" value=\"${escapeHTML(msg.body)}\" maxlength=\"500\" style=\"width:100%;margin-top:4px;\">
        <div style=\"margin-top:6px;display:flex;gap:8px;\">
          <button class=\"shoutbox-edit-apply\" style=\"background:#7f9cf5;color:#fff;\">Apply</button>
          <button class=\"shoutbox-edit-cancel\">Cancel</button>
        </div>
      ` : ''}
    `;
    // ... existing code ...
  });
}

// --- Ban screen logic ---
function showBanScreen(reason, expires) {
  document.body.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#181a20;color:#fff;"><div style='font-size:2.2em;font-weight:900;margin-bottom:0.7em;color:#ff3b3b;'>Account Banned</div><div style='font-size:1.2em;margin-bottom:1.5em;'>You were banned by an admin.</div><div style='background:#23262e;padding:1.5em 2.5em;border-radius:14px;box-shadow:0 4px 32px #0008;max-width:90vw;font-size:1.1em;color:#ffb3b3;'>Reason: <b>${reason ? escapeHTML(reason) : 'No reason provided.'}</b>${expires ? `<br>Ban expires: <b>${new Date(expires).toLocaleString()}</b>` : ''}</div></div>`;
  localStorage.removeItem('forumCurrentUser');
  setTimeout(() => { window.location.reload(); }, 1500);
}
// --- Patch fetch to auto-logout and show ban screen if banned ---
const origFetch = window.fetch;
window.fetch = async function(...args) {
  const res = await origFetch(...args);
  if (res.status === 403) {
    try {
      const data = await res.clone().json();
      if (data && data.error && data.error.includes('Banned')) {
        showBanScreen(data.reason || '', data.expires);
        throw new Error('Banned');
      }
    } catch {}
  }
  return res;
};
// --- Patch login to show ban screen ---
async function login() {
  hideAuthError();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  if (!username || !password) return showAuthError('Please enter your username and password.');
  try {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      if (res.status === 401) return showAuthError('Invalid username or password.');
      if (res.status === 403) {
        const data = await res.json();
        showBanScreen(data.reason || '', data.expires);
        return;
      }
      if (res.status === 404) return showAuthError('User not found.');
      return showAuthError('Login failed.');
    }
    setCurrentUser(username);
    render();
  } catch (e) { showAuthError('Login error.'); }
}

// In loadMessages and any profile post loading, if the current user is banned (i.e., a message or post with their username and banned=true), call showBanScreen(reason) and log them out immediately.
// ... existing code ... 
