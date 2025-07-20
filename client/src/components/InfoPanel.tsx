const InfoPanel = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Welcome to our Dental Clinic!
      </h2>
      <p className="text-gray-600 mb-4">
        Our team of experienced professionals is dedicated to providing you
        with the highest quality dental care.
      </p>
      <p className="text-gray-600 mb-4">
        Use this chat to book your next appointment. Just tell us your
        desired date and time, and we'll do our best to accommodate you.
      </p>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Opening Hours
        </h3>
        <ul className="list-disc list-inside text-gray-600 ml-8">
          <li>Mon-Fri: 9:00 AM - 6:00 PM</li>
          <li>Sat: 10:00 AM - 4:00 PM</li>
          <li>Sun: Closed</li>
        </ul>
      </div>
    </div>
  );
};

export default InfoPanel;