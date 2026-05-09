/**
 * ThanniGo — External Links Configuration
 * Centralized management for all external URLs and assets.
 */

const ThanniGoLinks = {
  // App Downloads
  downloads: {
    googlePlay: 'https://play.google.com/store/apps/details?id=com.thannigo.customer',
    appStore: 'https://apps.apple.com/in/app/thannigo/id6444888888',
  },

  // Social Media
  social: {
    instagram: 'https://instagram.com/thannigo',
    twitter: 'https://twitter.com/thannigo',
    facebook: 'https://facebook.com/thannigo',
    linkedin: 'https://linkedin.com/company/thannigo',
    youtube: 'https://youtube.com/@thannigo',
    whatsapp: 'https://wa.me/918428882777',
  },

  // Contact
  contact: {
    phone: 'tel:+918428882777',
    whatsapp: 'https://wa.me/918428882777',
    email: {
      support: 'mailto:support@thannigo.com',
      business: 'mailto:business@thannigo.com',
      orders: 'mailto:orders@thannigo.com',
    }
  }
};

// Auto-populate links on page load
document.addEventListener('DOMContentLoaded', () => {
  // 1. App Store Buttons
  const playStoreBtn = document.getElementById('btn-google-play');
  const appStoreBtn = document.getElementById('btn-app-store');
  
  if (playStoreBtn) playStoreBtn.href = ThanniGoLinks.downloads.googlePlay;
  if (appStoreBtn) appStoreBtn.href = ThanniGoLinks.downloads.appStore;

  // 2. Social Links (targeting classes)
  document.querySelectorAll('.footer-social-link.instagram').forEach(el => el.href = ThanniGoLinks.social.instagram);
  document.querySelectorAll('.footer-social-link.twitter').forEach(el => el.href = ThanniGoLinks.social.twitter);
  document.querySelectorAll('.footer-social-link.facebook').forEach(el => el.href = ThanniGoLinks.social.facebook);
  document.querySelectorAll('.footer-social-link.linkedin').forEach(el => el.href = ThanniGoLinks.social.linkedin);
  document.querySelectorAll('.footer-social-link.youtube').forEach(el => el.href = ThanniGoLinks.social.youtube);
  document.querySelectorAll('.footer-social-link.whatsapp').forEach(el => el.href = ThanniGoLinks.social.whatsapp);

  // 3. Contact Links
  document.querySelectorAll('.contact-phone-number').forEach(el => {
    if (el.tagName === 'A') el.href = ThanniGoLinks.contact.phone;
  });
  
  // Update footer email links if they exist with specific IDs or classes
  document.querySelectorAll('a[href^="mailto:support"]').forEach(el => el.href = ThanniGoLinks.contact.email.support);
});
