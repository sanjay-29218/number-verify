import React, { useState, useRef } from "react";
import "./input.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const Input: React.FC = () => {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]); // Initialize state with 6 empty strings
  const inputRefs = useRef<HTMLInputElement[]>([]);
  // const navigate = useNavigate();

  // Focus on next input or submit if all digits are entered
  const handleInputChange = (index: number, value: string) => {
    const newDigits = [...digits];

    if (isNaN(parseInt(value))) {
      return;
    }
    newDigits[index] = value;
    inputRefs.current[index].style.border = "1px solid #333";

    if (index > digits.length - 1) {
      return;
    }

    if (value && index < digits.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    setDigits(newDigits);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // If backspace is pressed and the current input field is empty, delete the digit and focus on the previous input field
    if (event.key === "Backspace" && index > 0 && digits[index] === "") {
      const newDigits = [...digits];

      newDigits[index - 1] = "";
      setDigits(newDigits);
      inputRefs.current[index - 1].focus();
    } else if (
      event.key === "Backspace" &&
      index >= 0 &&
      digits[index] !== ""
    ) {
      event.preventDefault();
      event.stopPropagation();

      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      event.stopPropagation();
      inputRefs.current[index - 1].focus();
    } else if (event.key === "ArrowRight" && index < digits.length - 1) {
      event.preventDefault();
      event.stopPropagation();
      inputRefs.current[index + 1].focus();
    } else {
      return;
    }
  };

  // Handle paste event
  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain");
    const newDigits = [...digits];
    const pasteDigits = pasteData.replace(/\D/g, "").split("");
    let currentIndex = index;
    pasteDigits.forEach((digit, index) => {
      if (currentIndex < digits.length) {
        newDigits[currentIndex] = digit;
        currentIndex++;
      }
      if (digit && index < digits.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    });

    setDigits(newDigits);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const code = digits.join("");

    digits.forEach((digit, i) => {
      if (digit === "") {
        inputRefs.current[i].style.border = "1px solid red";
      }
    });

    const isValid = digits.every((digit) => digit !== "");
    if (isValid) {
      try {
        const response = await fetch("http://localhost:3000/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error("Verification Error");
        }
        window.location.href = "/success";
        // navigate("/success");
      } catch (error) {
        console.error(error);
        alert("Verification Error");
      }
    }
  };

  return (
    <div className="mobile-verification-input">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <div>
          {digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onPaste={(e) => handlePaste(e, index)}
              ref={(ref) =>
                (inputRefs.current[index] = ref as HTMLInputElement)
              }
              autoFocus={index === 0} // Autofocus on the first input field
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <button
          style={{
            width: "200px",
            padding: "10px",
            fontSize: "24px",
            backgroundColor: "blue",
            color: "white",
            borderRadius: "5px",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
