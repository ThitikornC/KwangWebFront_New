export const sendLineNotification = async (message: any) => {
  const config = useRuntimeConfig();
  const token = config.lineChannelAccessToken || process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const userIdConfig = config.lineUserId || process.env.LINE_USER_ID;

  if (!token) {
    console.warn('LINE_CHANNEL_ACCESS_TOKEN is not defined');
    return;
  }

  // Clean token to remove any accidental newlines or spaces
  const cleanToken = token.trim();

  if (!userIdConfig) {
    console.warn('LINE_USER_ID is not defined');
    return;
  }

  // Split IDs by comma and trim whitespace
  const userIds = userIdConfig.split(',').map((id: string) => id.trim()).filter((id: string) => id.length > 0);

  if (userIds.length === 0) {
    console.warn('No valid LINE User IDs found');
    return;
  }

  // Determine message type (String -> Text Message, Object -> Flex/Other Message)
  const messagesPayload = typeof message === 'string' 
    ? [{ type: 'text', text: message }] 
    : [message];

  try {
    // Use multicast to send to multiple users
    await $fetch('https://api.line.me/v2/bot/message/multicast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanToken}`,
      },
      body: {
        to: userIds,
        messages: messagesPayload
      }
    });
  } catch (error: any) {
    console.error('Error sending LINE Messaging API notification:', error.data || error);
  }
};
