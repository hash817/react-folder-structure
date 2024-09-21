import React from "react";

function GoogleLoginButton({ onClick }) {
  return (
    <div className="tw-flex tw-justify-center pb-3">
      <button
        onClick={onClick}
        className="tw-border tw-border-gray-300 tw-rounded-lg tw-py-2 tw-px-4 tw-shadow-md hover:tw-bg-gray-100 focus:tw-outline-none w-75"
      >
        <svg
          className="tw-w-5 tw-h-5 tw-mr-2 tw-float-left"
          viewBox="0 0 533.5 544.3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M533.5 278.4c0-15.6-1.4-30.6-4-45.2H272.1v85.9h147.1c-6.4 34.5-26.6 63.8-54.2 83.5v68.7h87.3c50.9-46.9 80.2-116 80.2-193z"
            fill="#4285F4"
          />
          <path
            d="M272.1 544.3c72.9 0 133.8-24.1 178.4-64.9l-87.3-68.7c-24.2 16.3-54.9 26.1-91.1 26.1-69.9 0-129-47.2-150.1-110.4H32v69.6c44.6 89.6 137 148.3 240.1 148.3z"
            fill="#34A853"
          />
          <path
            d="M122 326.4c-6.7-19.9-10.6-41.2-10.6-63.1s3.9-43.2 10.6-63.1V130.6H32c-20.6 41.3-32.4 87.8-32.4 137.7s11.8 96.4 32.4 137.7l90-69.6z"
            fill="#FBBC05"
          />
          <path
            d="M272.1 108.9c37.1 0 70.5 12.8 96.8 34.4l72.6-72.6C366.1 25.3 312.8 0 272.1 0 169.1 0 76.6 58.7 32 148.3l90 69.6c21.1-63.2 80.2-110.4 150.1-110.4z"
            fill="#EA4335"
          />
        </svg>
        <span className="tw-text-gray-700 tw-font-medium">
          Continue with Google
        </span>
      </button>
    </div>
  );
}

export default GoogleLoginButton;
