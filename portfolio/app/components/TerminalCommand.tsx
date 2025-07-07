"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalCommandProps {
  commands: Array<{
    input: string;
    output: string | string[];
    delay?: number;
  }>;
  autoStart?: boolean;
  className?: string;
}

const TerminalCommand: React.FC<TerminalCommandProps> = ({
  commands,
  autoStart = true,
  className = "",
}) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [currentOutput, setCurrentOutput] = useState<string[]>([]);
  const [isTypingInput, setIsTypingInput] = useState(false);
  const [isShowingOutput, setIsShowingOutput] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [executedCommands, setExecutedCommands] = useState<
    Array<{
      input: string;
      output: string[];
    }>
  >([]);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!autoStart || isComplete || hasStarted) return;

    // Prevent multiple executions
    setHasStarted(true);

    const executeNextCommand = () => {
      if (currentCommandIndex >= commands.length) {
        setIsComplete(true);
        return;
      }

      const command = commands[currentCommandIndex];
      const delay = command.delay || 1000;

      setTimeout(() => {
        // Start typing input
        setIsTypingInput(true);
        let inputIndex = 0;

        const typeInput = () => {
          if (inputIndex <= command.input.length) {
            setCurrentInput(command.input.slice(0, inputIndex));
            inputIndex++;
            setTimeout(typeInput, 80); // Consistent typing speed
          } else {
            setIsTypingInput(false);

            // Wait a moment then show output
            setTimeout(() => {
              const outputArray = Array.isArray(command.output)
                ? command.output
                : [command.output];

              setCurrentOutput(outputArray);
              setIsShowingOutput(true);

              // Add to executed commands
              setExecutedCommands((prev) => [
                ...prev,
                {
                  input: command.input,
                  output: outputArray,
                },
              ]);

              // Move to next command
              setTimeout(() => {
                setCurrentInput("");
                setCurrentOutput([]);
                setIsShowingOutput(false);
                setCurrentCommandIndex((prev) => prev + 1);
              }, 1500);
            }, 800);
          }
        };

        typeInput();
      }, delay);
    };

    executeNextCommand();
  }, [currentCommandIndex, commands, autoStart, isComplete, hasStarted]);

  const restart = () => {
    setCurrentCommandIndex(0);
    setCurrentInput("");
    setCurrentOutput([]);
    setIsTypingInput(false);
    setIsShowingOutput(false);
    setIsComplete(false);
    setExecutedCommands([]);
    setHasStarted(false);
  };

  return (
    <div
      className={`bg-cyber-black/90 backdrop-blur-sm border border-neon-blue/30 rounded-sm p-4 font-tech text-sm ${className}`}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyber-white/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-cyber-white/60 text-xs">
          hunter@cyberterminal:~$
        </div>
        {isComplete && (
          <button
            onClick={restart}
            className="text-neon-blue text-xs hover:text-michigan-maize transition-colors"
          >
            [restart]
          </button>
        )}
      </div>

      {/* Terminal content */}
      <div className="space-y-2 min-h-[120px]">
        {/* Previously executed commands */}
        <AnimatePresence>
          {executedCommands.map((cmd, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <div className="text-michigan-maize">
                <span className="text-neon-blue">❯</span> {cmd.input}
              </div>
              {cmd.output.map((line, lineIndex) => (
                <div key={lineIndex} className="text-cyber-white/80 pl-4">
                  {line}
                </div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current command being typed */}
        <AnimatePresence>
          {(isTypingInput || currentInput) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-michigan-maize"
            >
              <span className="text-neon-blue">❯</span> {currentInput}
              {isTypingInput && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-michigan-maize"
                >
                  ▊
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current output */}
        <AnimatePresence>
          {isShowingOutput && currentOutput.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-1"
            >
              {currentOutput.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-cyber-white/80 pl-4"
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion cursor */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-michigan-maize"
          >
            <span className="text-neon-blue">❯</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-michigan-maize ml-1"
            >
              ▊
            </motion.span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TerminalCommand;
