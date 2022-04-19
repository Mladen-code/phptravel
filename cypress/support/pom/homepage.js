const HomepageSearchForm = {
    hotelsTab: '[data-bs-target="#hotels"]',
    flightsTab: '[data-bs-target="#flights"]',
    toursTab: '[data-bs-target="#tours"]',
    visaTab: '[data-bs-target="#visa"]'
}

const VisaRequestForm = {
    fromCountrySelectlist: '#from_country',
    toCountrySelectlist: '#to_country',
    visaSubmitButton: '#visa-submit #submit',
}

const VisaSubmissionForm = {
    firstName: '[name="first_name"]',
    lastName: '[name="last_name"]',
    email: '[name="email"]',
    phone: '[name="phone"]',
    notes: '[name="notes"]',
    visaSubmitButton: '#submit',
    visaTitle: 'h3.title',
    visaConfirmationMessage: 'h2'
}

export { HomepageSearchForm, VisaRequestForm, VisaSubmissionForm }