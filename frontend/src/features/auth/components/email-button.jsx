import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function EmailButton({ onClick }) {
  return (
    <div className="tw-flex tw-justify-center">
      <button onClick={onClick} className="tw-border tw-border-gray-300 tw-rounded-lg tw-py-2 tw-px-4 tw-shadow-md hover:tw-bg-gray-100 focus:tw-outline-none w-75">
        <FontAwesomeIcon icon={faEnvelope} className="tw-w-5 tw-h-5 tw-float-left" />
        <span className="tw-text-gray-700 tw-font-medium">
          Email, username, or mobile
        </span>
      </button>
    </div>
  );
}

export default EmailButton;
