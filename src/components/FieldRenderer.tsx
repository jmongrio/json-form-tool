import { detectType } from "../utils/typeDetector"

interface Props {
  label: string
  path: string
  value: any
  updateField: (path: string, value: any) => void
}

export default function FieldRenderer({
  label,
  path,
  value,
  updateField
}: Props) {

  const type = detectType(value)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    let val: any

    if (type === "boolean") {
      val = e.target.checked
    } else if (type === "number") {
      val = e.target.value === "" ? null : Number(e.target.value)
    } else {
      val = e.target.value
    }

    updateField(path, val)
  }

  return (
    <div className="field-wrapper">

      {/* Header */}
      <div className="field-header">
        <label className="field-label">
          {label}
        </label>

        <span className="field-path">
          {path}
        </span>
      </div>

      {/* Control */}
      {type === "boolean" ? (
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={value ?? false}
            onChange={handleChange}
          />
          <span className="slider" />
        </label>
      ) : (
        <input
          type={type === "date" ? "date" : type}
          className="tech-input"
          value={value ?? ""}
          onChange={handleChange}
        />
      )}

    </div>
  )
}