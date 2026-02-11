import type { JsonObject } from "../types/jsonTypes"
import ArrayField from "./ArrayField"
import FieldRenderer from "./FieldRenderer"

interface Props {
  model: JsonObject
  formData: JsonObject
  setFormData: (value: JsonObject) => void
}

export default function DynamicForm({
  model,
  formData,
  setFormData
}: Props) {

  function updateField(path: string, value: any) {
    const keys = path.split(".")
    const updated: any = structuredClone(formData)

    let current = updated

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      current = current[key]
    }

    const lastKey = keys[keys.length - 1]

    if (!isNaN(Number(lastKey))) {
      current[Number(lastKey)] = value
    } else {
      current[lastKey] = value
    }

    setFormData(updated)
  }

  function renderFields(obj: JsonObject, parentPath = "", depth = 0) {
    return Object.keys(obj).map(key => {
      const path = parentPath ? `${parentPath}.${key}` : key
      const value = parentPath
        ? parentPath.split(".").reduce((acc: any, curr) => acc[curr], formData)[key]
        : formData[key]

      if (Array.isArray(obj[key])) {
        return (
          <ArrayField
            key={path}
            label={key}
            path={path}
            value={value as any[]}
            updateField={updateField}
          />
        )
      }

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null
      ) {
        return (
          <div
            key={path}
            className={`object-group depth-${depth}`}
          >
            <div className="object-header">
              {key}
            </div>

            <div className="object-content">
              {renderFields(obj[key] as JsonObject, path, depth + 1)}
            </div>
          </div>
        )
      }

      return (
        <FieldRenderer
          key={path}
          label={key}
          path={path}
          value={value}
          updateField={updateField}
        />
      )
    })
  }

  return (
    <form className="dynamic-form">
      {renderFields(model)}
    </form>
  )
}