import { useState, useEffect } from 'react';
import React from 'react';

// Definindo a interface para os documentos
interface Document {
  id: number; // ou string, dependendo do tipo de id que você usa no backend
  filename: string;
}

export default function Home() {
  // Tipando o estado 'file' como File ou null
  const [file, setFile] = useState<File | null>(null);

  // Tipando o estado 'documents' como um array de Document
  const [documents, setDocuments] = useState<Document[]>([]);

  // Tipando o estado 'selectedDoc' como number (id do documento) ou null
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null);

  // Tipando os estados para question e answer como string
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/documents')
      .then(res => res.json())
      .then(data => setDocuments(data));
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await fetch('http://localhost:3000/upload', { method: 'POST', body: formData });
  };

  const handleAsk = async () => {
    if (!selectedDoc || !question) return;
    const res = await fetch(`http://localhost:3000/upload/${selectedDoc}/ask`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
      <h2>Uploaded Documents</h2>
      <ul>
        {documents.map(doc => (
          <li key={doc.id} onClick={() => setSelectedDoc(doc.id)}>{doc.filename}</li>
        ))}
      </ul>
      {selectedDoc && (
        <div>
          <input type="text" placeholder="Ask a question..." value={question} onChange={(e) => setQuestion(e.target.value)} />
          <button onClick={handleAsk}>Ask</button>
          <p>Answer: {answer}</p>
        </div>
      )}
    </div>
  );
}
