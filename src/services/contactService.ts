interface ContactFormData {
  name: string;
  email: string;
  project: string;
  message: string;
}

const FORMSPARK_FORM_ID = '1m9zol5tO';
const FORMSPARK_URL = `https://submit-form.com/${FORMSPARK_FORM_ID}`;

export const sendContactForm = async (formData: ContactFormData) => {
  const response = await fetch(FORMSPARK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      project_type: formData.project,
      message: formData.message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Form submission failed: ${response.status}`);
  }

  return { success: true };
};
