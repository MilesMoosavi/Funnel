/**
 * iMessage-style typing indicator with three animated dots inside a bubble shape.
 * Uses CSS keyframes (not Framer Motion) for the dot pulse animation
 * to keep it lightweight and always running.
 */
export function TypingIndicator() {
  return (
    <div className="flex items-center justify-center">
      <svg
        id="typing_bubble"
        xmlns="http://www.w3.org/2000/svg"
        width="66"
        height="36"
        viewBox="0 0 120 66"
        className="overflow-visible"
      >
        <defs>
          <style>{`
            .bubble-path {
              fill: #3A3A3C;
              fill-rule: evenodd;
            }

            .typing-dot {
              fill: rgba(255, 255, 255, 0.4);
              transform-origin: 50% 50%;
              animation: ball-beat 1.1s infinite cubic-bezier(0.445, 0.050, 0.550, 0.950);
            }

            .typing-dot:nth-child(2) {
              animation-delay: 0.3s !important;
            }

            .typing-dot:nth-child(3) {
              animation-delay: 0.6s !important;
            }

            @keyframes ball-beat {
              0% { opacity: 0.7; }
              33.33% { opacity: 0.55; }
              66.67% { opacity: 0.4; }
              100% { opacity: 1; }
            }
          `}</style>
        </defs>
        <g id="bubble">
          <path
            className="bubble-path"
            d="M152,166H108a29.848,29.848,0,0,1-16.03-4.647,10.993,10.993,0,1,1-12.7-16.692A30.008,30.008,0,0,1,108,106h44A30,30,0,0,1,152,166Zm-85,6a5,5,0,1,1,5-5A5,5,0,0,1,67,172Z"
            transform="translate(-62 -106)"
            fill="#3A3A3C"
          />
        </g>
        <g>
          <circle className="typing-dot" cx="46" cy="30" r="8" />
          <circle className="typing-dot" cx="68" cy="30" r="8" />
          <circle className="typing-dot" cx="90" cy="30" r="8" />
        </g>
      </svg>
    </div>
  );
}
