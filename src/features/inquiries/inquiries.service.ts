import {
  ContactSubmissionInputDTO,
  ContactSubmissionResponseDTO,
} from './dtos/inquiriesInputDTO';

export async function submitContact(
  data: ContactSubmissionInputDTO
): Promise<ContactSubmissionResponseDTO> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errorMsg = 'Failed to submit message';
    try {
      const err = await res.json();
      if (err.message) errorMsg = err.message;
    } catch {}
    throw new Error(errorMsg);
  }

  return res.json();
}
