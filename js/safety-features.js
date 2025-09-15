// Emergency SOS functionality
class EmergencySystem {
    constructor() {
        this.emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
        this.isLocationEnabled = false;
        this.currentLocation = null;
        this.init();
    }

    init() {
        this.createSOSButton();
        this.setupPanicMode();
        this.requestLocationPermission();
    }

    // Create floating SOS button
    createSOSButton() {
        const sosButton = document.createElement('div');
        sosButton.id = 'emergency-sos-button';
        sosButton.innerHTML = `
            <div class="sos-button">
                <span>SOS</span>
            </div>
        `;
        sosButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            cursor: pointer;
        `;
        
        document.body.appendChild(sosButton);
        
        // Add SOS button styles
        const sosStyles = document.createElement('style');
        sosStyles.textContent = `
            .sos-button {
                width: 70px;
                height: 70px;
                background: linear-gradient(45deg, #ff0000, #cc0000);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 14px;
                box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
                transition: all 0.3s ease;
                animation: pulse 2s infinite;
            }
            
            .sos-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(255, 0, 0, 0.6);
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
            }
            
            .emergency-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .emergency-modal-content {
                background: white;
                padding: 30px;
                border-radius: 10px;
                max-width: 400px;
                width: 90%;
                text-align: center;
            }
            
            .emergency-countdown {
                font-size: 48px;
                font-weight: bold;
                color: #ff0000;
                margin: 20px 0;
            }
        `;
        document.head.appendChild(sosStyles);
        
        sosButton.addEventListener('click', () => this.triggerEmergency());
    }

    // Setup panic mode (Esc key)
    setupPanicMode() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.activatePanicMode();
            }
        });
    }

    // Activate panic mode - redirect to neutral page
    activatePanicMode() {
        // Store current page in session storage for potential return
        sessionStorage.setItem('panicModeOrigin', window.location.href);
        
        // Create Google-like neutral page
        document.body.innerHTML = `
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
                .google-container { 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center; 
                    height: 100vh; 
                    background: #fff;
                }
                .google-logo { 
                    font-size: 90px; 
                    color: #4285f4; 
                    margin-bottom: 30px;
                    font-weight: normal;
                }
                .search-box {
                    width: 500px;
                    height: 44px;
                    border: 1px solid #dfe1e5;
                    border-radius: 24px;
                    padding: 0 20px;
                    font-size: 16px;
                    outline: none;
                }
                .search-buttons {
                    margin-top: 30px;
                }
                .search-btn {
                    background: #f8f9fa;
                    border: 1px solid #f8f9fa;
                    border-radius: 4px;
                    color: #3c4043;
                    font-size: 14px;
                    margin: 11px 4px;
                    padding: 0 20px;
                    height: 36px;
                    cursor: pointer;
                }
                .return-link {
                    position: fixed;
                    top: 10px;
                    left: 10px;
                    color: #666;
                    text-decoration: none;
                    font-size: 12px;
                }
            </style>
            <div class="google-container">
                <div class="google-logo">Google</div>
                <input type="text" class="search-box" placeholder="Search Google or type a URL">
                <div class="search-buttons">
                    <button class="search-btn">Google Search</button>
                    <button class="search-btn">I'm Feeling Lucky</button>
                </div>
            </div>
            <a href="#" class="return-link" onclick="history.back()">← Back</a>
        `;
        
        // Change page title
        document.title = 'Google';
        
        console.log('Panic mode activated - page disguised');
    }

    // Request location permission
    async requestLocationPermission() {
        if ('geolocation' in navigator) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                this.isLocationEnabled = true;
                this.currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
            } catch (error) {
                console.log('Location access denied or unavailable');
            }
        }
    }

    // Trigger emergency with countdown
    triggerEmergency() {
        const modal = document.createElement('div');
        modal.className = 'emergency-modal';
        modal.innerHTML = `
            <div class="emergency-modal-content">
                <h2>Emergency Alert Triggered!</h2>
                <div class="emergency-countdown" id="countdown">5</div>
                <p>Emergency message will be sent in <span id="countdown-text">5</span> seconds</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: #ccc; border: none; padding: 10px 20px; border-radius: 5px; margin: 5px;">
                    Cancel
                </button>
                <button onclick="emergencySystem.sendEmergencyAlert(); this.parentElement.parentElement.remove()" 
                        style="background: #ff0000; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin: 5px;">
                    Send Now
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        let countdown = 5;
        const countdownInterval = setInterval(() => {
            countdown--;
            const countdownEl = document.getElementById('countdown');
            const countdownTextEl = document.getElementById('countdown-text');
            
            if (countdownEl && countdownTextEl) {
                countdownEl.textContent = countdown;
                countdownTextEl.textContent = countdown;
                
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    this.sendEmergencyAlert();
                    modal.remove();
                }
            } else {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    // Send emergency alert
    async sendEmergencyAlert() {
        await this.requestLocationPermission();
        
        const emergencyData = {
            location: this.currentLocation,
            timestamp: new Date().toISOString(),
            message: 'EMERGENCY: This is an automated emergency alert. Please check on me immediately.',
            userAgent: navigator.userAgent,
            pageUrl: window.location.href
        };

        try {
            // Send to backend
            const response = await fetch('/api/emergency-alert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emergencyData)
            });

            if (response.ok) {
                this.showEmergencyConfirmation();
            } else {
                throw new Error('Failed to send emergency alert');
            }
        } catch (error) {
            console.error('Emergency alert failed:', error);
            // Fallback: try to send via email directly or show manual instructions
            this.showEmergencyFallback(emergencyData);
        }
    }

    showEmergencyConfirmation() {
        const confirmation = document.createElement('div');
        confirmation.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 10002;
        `;
        confirmation.textContent = '✓ Emergency alert sent successfully!';
        document.body.appendChild(confirmation);
        
        setTimeout(() => confirmation.remove(), 5000);
    }

    showEmergencyFallback(emergencyData) {
        const fallback = document.createElement('div');
        fallback.className = 'emergency-modal';
        fallback.innerHTML = `
            <div class="emergency-modal-content">
                <h3>Emergency Alert - Manual Send</h3>
                <p>Automatic sending failed. Please copy this information and send manually:</p>
                <textarea readonly style="width: 100%; height: 150px; margin: 10px 0;">${JSON.stringify(emergencyData, null, 2)}</textarea>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                    Close
                </button>
            </div>
        `;
        document.body.appendChild(fallback);
    }

    // Manage emergency contacts
    addEmergencyContact(name, phone, email) {
        const contact = { id: Date.now(), name, phone, email };
        this.emergencyContacts.push(contact);
        localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
        return contact;
    }

    removeEmergencyContact(id) {
        this.emergencyContacts = this.emergencyContacts.filter(c => c.id !== id);
        localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
    }

    getEmergencyContacts() {
        return this.emergencyContacts;
    }
}

// Live Location Sharing System
class LocationSharingSystem {
    constructor() {
        this.activeShares = new Map();
        this.watchId = null;
    }

    async startLocationSharing(contactIds, duration = 60) {
        if (!('geolocation' in navigator)) {
            throw new Error('Geolocation not supported');
        }

        const shareId = 'share_' + Date.now();
        const endTime = Date.now() + (duration * 60 * 1000);

        this.activeShares.set(shareId, {
            contactIds,
            endTime,
            active: true
        });

        // Start watching position
        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.updateLocation(shareId, position),
            (error) => console.error('Location error:', error),
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );

        // Auto-stop after duration
        setTimeout(() => this.stopLocationSharing(shareId), duration * 60 * 1000);

        return shareId;
    }

    async updateLocation(shareId, position) {
        const share = this.activeShares.get(shareId);
        if (!share || !share.active) return;

        const locationData = {
            shareId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
        };

        try {
            await fetch('/api/update-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(locationData)
            });
        } catch (error) {
            console.error('Failed to update location:', error);
        }
    }

    stopLocationSharing(shareId) {
        const share = this.activeShares.get(shareId);
        if (share) {
            share.active = false;
            this.activeShares.delete(shareId);
        }

        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }
}

// Anonymous Reporting System
class AnonymousReportingSystem {
    constructor() {
        this.initReportingModal();
    }

    initReportingModal() {
        // Add report button to navigation or as floating button
        const reportButton = document.createElement('button');
        reportButton.textContent = 'Report Incident';
        reportButton.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: #ff6b35;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 20px;
            cursor: pointer;
            z-index: 9999;
            font-size: 12px;
        `;
        reportButton.onclick = () => this.showReportModal();
        document.body.appendChild(reportButton);
    }

    showReportModal() {
        const modal = document.createElement('div');
        modal.className = 'emergency-modal';
        modal.innerHTML = `
            <div class="emergency-modal-content" style="max-width: 500px;">
                <h3>Anonymous Incident Report</h3>
                <form id="incident-report-form">
                    <div style="margin: 15px 0;">
                        <label>Type of Incident:</label>
                        <select name="incidentType" required style="width: 100%; padding: 8px; margin-top: 5px;">
                            <option value="">Select incident type</option>
                            <option value="harassment">Street Harassment</option>
                            <option value="unsafe_area">Unsafe Area</option>
                            <option value="stalking">Stalking</option>
                            <option value="assault">Physical Assault</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <label>Location:</label>
                        <input type="text" name="location" placeholder="Street address or area name" 
                               style="width: 100%; padding: 8px; margin-top: 5px;" required>
                        <button type="button" onclick="anonymousReporting.getCurrentLocation()" 
                                style="margin-top: 5px; padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 3px;">
                            Use Current Location
                        </button>
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <label>Description:</label>
                        <textarea name="description" rows="4" placeholder="Please describe the incident (optional)"
                                  style="width: 100%; padding: 8px; margin-top: 5px;"></textarea>
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <label>Time of Incident:</label>
                        <input type="datetime-local" name="incidentTime" 
                               style="width: 100%; padding: 8px; margin-top: 5px;">
                    </div>
                    
                    <div style="margin: 15px 0;">
                        <label>
                            <input type="checkbox" name="anonymous" checked> 
                            Submit anonymously (recommended)
                        </label>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <button type="button" onclick="this.closest('.emergency-modal').remove()" 
                                style="background: #ccc; border: none; padding: 10px 20px; border-radius: 5px; margin: 5px;">
                            Cancel
                        </button>
                        <button type="submit" 
                                style="background: #ff6b35; color: white; border: none; padding: 10px 20px; border-radius: 5px; margin: 5px;">
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('incident-report-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReport(new FormData(e.target));
            modal.remove();
        });
    }

    async getCurrentLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            
            // Reverse geocoding would require an API, for now just show coordinates
            const locationInput = document.querySelector('input[name="location"]');
            locationInput.value = `Lat: ${position.coords.latitude.toFixed(6)}, Lng: ${position.coords.longitude.toFixed(6)}`;
        } catch (error) {
            alert('Could not get current location. Please enter manually.');
        }
    }

    async submitReport(formData) {
        const reportData = {
            incidentType: formData.get('incidentType'),
            location: formData.get('location'),
            description: formData.get('description'),
            incidentTime: formData.get('incidentTime'),
            anonymous: formData.has('anonymous'),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        try {
            const response = await fetch('/api/submit-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reportData)
            });

            if (response.ok) {
                this.showSubmissionConfirmation();
            } else {
                throw new Error('Failed to submit report');
            }
        } catch (error) {
            console.error('Report submission failed:', error);
            alert('Failed to submit report. Please try again later.');
        }
    }

    showSubmissionConfirmation() {
        const confirmation = document.createElement('div');
        confirmation.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 10002;
        `;
        confirmation.textContent = '✓ Report submitted successfully. Thank you for helping make our community safer.';
        document.body.appendChild(confirmation);
        
        setTimeout(() => confirmation.remove(), 7000);
    }
}

// Initialize all systems when page loads
let emergencySystem, locationSharing, anonymousReporting;

document.addEventListener('DOMContentLoaded', () => {
    emergencySystem = new EmergencySystem();
    locationSharing = new LocationSharingSystem();
    anonymousReporting = new AnonymousReportingSystem();
    
    console.log('Safety systems initialized');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EmergencySystem, LocationSharingSystem, AnonymousReportingSystem };
}