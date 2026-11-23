"use client";

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AsciiPortrait from './asciiportrait';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

const TerminalCard = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim().toLowerCase();

    if (!trimmed) return;

    if (trimmed === 'clear' || trimmed === '-clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let output: React.ReactNode;

    if (trimmed === '-help' || trimmed === 'help') {
      output = (
        <ul className="terminal_list">
          <li onClick={() => executeCommand('-sobre-mim')}>-sobre-mim</li>
          <li onClick={() => executeCommand('-projetos')}>-projetos</li>
          <li onClick={() => executeCommand('-contato')}>-contato</li>
          <li onClick={() => executeCommand('-skills')}>-skills</li>
        </ul>
      );
    } 
    
    else if (trimmed === '-projetos' || trimmed === 'projetos') {
      output = (
            <ul className="terminal_list">
              <li onClick={() => executeCommand('-iniative-tracker')} >-iniative-tracker</li>
              <li onClick={() => executeCommand('-caroldle')}>-caroldle</li>
              <li onClick={() => executeCommand('-univava-hackathon')} >-univava-hackathon</li>
              <li onClick={() => executeCommand('-pougos.dev')}>-pougos.dev</li>
              <li onClick={() => executeCommand('-rpg-inventory')} >-rpg-inventory</li>
            </ul>          
      );
            
    }
    else if (
      trimmed === '-sobre-mim' ||
      trimmed === 'sobre-mim' ||
      trimmed === 'sobre mim'
    ) {
      output = (
        <div className="sobre_mim_container">
          <div className="sobre_mim_portrait">
            <AsciiPortrait src="/foto.jpeg" />
          </div>
          <div className="sobre_mim_info">
            <h3 className="sobre_mim_title">Sobre Mim</h3>
            <ul className="sobre_mim_list">
              <li>
                <strong>Nome:</strong> {"<Douglas Moreira de Araújo/>"}
              </li>
              <li>
                <strong>Atuação:</strong> {"<Desenvolvedor Full Stack & Administrador de Sistemas & Entusiasta de Tecnologia/>"}
              </li>
              <li>
                <strong>Formação:</strong> {"<Sistemas de Informação e Técnico em Informática/>"}
              </li>
              <li>
                <strong>Atualmente aprendendo:</strong> {"<Desenvolvimento com Typescript, React e Next.js/>"}
              </li>
              <li>
                <strong>Gosto de:</strong> {"<RPG, E-Sports e Tecnologia/>"}
              </li>
              <li>
                <strong>Objetivo:</strong> {"<Construir e evoluir nessa era de I.A/>"}
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      output = (
        <div className="terminal_error">
          Comando não reconhecido: &quot;{rawCommand.trim()}&quot;. Digite -help para ver as opções.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: rawCommand, output }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <StyledWrapper>
      <div className="container" onClick={() => inputRef.current?.focus()}>
        <div className="terminal_toolbar">
          <div className="butt">
            <button className="btn btn-color" />
            <button className="btn" />
            <button className="btn" />
          </div>
          <p className="user">user@pougos: ~</p>
          <button className="add_tab">+</button>
        </div>
        <div className="terminal_body" ref={bodyRef}>
          {history.map((item, index) => (
            <div key={index} className="terminal_history_item">
              <div className="terminal_promt">
                <span className="terminal_user">user@pougos:</span>
                <span className="terminal_location">~</span>
                <span className="terminal_bling">$</span>
                <span className="terminal_text">{item.command}</span>
              </div>
              <div className="terminal_output">{item.output}</div>
            </div>
          ))}

          <form className="terminal_promt" onSubmit={handleSubmit}>
            <span className="terminal_user">user@pougos:</span>
            <span className="terminal_location">~</span>
            <span className="terminal_bling">$</span>
            <div className="terminal_input_wrapper">
              {input && <span className="terminal_text">{input}</span>}
              <span className="terminal_cursor" />
              {!input && history.length === 0 && (
                <span className="terminal_placeholder">
                  Digite -help para ver as opções
                </span>
              )}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="terminal_input"
                autoFocus
              />
            </div>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    width: 1000px;
    height: 600px;
    background: #1e1e1e;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }

  .terminal_toolbar {
    display: flex;
    height: 35px;
    align-items: center;
    padding: 0 15px;
    background: #2d2d2d;
    justify-content: space-between;
  }

  .butt {
    display: flex;
    align-items: center;
  }

  .btn {
    height: 13px;
    width: 13px;
    border-radius: 50%;
    margin-right: 8px;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .btn:hover {
    transform: scale(1.1);
  }

  .btn-color:nth-child(1) {
    background: #ff5f56;
  }
  .btn-color:nth-child(2) {
    background: #ffbd2e;
  }
  .btn-color:nth-child(3) {
    background: #27c93f;
  }

  .add_tab {
    border: none;
    color: #ffffff;
    background: #3a3a3a;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .add_tab:hover {
    background: #4a4a4a;
  }

  .user {
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
  }

  .terminal_body {
    background: #1e1e1e;
    height: calc(100% - 35px);
    padding: 15px;
    font-family: "Consolas", monospace;
    font-size: 14px;
    line-height: 1.5;
    overflow-y: auto;
  }

  .terminal_promt {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
  }

  .terminal_history_item {
    margin-bottom: 12px;
  }

  .terminal_output {
    color: #e0e0e0;
    padding-left: 10px;
  }

  .terminal_list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .terminal_list li {
    color: #00ff9c;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    width: fit-content;
  }

  .terminal_list li:hover {
    text-decoration: underline;
  }

  .terminal_list li::before {
    content: "›";
    color: #ffffff;
  }

  .sobre_mim_container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 28px;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .sobre_mim_portrait {
    flex-shrink: 0;
    border-radius: 6px;
    overflow: hidden;
  }

  .sobre_mim_info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }

  .sobre_mim_title {
    color: #00ff9c;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    border-bottom: 1px solid rgba(0, 255, 156, 0.3);
    padding-bottom: 4px;
  }

  .sobre_mim_list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: disc;
    margin: 0;
    padding-left: 20px;
    color: #e0e0e0;
  }

  .sobre_mim_list li::marker {
    color: #00ff9c;
  }

  .sobre_mim_list strong {
    color: #00ff9c;
  }

  .terminal_error {
    color: #ff5f56;
  }

  .terminal_promt > span {
    margin-right: 5px;
  }

  .terminal_user {
    color: #00ff9c;
  }
  .terminal_location {
    color: #00ff9c;
  }
  .terminal_bling {
    color: #00ff9c;
  }

  .terminal_input_wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    cursor: text;
  }

  .terminal_text {
    color: #ffffff;
    white-space: pre;
  }

  .terminal_placeholder {
    color: rgba(255, 255, 255, 0.4);
    margin-left: 6px;
    pointer-events: none;
    user-select: none;
  }

  .terminal_input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    border: none;
    outline: none;
    background: transparent;
    color: transparent;
    caret-color: transparent;
    cursor: text;
  }

  .terminal_cursor {
    display: inline-block;
    width: 8px;
    height: 18px;
    background: #ffffff;
    animation: blink 1s step-end infinite;
    flex-shrink: 0;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }`;

export default TerminalCard;
