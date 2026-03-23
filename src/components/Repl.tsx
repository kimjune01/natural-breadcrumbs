import { useEffect, useRef, useState } from 'react';

// Shared Pyodide instance across all Repl components on the page
let pyodidePromise: Promise<any> | null = null;

function getPyodide(): Promise<any> {
  if (!pyodidePromise) {
    pyodidePromise = new Promise((resolve, reject) => {
      if ((window as any).loadPyodide) {
        (window as any).loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/' })
          .then(resolve).catch(reject);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
      script.onload = () => {
        (window as any).loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/' })
          .then(resolve).catch(reject);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return pyodidePromise;
}

export default function Repl({ initialCode }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);
  const pyRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getPyodide().then(py => {
      pyRef.current = py;
      setReady(true);
    });
  }, []);

  async function run() {
    const pyodide = pyRef.current;
    if (!pyodide) return;
    setRunning(true);
    setOutput('');
    try {
      pyodide.runPython(`
import sys, io, random, time
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
random.seed(int(time.time() * 1000) % 2**32)
`);
      await pyodide.runPythonAsync(code);
      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      const stderr = pyodide.runPython('sys.stderr.getvalue()');
      setOutput((stdout || '') + (stderr ? `\n⚠ ${stderr}` : '') || '(no output)');
    } catch (e: any) {
      setOutput(`Error: ${e.message || e}`);
    }
    setRunning(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      run();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = textareaRef.current;
      if (ta) {
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newCode = code.substring(0, start) + '    ' + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          ta.selectionStart = ta.selectionEnd = start + 4;
        }, 0);
      }
    }
  }

  return (
    <div className="border border-zinc-700 rounded-lg overflow-hidden my-4">
      <div className="flex items-center justify-between px-3 py-1">
        <span className="text-xs text-gray-500 font-mono">Python</span>
        <button
          onClick={run}
          disabled={!ready || running}
          className="px-2 py-0.5 border border-green-700 text-green-400 bg-transparent hover:bg-green-900/30 disabled:border-zinc-600 disabled:text-zinc-500 rounded text-xs font-mono transition-colors"
        >
          {!ready ? '○' : running ? '···' : '▶'}
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={e => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="w-full bg-zinc-900 text-green-300 font-mono text-sm p-4 resize-none outline-none border-none overflow-hidden"
        style={{ tabSize: 4 }}
        rows={code.split('\n').length}
      />
      {output && (
        <pre className="p-4 border-t border-zinc-700 text-gray-300 text-sm font-mono whitespace-pre-wrap overflow-auto" style={{ maxHeight: '300px' }}>
          {output}
        </pre>
      )}
    </div>
  );
}
