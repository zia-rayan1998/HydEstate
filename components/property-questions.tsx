"use client"

interface PropertyQuestionsData {
  [key: string]: string | string[] | boolean
}

interface PropertyQuestionsProps {
  onAnswersChange: (answers: PropertyQuestionsData) => void
}

const PREDEFINED_QUESTIONS = {
  "Property Basics": [
    { id: "title", label: "Property Title", type: "text", required: true },
    { id: "description", label: "Description", type: "textarea", required: true },
    {
      id: "propertyType",
      label: "Property Type",
      type: "select",
      options: ["House", "Apartment", "Villa", "Condo", "Other"],
      required: true,
    },
  ],
  "Location & Details": [
    { id: "address", label: "Full Address", type: "text", required: true },
    { id: "city", label: "City", type: "text", required: true },
    { id: "zipCode", label: "ZIP Code", type: "text", required: true },
    { id: "latitude", label: "Latitude", type: "number", required: false },
    { id: "longitude", label: "Longitude", type: "number", required: false },
  ],
  "Property Features": [
    { id: "bedrooms", label: "Bedrooms", type: "number", required: true },
    { id: "bathrooms", label: "Bathrooms", type: "number", required: true },
    { id: "area", label: "Area (sqft)", type: "number", required: true },
    { id: "yearBuilt", label: "Year Built", type: "number", required: true },
  ],
  "Price & Amenities": [
    { id: "price", label: "Price ($)", type: "number", required: true },
    {
      id: "amenities",
      label: "Amenities",
      type: "checkbox",
      options: ["Pool", "Gym", "Parking", "Garden", "AC", "Furnished"],
      required: false,
    },
  ],
  "Additional Info": [
    { id: "petFriendly", label: "Pet Friendly", type: "toggle", required: false },
    { id: "furnished", label: "Furnished", type: "toggle", required: false },
    {
      id: "condition",
      label: "Condition",
      type: "select",
      options: ["Excellent", "Good", "Fair", "Needs Renovation"],
      required: true,
    },
  ],
}

export function PropertyQuestions({ onAnswersChange }: PropertyQuestionsProps) {
  const handleInputChange = (id: string, value: any) => {
    onAnswersChange({ [id]: value })
  }

  return (
    <div className="space-y-8">
      {Object.entries(PREDEFINED_QUESTIONS).map(([category, questions]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-3">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.map((question) => (
              <div key={question.id} className={question.type === "textarea" ? "md:col-span-2" : ""}>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  {question.label}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {question.type === "text" && (
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    placeholder={`Enter ${question.label.toLowerCase()}`}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                )}

                {question.type === "number" && (
                  <input
                    type="number"
                    onChange={(e) => handleInputChange(question.id, Number.parseFloat(e.target.value))}
                    placeholder={`Enter ${question.label.toLowerCase()}`}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                )}

                {question.type === "textarea" && (
                  <textarea
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    placeholder={`Enter ${question.label.toLowerCase()}`}
                    rows={4}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  />
                )}

                {question.type === "select" && (
                  <select
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="">Select {question.label.toLowerCase()}</option>
                    {question.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {question.type === "checkbox" && (
                  <div className="space-y-2">
                    {question.options?.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={(e) => handleInputChange(`${question.id}.${opt}`, e.target.checked)}
                          className="w-4 h-4 rounded border-border bg-input cursor-pointer"
                        />
                        <span className="text-sm text-foreground">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.type === "toggle" && (
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={(e) => handleInputChange(question.id, e.target.checked)}
                      className="w-5 h-5 rounded border-border bg-input cursor-pointer"
                    />
                    <span className="text-sm text-foreground">{question.label}</span>
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
