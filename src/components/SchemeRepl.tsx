import { useEffect, useRef, useState } from 'react';

let biwaReady: Promise<any> | null = null;

function getBiwa(): Promise<any> {
  if (!biwaReady) {
    biwaReady = new Promise((resolve, reject) => {
      if ((window as any).BiwaScheme) {
        resolve((window as any).BiwaScheme);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/biwascheme@0.8.3/release/biwascheme-min.js';
      script.onload = () => resolve((window as any).BiwaScheme);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return biwaReady;
}

export default function SchemeRepl({ initialCode }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode || '');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);
  const biwaRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getBiwa().then(bw => {
      biwaRef.current = bw;
      setReady(true);
    });
  }, []);

  async function run() {
    const BiwaScheme = biwaRef.current;
    if (!BiwaScheme) return;
    setRunning(true);
    setOutput('');
    try {
      let out = '';
      const interp = new BiwaScheme.Interpreter((msg: string) => {
        out += msg;
      });
      const result = await new Promise<any>((resolve, reject) => {
        interp.evaluate(code, (res: any) => resolve(res), (err: any) => reject(err));
      });
      const resultStr = result !== undefined && result !== BiwaScheme.undef
        ? BiwaScheme.to_write(result)
        : '';
      setOutput(out + (resultStr ? (out ? '\n' : '') + '=> ' + resultStr : '') || '(no output)');
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
        const newCode = code.substring(0, start) + '  ' + code.substring(end);
        setCode(newCode);
        setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 2; }, 0);
      }
    }
  }

  return (
    <div className="border border-zinc-700 rounded-lg overflow-hidden my-4">
      <div className="flex items-center justify-between px-3 py-1">
        <span className="text-xs text-gray-500 font-mono">Scheme</span>
        <button
          onClick={run}
          disabled={!ready || running}
          className="px-2 py-0.5 border border-blue-700 text-blue-400 bg-transparent hover:bg-blue-900/30 disabled:border-zinc-600 disabled:text-zinc-500 rounded text-xs font-mono transition-colors"
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
        className="w-full bg-zinc-900 text-blue-300 font-mono text-sm p-4 resize-y outline-none border-none"
        style={{ minHeight: '120px', tabSize: 2 }}
      />
      {output && (
        <pre className="p-4 border-t border-zinc-700 text-gray-300 text-sm font-mono whitespace-pre-wrap overflow-auto" style={{ maxHeight: '300px' }}>
          {output}
        </pre>
      )}
    </div>
  );
}
