import React from 'react'

export function DetailsForm() {
  return (
    <form className="info-form" onSubmit={(e) => e.preventDefault()}>
      <label className="form-field">
        <span>Name</span>
        <input
          type="text"
          placeholder="Enter your name"
          data-testid="name-input"
          required
        />
      </label>
      <label className="form-field">
        <span>Age</span>
        <input
          type="number"
          min="1"
          placeholder="Enter your age"
          data-testid="age-input"
          required
        />
      </label>
      <label className="form-field">
        <span>Location</span>
        <select defaultValue="" required data-testid="location-select">
          <option value="" disabled>
            Select a city
          </option>
          <option>Chennai</option>
          <option>Mumbai</option>
          <option>Kolkata</option>
          <option>Coimbatore</option>
          <option>Delhi</option>
          <option>Pune</option>
          <option>Gurgaon</option>
          <option>Hyderabad</option>
          <option>Bengaluru</option>
          <option>Others</option>
        </select>
      </label>
      <button type="submit" className="btn-primary" data-testid="submit-btn">
        Submit
      </button>
    </form>
  )
}
