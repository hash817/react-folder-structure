import React from "react";

function AccountText({ className, text, link, onClick }) {
  return (
    <p className={`${className} text-center`}>
      {text}
      <button onClick={onClick} href="#" className="text-muted fw-bold ps-2">
        {link}
      </button>
    </p>
  );
}

export default AccountText;
