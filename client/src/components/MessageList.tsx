
import TypingIndicator from './TypingIndicator';
// @ts-ignore
const MessageList = ({ messages, isTyping }) => {
  return (
    <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
      { /* @ts-ignore */ }
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-end mb-4 ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.sender === 'bot' && (
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          <div
            className={`rounded-lg px-4 py-2 max-w-xs ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-800 shadow'
            }`}
          >
            {message.text}
          </div>
          {message.sender === 'user' && (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default MessageList;