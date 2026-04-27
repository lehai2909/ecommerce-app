import { fetchAuthSession } from 'aws-amplify/auth';

export async function authenticatedFetch(url, options = {}) {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    const headers = {
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.error('Unauthorized access');
        // Handle redirect to login if necessary
      }
    }

    return response;
  } catch (err) {
    console.error('Error in authenticatedFetch:', err);
    throw err;
  }
}
