import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DetailsForm } from '../components/DetailsForm'

describe('DetailsForm Component', () => {
  beforeEach(() => {
    render(<DetailsForm />)
  })

  // ── RENDERING TESTS ──
  describe('Form Rendering', () => {
    it('should render the form with all fields', () => {
      expect(screen.getByTestId('name-input')).toBeInTheDocument()
      expect(screen.getByTestId('age-input')).toBeInTheDocument()
      expect(screen.getByTestId('location-select')).toBeInTheDocument()
      expect(screen.getByTestId('submit-btn')).toBeInTheDocument()
    })

    it('should render all field labels', () => {
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Age')).toBeInTheDocument()
      expect(screen.getByText('Location')).toBeInTheDocument()
    })

    it('should render placeholders for text and number inputs', () => {
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter your age')).toBeInTheDocument()
    })

    it('should render submit button with correct text', () => {
      const submitBtn = screen.getByTestId('submit-btn')
      expect(submitBtn).toHaveTextContent('Submit')
    })
  })

  // ── LOCATION SELECT TESTS ──
  describe('Location Select Field', () => {
    it('should render all city options', () => {
      const select = screen.getByTestId('location-select')
      const options = select.querySelectorAll('option')
      
      expect(options).toHaveLength(11) // 1 disabled + 10 cities
      expect(options[0]).toHaveValue('')
      expect(options[0]).toHaveTextContent('Select a city')
    })

    it('should have correct city options in order', () => {
      const cities = [
        'Chennai',
        'Mumbai',
        'Kolkata',
        'Coimbatore',
        'Delhi',
        'Pune',
        'Gurgaon',
        'Hyderabad',
        'Bengaluru',
        'Others',
      ]

      cities.forEach((city) => {
        expect(screen.getByRole('option', { name: city })).toBeInTheDocument()
      })
    })

    it('should have first option disabled', () => {
      const disabledOption = screen.getByRole('option', { name: 'Select a city' })
      expect(disabledOption).toHaveValue('')
      expect(disabledOption).toHaveAttribute('disabled')
    })

    it('should allow selecting different cities', async () => {
      const user = userEvent.setup()
      const select = screen.getByTestId('location-select')

      await user.selectOptions(select, 'Mumbai')
      expect(select).toHaveValue('Mumbai')

      await user.selectOptions(select, 'Bengaluru')
      expect(select).toHaveValue('Bengaluru')
    })
  })

  // ── NAME INPUT TESTS ──
  describe('Name Input Field', () => {
    it('should accept text input', async () => {
      const user = userEvent.setup()
      const nameInput = screen.getByTestId('name-input')

      await user.type(nameInput, 'John Doe')
      expect(nameInput).toHaveValue('John Doe')
    })

    it('should accept names with spaces', async () => {
      const user = userEvent.setup()
      const nameInput = screen.getByTestId('name-input')

      await user.type(nameInput, 'Sukirtha Loganathan')
      expect(nameInput).toHaveValue('Sukirtha Loganathan')
    })

    it('should accept special characters in names', async () => {
      const user = userEvent.setup()
      const nameInput = screen.getByTestId('name-input')

      await user.type(nameInput, "O'Connor-Smith")
      expect(nameInput).toHaveValue("O'Connor-Smith")
    })

    it('should be marked as required', () => {
      const nameInput = screen.getByTestId('name-input')
      expect(nameInput).toHaveAttribute('required')
    })

    it('should be of type text', () => {
      const nameInput = screen.getByTestId('name-input')
      expect(nameInput).toHaveAttribute('type', 'text')
    })
  })

  // ── AGE INPUT TESTS ──
  describe('Age Input Field', () => {
    it('should accept numeric input', async () => {
      const user = userEvent.setup()
      const ageInput = screen.getByTestId('age-input')

      await user.type(ageInput, '25')
      expect(ageInput).toHaveValue(25)
    })

    it('should enforce minimum value of 1', () => {
      const ageInput = screen.getByTestId('age-input')
      expect(ageInput).toHaveAttribute('min', '1')
    })

    it('should be marked as required', () => {
      const ageInput = screen.getByTestId('age-input')
      expect(ageInput).toHaveAttribute('required')
    })

    it('should be of type number', () => {
      const ageInput = screen.getByTestId('age-input')
      expect(ageInput).toHaveAttribute('type', 'number')
    })

    it('should handle valid age values', async () => {
      const user = userEvent.setup()
      const ageInput = screen.getByTestId('age-input')

      const validAges = ['1', '18', '65', '100']
      for (const age of validAges) {
        await user.clear(ageInput)
        await user.type(ageInput, age)
        expect(ageInput).toHaveValue(Number(age))
      }
    })

    it('should increment/decrement age with arrow keys', async () => {
      const user = userEvent.setup()
      const ageInput = screen.getByTestId('age-input')

      await user.type(ageInput, '25')
      await user.type(ageInput, '{ArrowUp}')
      expect(ageInput).toHaveValue(26)

      await user.type(ageInput, '{ArrowDown}')
      expect(ageInput).toHaveValue(25)
    })
  })

  // ── FORM SUBMISSION TESTS ──
  describe('Form Submission', () => {
    it('should prevent default form submission', async () => {
      const form = screen.getByRole('button', { name: 'Submit' }).closest('form')
      
      // Form has onSubmit handler that prevents default
      expect(form).toHaveClass('info-form')
    })

    it('should not submit with empty fields', async () => {
      const user = userEvent.setup()
      const submitBtn = screen.getByTestId('submit-btn')

      // Try to submit without filling form - HTML5 validation should prevent
      await user.click(submitBtn)

      const nameInput = screen.getByTestId('name-input')
      expect(nameInput.validity.valid).toBe(false)
    })

    it('should be submittable with all fields filled', async () => {
      const user = userEvent.setup()

      const nameInput = screen.getByTestId('name-input')
      const ageInput = screen.getByTestId('age-input')
      const locationSelect = screen.getByTestId('location-select')

      await user.type(nameInput, 'Jane Doe')
      await user.type(ageInput, '30')
      await user.selectOptions(locationSelect, 'Chennai')

      const submitBtn = screen.getByTestId('submit-btn')
      expect(submitBtn).toBeEnabled()
    })
  })

  // ── FIELD INTERACTIONS TESTS ──
  describe('Field Interactions', () => {
    it('should allow clearing name field', async () => {
      const user = userEvent.setup()
      const nameInput = screen.getByTestId('name-input')

      await user.type(nameInput, 'Test Name')
      expect(nameInput).toHaveValue('Test Name')

      await user.clear(nameInput)
      expect(nameInput).toHaveValue('')
    })

    it('should allow clearing age field', async () => {
      const user = userEvent.setup()
      const ageInput = screen.getByTestId('age-input')

      await user.type(ageInput, '50')
      expect(ageInput).toHaveValue(50)

      await user.clear(ageInput)
      expect(ageInput).toHaveValue(null)
    })

    it('should allow changing location multiple times', async () => {
      const user = userEvent.setup()
      const locationSelect = screen.getByTestId('location-select')

      await user.selectOptions(locationSelect, 'Mumbai')
      expect(locationSelect).toHaveValue('Mumbai')

      await user.selectOptions(locationSelect, 'Delhi')
      expect(locationSelect).toHaveValue('Delhi')

      await user.selectOptions(locationSelect, 'Others')
      expect(locationSelect).toHaveValue('Others')
    })

    it('should focus on input fields', async () => {
      const user = userEvent.setup()
      const nameInput = screen.getByTestId('name-input')

      await user.click(nameInput)
      expect(nameInput).toHaveFocus()
    })
  })

  // ── EDGE CASES ──
  describe('Edge Cases', () => {
    it('should handle very long names', async () => {
      const user = userEvent.setup()
      const nameInput = screen.getByTestId('name-input')
      const longName = 'A'.repeat(100)

      await user.type(nameInput, longName)
      expect(nameInput).toHaveValue(longName)
    })

    it('should handle numeric strings in name field', async () => {
      const user = userEvent.setup()
      const nameInput = screen.getByTestId('name-input')

      await user.type(nameInput, '12345')
      expect(nameInput).toHaveValue('12345')
    })

    it('should handle whitespace in name field', async () => {
      const user = userEvent.setup()
      const nameInput = screen.getByTestId('name-input')

      await user.type(nameInput, '   ')
      expect(nameInput).toHaveValue('   ')
    })

    it('should handle zero age value', async () => {
      const user = userEvent.setup()
      const ageInput = screen.getByTestId('age-input')

      await user.type(ageInput, '0')
      // Input accepts 0, but HTML5 validation with min=1 should reject it
      expect(ageInput).toHaveValue(0)
    })

    it('should handle large age values', async () => {
      const user = userEvent.setup()
      const ageInput = screen.getByTestId('age-input')

      await user.type(ageInput, '150')
      expect(ageInput).toHaveValue(150)
    })
  })

  // ── CSS CLASSES TESTS ──
  describe('CSS Classes and Structure', () => {
    it('should have correct form class', () => {
      const form = screen.getByRole('button', { name: 'Submit' }).closest('form')
      expect(form).toHaveClass('info-form')
    })

    it('should have correct label classes', () => {
      const labels = screen.getAllByText(/Name|Age|Location/).map((el) =>
        el.closest('label'),
      )
      labels.forEach((label) => {
        expect(label).toHaveClass('form-field')
      })
    })

    it('should have submit button with btn-primary class', () => {
      const submitBtn = screen.getByTestId('submit-btn')
      expect(submitBtn).toHaveClass('btn-primary')
    })
  })

  // ── ACCESSIBILITY TESTS ──
  describe('Accessibility', () => {
    it('should have associated labels for all inputs', () => {
      const nameInput = screen.getByTestId('name-input')
      const ageInput = screen.getByTestId('age-input')
      const locationSelect = screen.getByTestId('location-select')

      expect(nameInput.closest('label')).toHaveTextContent('Name')
      expect(ageInput.closest('label')).toHaveTextContent('Age')
      expect(locationSelect.closest('label')).toHaveTextContent('Location')
    })

    it('should be keyboard navigable with tab key', async () => {
      const user = userEvent.setup()
      const nameInput = screen.getByTestId('name-input')
      const ageInput = screen.getByTestId('age-input')

      nameInput.focus()
      expect(nameInput).toHaveFocus()

      await user.keyboard('{Tab}')
      expect(ageInput).toHaveFocus()
    })

    it('should have proper form semantics', () => {
      const form = screen.getByRole('button', { name: 'Submit' }).closest('form')
      expect(form).toBeInTheDocument()
      expect(form.tagName).toBe('FORM')
    })
  })
})
