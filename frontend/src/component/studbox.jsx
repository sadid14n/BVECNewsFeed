import React, { useState } from "react"; // Make sure to import useState
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function StudentBox() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-1/2 mr-6">
      <h3 className="font-semibold text-lg pl-30">Student Box</h3>
      <div className="p-4 bg-gray-100 rounded shadow h-80 flex flex-col justify-between">
        <div>
          <p>This is your main student box content.</p>

          {showMore && (
            <div className="mt-2 text-sm text-gray-700">
              <p>Here's some more information about student activities, achievements, etc.</p>
            </div>
          )}
        </div>

        <p
          className="text-right text-blue-600 cursor-pointer underline"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "More"}
        </p>
      </div>
    </div>
  );
}

export default StudentBox;