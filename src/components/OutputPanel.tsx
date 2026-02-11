import { useState, useMemo } from "react"
import type { JsonObject } from "../types/jsonTypes"

interface Props {
  data: JsonObject
}

export default function OutputPanel({ data }: Props) {

  const [copied, setCopied] = useState(false)

  const formattedJson = useMemo(
    () => JSON.stringify(data, null, 2),
    [data]
  )

  const lineCount = useMemo(
    () => formattedJson.split("\n").length,
    [formattedJson]
  )

  const charCount = useMemo(
    () => formattedJson.length,
    [formattedJson]
  )

  async function copy() {
    await navigator.clipboard.writeText(formattedJson)
    setCopied(true)

    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">

        <div className="text-secondary small">
          {lineCount} lines • {charCount} chars
        </div>

        <button
          className="btn btn-sm btn-accent"
          onClick={copy}
        >
          {copied ? "Copied ✓" : "Copy JSON"}
        </button>
      </div>

      <div className="code-output">
        <pre>
          {formattedJson}
        </pre>
      </div>
    </>
  )
}