import { CONTENT_TYPE_JSON, STRING_EMPTY, HEADER_CONTENT_TYPE, HTTP_METHOD_POST } from '@/constants';

const getChatClient = (webhook: string): ChatClient => {
  const webhookURL = new URL(webhook);
  return {
    sendTextMessage: (message: string) => {
      return handleTextMessage(webhookURL, message);
    },
    sendCardMessage: (ChatCardContainers: ChatCardContainer[], text?: string) => {
      return handleCardMessage(webhookURL, ChatCardContainers, text ?? STRING_EMPTY);
    },
  };
};

const handleTextMessage = (webhook: URL, message: string) => {
  return sendMessageToGoogleChat(webhook, {
    text: message,
  });
}

const handleCardMessage = (webhook: URL, ChatCardContainers: ChatCardContainer[], text: string) => {
  return sendMessageToGoogleChat(webhook, {
    text: text,
    cardsV2: ChatCardContainers,
  } as ChatCardMessage);
};

const sendMessageToGoogleChat = (webhook: URL, body: ChatTextMessage) => {
  return fetch(webhook, {
    method: HTTP_METHOD_POST,
    headers: {
      [HEADER_CONTENT_TYPE]: CONTENT_TYPE_JSON,
    },
    body: JSON.stringify(body),
  });
};


export default getChatClient;