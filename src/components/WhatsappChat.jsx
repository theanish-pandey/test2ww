// import React, { useState } from 'react';
// import axios from 'axios'; //for making HTTP requests
// const WhatsAppChat = () => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [message, setMessage] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');
//     const [error, setError] = useState('');
//     const sendMessage = async () => {
//         try {
//             const response = await axios.post('/api/send-message', { phoneNumber, message });
//             setResponseMessage('Message sent successfully!');
//             setMessage(''); // Clear the message input after sending
//         } catch (error) {
//             setError('Error sending message. Please try again.');
//             console.error('Error sending message:', error);
//         }
//     };
//     return (
//         <div className="max-w-md mx-auto p-4 bg-gray-200 shadow-md rounded-md">
//             <h2 className="text-lg font-semibold mb-4 text-green-500">WhatsApp Chat</h2>
//             <div className="mb-4" text-green-600>
//                 <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
//                 <input
//                     type="text"
//                     id="phone"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-300"
//                     placeholder="Enter phone number"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
//                 <textarea
//                     id="message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-green-500"
//                     placeholder="Type your message here"
//                 />
//             </div>
//             <div className="mt-2">
//                 <button
//                     className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-300"
//                     onClick={sendMessage}
//                 >
//                     Send Message
//                 </button>
//             </div>
//             {responseMessage && <p className="text-green-600 mt-2">{responseMessage}</p>}
//             {error && <p className="text-red-600 mt-2">{error}</p>}
//         </div>
//     );
// };
// export default WhatsAppChat;





import React, { useState } from 'react';
import axios from 'axios';

function WhatsAppChat() {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [error, setError] = useState(false);

  const sendMessage = async () => {
    try {
      console.log('Sending request...');
      const response = await axios.post('http://localhost:3000/send-message', {
        phoneNumber: phoneNumber,
      });
      console.log('Response:', response);

      if (response.status === 200) {
        setMessageStatus('Message sent successfully!');
        setError(false);
      } else {
        setMessageStatus('Failed to send message.');
        setError(true);
      }
    } catch (error) {
      setMessageStatus('Internal server error.');
      setError(true);
      console.error('Error sending message:', error);
    }

  };


  return (
    <div class="flex justify-center items-center h-screen">

      <div class="max-w-md mx-auto p-4 bg-gray-900 shadow-md rounded-md">

        <h1 class="text-2xl  font-semibold mb-4 text-blue-500">WhatsApp Message Sender</h1>

        <div class="mb-4 mt-10" text-green-600>
          <label class="block mb-2 text-white  font-semibold" for="phoneNumber">Phone Number:</label>
          <input
            class="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring focus:border-green-300"
            placeholder="Enter phone number"
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-full focus:outline-5px focus:shadow-outline shadow-blue-500" onClick={sendMessage}>
          Send
        </button>
        {messageStatus && <p class={`mt-2 ${error ? 'text-red-500  font-semibold' : 'text-green-500  font-semibold'}`}>{messageStatus}</p>}

      </div>

    </div>
  );

}
export default WhatsAppChat;
