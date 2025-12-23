let csrfToken: string | null = null;

export async function fetchCsrfToken(): Promise<string | null> {
  try {
    const response = await fetch('/api/auth/csrf-token', {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      csrfToken = data.csrfToken;
      return csrfToken;
    }
  } catch (e) {
    console.error('Failed to fetch CSRF token:', e);
  }
  return null;
}

export function getCsrfToken(): string | null {
  return csrfToken;
}

export function clearCsrfToken(): void {
  csrfToken = null;
}

export async function ensureCsrfToken(): Promise<string | null> {
  if (!csrfToken) {
    return fetchCsrfToken();
  }
  return csrfToken;
}
