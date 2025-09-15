/* ==========================================================================
   SAFEHER GLOBAL JAVASCRIPT
   Universal functionality for all pages
   ========================================================================== */

// Global Variables
let sidePanel = null;
let sidePanelBackdrop = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeGlobalFeatures();
});

// ==========================================================================
// SIDEBAR FUNCTIONALITY
// ==========================================================================

function initializeSidebar() {
    sidePanel = document.getElementById('sidePanel');
    sidePanelBackdrop = document.getElementById('sidePanelBackdrop');
    
    // Add keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidePanel && sidePanel.classList.contains('open')) {
            toggleSidePanel();
        }
    });
}

function toggleSidePanel() {
    if (!sidePanel || !sidePanelBackdrop) {
        console.warn('Sidebar elements not found');
        return;
    }
    
    const isOpen = sidePanel.classList.contains('open');
    
    if (isOpen) {
        closeSidePanel();
    } else {
        openSidePanel();
    }
}

function openSidePanel() {
    if (sidePanel && sidePanelBackdrop) {
        sidePanel.classList.add('open');
        sidePanelBackdrop.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

function closeSidePanel() {
    if (sidePanel && sidePanelBackdrop) {
        sidePanel.classList.remove('open');
        sidePanelBackdrop.classList.remove('show');
        document.body.style.overflow = ''; // Restore background scroll
    }
}

// ==========================================================================
// DOWNLOAD FUNCTIONALITY
// ==========================================================================

function downloadSafetyKit() {
    const content = `COMPREHENSIVE WOMEN'S SAFETY KIT - SafeHer Platform

🛡️ PERSONAL SAFETY ESSENTIALS:
- Emergency whistle or personal alarm
- SafeHer mobile app installed and configured
- Pepper spray (check local laws)
- Self-defense keychain tools
- Emergency cash and backup cards
- Copies of important identification
- Medical emergency information card
- Emergency contact list (laminated)

📱 DIGITAL SAFETY TOOLKIT:
- Strong, unique passwords for all accounts
- Two-factor authentication enabled everywhere
- Privacy settings properly configured
- Regular software and app updates
- Secure backup of important data
- VPN installed for public Wi-Fi protection
- Location sharing apps configured
- Emergency apps with quick access

🚨 EMERGENCY PREPAREDNESS CHECKLIST:
- Local emergency numbers programmed in phone
- Share live location with trusted contacts
- Basic self-defense techniques practiced
- Emergency scenarios rehearsed with family
- First aid kit accessible at home/work
- Backup communication methods available
- Safe meeting points established
- Emergency evacuation routes planned

📞 ESSENTIAL CONTACT NUMBERS:
India:
- All Emergency Services: 112
- Police: 100
- Women Helpline: 1091
- Child Helpline: 1098
- Cyber Crime: 1930

International:
- USA: 911 (Emergency), 988 (Crisis)
- UK: 999 (Emergency), 116 123 (Samaritans)
- Australia: 000
- Europe: 112

Remember: Your safety is not negotiable!

© 2025 SafeHer Platform`;

    downloadTextFile(content, 'SafeHer_Complete_Safety_Kit.txt');
}

function downloadEmergencyGuide() {
    const content = `EMERGENCY ACTION GUIDE - SafeHer Platform

🚨 IMMEDIATE EMERGENCY RESPONSE:

STEP 1: ASSESS THE SITUATION
- Is there immediate physical danger?
- Can you safely remove yourself?
- Do you need immediate help?
- Are others at risk?

STEP 2: TAKE IMMEDIATE ACTION
If in Physical Danger:
- Call emergency services immediately
- Get to a safe location if possible
- Alert others nearby if safe to do so
- Use personal safety devices if available

If Facing Harassment/Threats:
- Document everything (screenshots, recordings)
- Do not engage with the aggressor
- Report to appropriate authorities
- Seek support from trusted contacts

STEP 3: CONTACT HELP
Emergency Services:
- India: 112 (All emergencies)
- Police: 100
- Medical: 108
- Fire: 101

Specialized Help:
- Women in Distress: 1091
- Cyber Crime: 1930
- Child Helpline: 1098

📱 DIGITAL EMERGENCIES:
Cyberbullying/Harassment:
- Take screenshots immediately
- Block and report the user
- Do not respond to provocations
- Report to platform administrators
- File cyber crime complaint if severe

Remember: In any emergency, your safety comes first!

© 2025 SafeHer Platform`;

    downloadTextFile(content, 'SafeHer_Emergency_Action_Guide.txt');
}

function downloadSelfDefenseGuide() {
    const content = `WOMEN'S SELF DEFENSE GUIDE - SafeHer Platform

🥊 FUNDAMENTAL PRINCIPLES:

1. AWARENESS IS YOUR FIRST LINE OF DEFENSE
- Stay alert to surroundings
- Trust your instincts
- Avoid distractions in unsafe areas
- Know your escape routes
- Recognize potential threats early

2. YOUR GOAL IS TO ESCAPE, NOT FIGHT
- Create opportunity to flee
- Distract and run
- Fight only when escape isn't possible
- Use maximum force if you must fight
- Get to safety and call for help

🎯 VULNERABLE TARGET AREAS:

PRIMARY TARGETS (Most Effective):
• EYES - Thumb strikes, finger jabs
• NOSE - Palm heel strikes upward
• THROAT - Knife hand, knuckle strikes
• SOLAR PLEXUS - Hard punches, knee strikes
• GROIN - Knee strikes, kicks, grabs
• SHINS - Hard kicks, stomps
• INSTEP - Heel stomps

✊ ESSENTIAL TECHNIQUES:

1. PALM HEEL STRIKE
- Use heel of palm, not knuckles
- Strike upward toward nose/chin
- Drive through the target

2. KNEE STRIKE
- Most powerful close-range technique
- Grab attacker's clothing/shoulders
- Drive knee upward to groin/abdomen

3. ELBOW STRIKE
- Strongest weapon at close range
- Strike backward, sideways, or upward
- Target ribs, solar plexus, or face

🔧 IMPROVISED WEAPONS:
• Keys - Between fingers for striking
• Pen/Pencil - Stabbing weapon
• Phone - Striking weapon
• Bag/Purse - Swinging weapon
• Hairspray - Temporary blindness

Remember: The best self-defense is avoiding dangerous situations!

© 2025 SafeHer Platform`;

    downloadTextFile(content, 'SafeHer_Self_Defense_Guide.txt');
}

function downloadLegalRights() {
    const content = `WOMEN'S LEGAL RIGHTS GUIDE - SafeHer Platform

⚖️ FUNDAMENTAL LEGAL RIGHTS:

CONSTITUTIONAL RIGHTS (India):
- Right to Equality (Article 14)
- Right to Life and Personal Liberty (Article 21)
- Right against Discrimination (Article 15)
- Right to Privacy (Fundamental Right)
- Right to Dignity (Article 21)

WORKPLACE RIGHTS:
- Equal pay for equal work
- Safe working environment
- Protection from sexual harassment
- Maternity leave and benefits
- Non-discriminatory hiring practices

🚨 VIOLENCE AND HARASSMENT LAWS:

DOMESTIC VIOLENCE:
Protection of Women from Domestic Violence Act, 2005:
- Right to residence
- Right to maintenance
- Right to custody of children
- Protection orders available

SEXUAL HARASSMENT:
Sexual Harassment of Women at Workplace Act, 2013:
- Applies to all workplaces
- Internal Complaints Committee mandatory
- Confidential complaint process
- Protection from retaliation

📱 CYBER CRIMES PROTECTION:
Information Technology Act, 2000:
- Protection from cyberbullying
- Punishment for identity theft
- Privacy violation penalties
- Obscene content sharing punishment

📋 HOW TO FILE COMPLAINTS:

POLICE COMPLAINT:
1. Visit nearest police station
2. File FIR immediately
3. Get FIR copy
4. Ensure proper investigation
5. Follow up regularly

ONLINE COMPLAINTS:
- National Cyber Crime Portal: cybercrime.gov.in
- Women Helpline: 1091
- State Women Commission
- National Commission for Women

📞 IMPORTANT LEGAL CONTACTS:
- National Commission for Women: 011-26942369
- National Human Rights Commission: 011-23340891
- Supreme Court Legal Services: 011-23388952

Remember: Knowledge of your legal rights is your first defense!

© 2025 SafeHer Platform`;

    downloadTextFile(content, 'SafeHer_Legal_Rights_Guide.txt');
}

function downloadTextFile(content, filename) {
    try {
        const element = document.createElement('a');
        const file = new Blob([content], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        // Enhanced success message
        showNotification(`✅ ${filename} downloaded successfully!`, 'success');
        
    } catch (error) {
        console.error('Download failed:', error);
        showNotification('❌ Download failed. Please try again.', 'error');
    }
}

// ==========================================================================
// NOTIFICATION SYSTEM
// ==========================================================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.safeher-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `safeher-notification safeher-notification-${type}`;
    notification.innerHTML = `
        <div class="safeher-notification-content">
            <span class="safeher-notification-message">${message}</span>
            <button class="safeher-notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        background: ${type === 'success' ? '#4ECDC4' : type === 'error' ? '#FF6B6B' : '#6B46C1'};
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ==========================================================================
// GLOBAL FEATURES
// ==========================================================================

function initializeGlobalFeatures() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading states to forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitButton) {
                submitButton.style.opacity = '0.7';
                submitButton.style.pointerEvents = 'none';
                const originalText = submitButton.textContent;
                submitButton.textContent = originalText + '...';
                
                // Reset after 3 seconds (adjust based on your needs)
                setTimeout(() => {
                    submitButton.style.opacity = '';
                    submitButton.style.pointerEvents = '';
                    submitButton.textContent = originalText;
                }, 3000);
            }
        });
    });
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

function getCurrentPageName() {
    return window.location.pathname.split('/').pop().replace('.html', '') || 'index';
}

function setActiveNavLink() {
    const currentPage = getCurrentPageName();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Initialize active nav link when page loads
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ==========================================================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================================================

// Add focus management for sidebar
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && sidePanel && sidePanel.classList.contains('open')) {
        const focusableElements = sidePanel.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
});

// Console welcome message
console.log(`
🛡️ SafeHer Platform - Women's Safety First
📱 Global JavaScript Loaded Successfully
🌟 Version: 2.0.0
💜 Empowering Women Through Technology
`);