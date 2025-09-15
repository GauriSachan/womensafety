// Download utilities for SafeHer platform
export const downloadUtils = {
  downloadSafetyKit: () => {
    const safetyKitContent = `
SAFEHER COMPLETE SAFETY KIT
===========================

Emergency Contacts:
- Emergency Services: 911
- National Domestic Violence Hotline: 1-800-799-7233
- Crisis Text Line: Text HOME to 741741
- National Sexual Assault Hotline: 1-800-656-4673

Personal Safety Tips:
1. Trust your instincts
2. Stay aware of your surroundings
3. Keep emergency contacts easily accessible
4. Share your location with trusted friends/family
5. Learn basic self-defense techniques

Digital Safety:
- Use strong, unique passwords
- Enable two-factor authentication
- Be cautious about sharing personal information online
- Regularly update privacy settings
- Report cyberbullying and harassment

Safety Resources:
- Self-defense classes in your area
- Women's shelters and safe spaces
- Legal aid organizations
- Counseling and support services

Remember: Your safety is the top priority. Don't hesitate to seek help when needed.

© SafeHer - Women's Safety Awareness Platform
    `;
    
    downloadFile('SafeHer_Complete_Safety_Kit.txt', safetyKitContent);
    showNotification('✅ Safety kit downloaded successfully! Keep this information easily accessible.');
  },

  downloadEmergencyGuide: () => {
    const emergencyGuideContent = `
SAFEHER EMERGENCY RESPONSE GUIDE
================================

IMMEDIATE DANGER:
- Call 911 or local emergency services
- Get to a safe location
- Alert trusted contacts

DOMESTIC VIOLENCE:
- National Hotline: 1-800-799-7233
- Create a safety plan
- Document incidents
- Seek legal protection

SEXUAL ASSAULT:
- National Hotline: 1-800-656-4673
- Go to a safe place
- Consider medical attention
- Preserve evidence if reporting

CYBERBULLYING/HARASSMENT:
- Document evidence (screenshots)
- Block the harasser
- Report to platform administrators
- Contact law enforcement if threats are made

STALKING:
- Document all incidents
- Vary your routine
- Inform trusted contacts
- Contact law enforcement

EMERGENCY SUPPLIES TO KEEP:
- Phone with emergency contacts
- Important documents (ID, medical info)
- Cash and cards
- Medications
- Change of clothes
- Personal protection items

Stay safe and remember: You are not alone.

© SafeHer - Women's Safety Awareness Platform
    `;
    
    downloadFile('SafeHer_Emergency_Response_Guide.txt', emergencyGuideContent);
    showNotification('🆘 Emergency guide downloaded! Share with trusted contacts.');
  },

  downloadSelfDefenseGuide: () => {
    const selfDefenseContent = `
SAFEHER SELF-DEFENSE GUIDE
==========================

AWARENESS & PREVENTION:
- Stay alert and aware of surroundings
- Trust your instincts
- Avoid isolated areas when possible
- Walk confidently with purpose
- Keep hands free when walking

BASIC SELF-DEFENSE TECHNIQUES:

1. PALM STRIKE:
   - Use heel of palm to strike upward to attacker's nose
   - Quick, powerful motion
   - Aim for maximum impact

2. KNEE STRIKE:
   - Drive knee upward into attacker's groin or stomach
   - Use momentum and body weight
   - Create distance after strike

3. ELBOW STRIKE:
   - Use elbow to strike backward or to the side
   - Effective in close-range situations
   - Target solar plexus or ribs

4. EYE GOUGE:
   - Use fingers to target attacker's eyes
   - Creates opportunity to escape
   - Only as last resort in serious danger

5. ESCAPE TECHNIQUES:
   - Break free from wrist grabs by rotating toward thumb
   - Duck and run if grabbed from behind
   - Make noise and draw attention

PERSONAL SAFETY TOOLS:
- Personal alarm/whistle
- Flashlight
- Self-defense keychain
- Consider pepper spray (check local laws)

MENTAL PREPARATION:
- Practice scenarios mentally
- Take self-defense classes
- Build confidence through training
- Remember: escape is always the goal

IMPORTANT: These techniques should supplement, not replace, professional self-defense training.

© SafeHer - Women's Safety Awareness Platform
    `;
    
    downloadFile('SafeHer_Self_Defense_Guide.txt', selfDefenseContent);
    showNotification('🥊 Self-defense guide downloaded! Consider taking professional classes.');
  },

  downloadLegalRights: () => {
    const legalRightsContent = `
SAFEHER LEGAL RIGHTS GUIDE
==========================

YOUR RIGHTS AS A WOMAN:

WORKPLACE RIGHTS:
- Equal pay for equal work
- Freedom from sexual harassment
- Reasonable accommodations for pregnancy
- Protection from discrimination
- Right to report violations without retaliation

DOMESTIC VIOLENCE RIGHTS:
- Right to safety and protection
- Right to file restraining orders
- Right to emergency housing assistance
- Right to legal representation
- Right to keep personal information confidential

SEXUAL ASSAULT RIGHTS:
- Right to report to law enforcement
- Right to medical care and examination
- Right to victim advocacy services
- Right to legal representation
- Right to privacy and confidentiality

DIGITAL RIGHTS:
- Right to privacy online
- Right to control personal information
- Right to report cyberbullying and harassment
- Right to remove content shared without consent
- Protection under revenge porn laws

REPRODUCTIVE RIGHTS:
- Right to make personal healthcare decisions
- Right to contraception access
- Right to safe medical procedures
- Right to privacy in medical matters

HOW TO PROTECT YOUR RIGHTS:
- Document incidents with dates and details
- Keep records of communications
- Know your local laws and resources
- Seek legal advice when needed
- Report violations to appropriate authorities

LEGAL RESOURCES:
- Legal Aid Organizations
- Women's Law Centers
- Bar Association Referral Services
- Civil Rights Organizations
- Victim Services Programs

Remember: Knowledge of your rights is your first line of defense.

© SafeHer - Women's Safety Awareness Platform
    `;
    
    downloadFile('SafeHer_Legal_Rights_Guide.txt', legalRightsContent);
    showNotification('⚖️ Legal rights guide downloaded! Know your rights and how to protect them.');
  }
};

// Helper function to download files
const downloadFile = (filename, content) => {
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// Helper function to show notifications
const showNotification = (message) => {
  // Create a simple notification
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #6B46C1, #EC4899);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    font-weight: 600;
    max-width: 400px;
    word-wrap: break-word;
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 5000);
};