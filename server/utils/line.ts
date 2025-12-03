export const sendLineNotification = async (message: string) => {
  const config = useRuntimeConfig();
  const token = config.lineChannelAccessToken || process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const userId = config.lineUserId || process.env.LINE_USER_ID;

  if (!token) {
    console.warn('LINE_CHANNEL_ACCESS_TOKEN is not defined');
    return;
  }

  // Clean token to remove any accidental newlines or spaces
  const cleanToken = token.trim();

  if (!userId) {
    console.warn('LINE_USER_ID is not defined');
    return;
  }

  try {
    await $fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanToken}`,
      },
      body: {
        to: userId,
        messages: [
          {
            type: 'text',
            text: message
          }
        ]
      }
    });
  } catch (error: any) {
    console.error('Error sending LINE Messaging API notification:', error.data || error);
  }
};
