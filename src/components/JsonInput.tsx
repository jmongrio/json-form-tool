import { useState } from "react"
import Editor from "@monaco-editor/react"
import type { JsonObject } from "../types/jsonTypes"

interface Props {
  setJsonModel: (value: JsonObject) => void
  setFormData: (value: JsonObject) => void
}

export default function JsonInput({
  setJsonModel,
  setFormData
}: Props) {

  const [value, setValue] = useState(`{
  "name": "Jason",
  "age": 32,
  "isActive": true,
  "tags": ["dev"],
  "users": [
    { "name": "John", "age": 30 }
  ]
}`)

  const [error, setError] = useState<string | null>(null)

  function handleFormat() {
    try {
      const parsed = JSON.parse(value)
      const formatted = JSON.stringify(parsed, null, 2)
      setValue(formatted)
      setError(null)
    } catch {
      setError("Invalid JSON format")
    }
  }

  function handleGenerate() {
    try {
      const parsed = JSON.parse(value) as JsonObject
      setJsonModel(parsed)
      setFormData(parsed)
      setError(null)
    } catch {
      setError("Invalid JSON. Please fix errors.")
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">

        <span className="text-secondary small">
          Paste your JSON model
        </span>

        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-accent"
            onClick={handleFormat}
          >
            Format
          </button>

          <button
            className="btn btn-sm btn-accent"
            onClick={handleGenerate}
          >
            Generate Form
          </button>
        </div>
      </div>

      <div className="editor-container">
        <Editor
          theme="vs-dark"
          height="300px"
          defaultLanguage="json"
          value={value}
          onChange={(v) => setValue(v || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "JetBrains Mono",
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            tabSize: 2
          }}
        />
      </div>

      {error && (
        <div className="error-message mt-3">
          {error}
        </div>
      )}
    </>
  )
}