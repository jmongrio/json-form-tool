import { useState, useRef } from "react"
import JsonInput from "./components/JsonInput"
import DynamicForm from "./components/DynamicForm"
import OutputPanel from "./components/OutputPanel"
import type { JsonObject } from "./types/jsonTypes"

export default function App() {
  const [jsonModel, setJsonModel] = useState<JsonObject | null>(null)
  const [formData, setFormData] = useState<JsonObject>({})

  const outputRef = useRef<HTMLDivElement | null>(null)

  function scrollToOutput() {
    outputRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="container app-container py-4 position-relative">

      <div className="mb-4">
        <h2 className="fw-semibold mb-1 link-accent">JSON → Dynamic Form</h2>

        <p className="text-secondary small mb-1">
          Helper tool for backend testing & Postman flows
        </p>

        <p className="text-secondary small">
          Powered by{" "}
          <a
            href="https://web.jmongrio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            jmongrio
          </a>
        </p>
      </div>

      <div className="card section-card p-4 mb-4">
        <JsonInput
          setJsonModel={setJsonModel}
          setFormData={setFormData}
        />
      </div>

      {jsonModel && (
        <>
          <div className="row g-4">

            <div className="col-lg-6">
              <div className="card section-card p-4 h-100">
                <h5 className="mb-3 fw-semibold">Generated Form</h5>

                <DynamicForm
                  model={jsonModel}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="card section-card p-4 h-100"
                ref={outputRef}
              >
                <h5 className="mb-3 fw-semibold">Output JSON</h5>

                <OutputPanel data={formData} />
              </div>
            </div>

          </div>

          <button
            className="floating-btn"
            onClick={scrollToOutput}
          >
            Go to Output
          </button>
        </>
      )}
    </div>
  )
}