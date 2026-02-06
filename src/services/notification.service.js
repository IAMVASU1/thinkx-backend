const sendNotification = async ({ userId, title, message }) => {
  try {
    // 🔹 Future: Firebase / OneSignal
    console.log('🔔 Notification sent');
    console.log('User:', userId);
    console.log('Title:', title);
    console.log('Message:', message);

    return true;
  } catch (error) {
    console.error('Notification service error:', error.message);
    return false;
  }
};

export default sendNotification;
