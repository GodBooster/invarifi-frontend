import { type WalletClient } from 'wagmi';

import { BACKEND_API_URL } from '@/constants/backend_api';
import { signAuthMessage } from '@/lib/sign-auth-message';

const HIDDEN_VAULTS_URL = BACKEND_API_URL + '/api/hide-vaults';

export const addHiddenVault = async (
  id: string,
  walletClient: WalletClient,
): Promise<Response | null> => {
  try {
    // Get account address for logging
    const accounts = await walletClient.getAddresses();
    const address = accounts[0];
    console.log('[Hide Vault] Account address:', address);
    
    const token = await signAuthMessage(walletClient);
    
    if (!token) {
      console.error('[Hide Vault] Failed to generate auth token');
      return null;
    }

    console.log('[Hide Vault] Token generated, length:', token.length);
    console.log('[Hide Vault] Token preview:', token.substring(0, 50) + '...');
    console.log('[Hide Vault] Request URL:', HIDDEN_VAULTS_URL);
    console.log('[Hide Vault] Request body:', { id });

    const response = await fetch(HIDDEN_VAULTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-cache',
      body: JSON.stringify({ id }),
    });

    console.log('[Hide Vault] Response status:', response.status);
    console.log('[Hide Vault] Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Hide Vault] Error response:', response.status, errorText);
      
      // Try to parse as JSON for better error message
      try {
        const errorJson = JSON.parse(errorText);
        console.error('[Hide Vault] Error details:', errorJson);
      } catch {
        // Not JSON, use text as is
      }
    }

    return response;
  } catch (error) {
    console.error('[Hide Vault] Exception:', error);
    return null;
  }
};
