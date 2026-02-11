import FieldRenderer from "./FieldRenderer"
import { detectType } from "../utils/typeDetector"
import type { JsonObject, JsonValue } from "../types/jsonTypes"

interface Props {
  label: string
  path: string
  value: JsonValue[]
  updateField: (path: string, value: any) => void
}

export default function ArrayField({
  label,
  path,
  value,
  updateField
}: Props) {

  function handleAdd() {
    let newItem: JsonValue = ""

    if (value.length > 0) {
      const first = value[0]
      const type = detectType(first)

      if (type === "number") newItem = 0
      else if (type === "boolean") newItem = false
      else if (type === "object") newItem = structuredClone(first)
      else newItem = ""
    }

    updateField(path, [...value, newItem])
  }

  function handleRemove(index: number) {
    const updated = value.filter((_, i) => i !== index)
    updateField(path, updated)
  }

  return (
    <div className="array-group">

      {/* ===== Header ===== */}
      <div className="array-header">
        <div>
          <span className="array-label">
            {label}
          </span>
          <span className="array-meta">
            {value.length} items
          </span>
        </div>

        <button
          type="button"
          className="btn btn-sm btn-outline-accent"
          onClick={handleAdd}
        >
          + Add
        </button>
      </div>

      {/* ===== Items ===== */}
      <div className="array-items">
        {value.map((item, index) => {
          const itemPath = `${path}.${index}`
          const type = detectType(item)

          return (
            <div key={index} className="array-item">

              <div className="array-item-header">
                <span className="array-index">
                  [{index}]
                </span>

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>

              <div className="array-item-content">
                {type === "object" && item !== null ? (
                  Object.keys(item as JsonObject).map(key => (
                    <FieldRenderer
                      key={key}
                      label={key}
                      path={`${itemPath}.${key}`}
                      value={(item as JsonObject)[key]}
                      updateField={updateField}
                    />
                  ))
                ) : (
                  <FieldRenderer
                    label={`item`}
                    path={itemPath}
                    value={item}
                    updateField={updateField}
                  />
                )}
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}