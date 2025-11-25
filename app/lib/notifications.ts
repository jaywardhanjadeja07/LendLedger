// Browser notification utility for reminders

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        return 'denied';
    }

    return await Notification.requestPermission();
}

/**
 * Send a notification
 */
export function sendNotification(title: string, options?: NotificationOptions): void {
    if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        return;
    }

    if (Notification.permission === 'granted') {
        new Notification(title, {
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-192x192.png',
            ...options,
        });
    } else {
        console.warn('Notification permission not granted');
    }
}

/**
 * Send a loan reminder notification
 */
export function sendLoanReminder(contactName: string, amount: number, dueDate: Date): void {
    const daysUntil = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    let message = '';
    if (daysUntil < 0) {
        message = `${contactName}'s loan of $${amount} is ${Math.abs(daysUntil)} days overdue!`;
    } else if (daysUntil === 0) {
        message = `${contactName}'s loan of $${amount} is due today!`;
    } else {
        message = `${contactName}'s loan of $${amount} is due in ${daysUntil} days`;
    }

    sendNotification('LendLedger Reminder', {
        body: message,
        tag: 'loan-reminder',
    });
}

/**
 * Check if notifications are supported and enabled
 */
export function areNotificationsEnabled(): boolean {
    return 'Notification' in window && Notification.permission === 'granted';
}
