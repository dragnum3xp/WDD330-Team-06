export default class Alert {
  constructor(alertsPath = '/json/alerts.json') {
    this.alertsPath = alertsPath;
  }

  async init() {
    try {
      const alerts = await this.loadAlerts();
      if (alerts && alerts.length > 0) {
        this.renderAlerts(alerts);
      }
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  }

  async loadAlerts() {
    const response = await fetch(this.alertsPath);
    if (!response.ok) {
      throw new Error('Failed to load alerts');
    }
    return await response.json();
  }

  renderAlerts(alerts) {
    const section = document.createElement('section');
    section.className = 'alert-list';

    alerts.forEach(alert => {
      const alertElement = document.createElement('p');
      alertElement.textContent = alert.message;
      alertElement.style.backgroundColor = alert.background;
      alertElement.style.color = alert.color;
      section.appendChild(alertElement);
    });

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.prepend(section);
    }
  }
}
