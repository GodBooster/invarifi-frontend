import { type WalletClient } from 'wagmi';
import Web3Token from 'web3-token';

import { ADMIN_MESSAGE } from '@/constants/admin_message';

// Extract domain from URL (remove https:// or http:// if present)
// Web3Token expects domain format like "example.com", not "https://example.com"
const extractDomain = (urlOrDomain: string): string => {
  try {
    // If it's already a domain without protocol, return as is
    if (!urlOrDomain.includes('://')) {
      return urlOrDomain;
    }
    // Extract domain from URL
    const url = new URL(urlOrDomain);
    return url.hostname;
  } catch {
    // If URL parsing fails, assume it's already a domain and remove protocol if present
    return urlOrDomain.replace(/^https?:\/\//, '');
  }
};

export const signAuthMessage = async (walletClient: WalletClient): Promise<string | null> => {
  try {
    // Get account address for logging
    const accounts = await walletClient.getAddresses();
    const address = accounts[0];
    console.log('[Auth] Signing message for address:', address);
    
    // Web3Token expects domain format like "example.com" (not "https://example.com")
    const domain = extractDomain(ADMIN_MESSAGE.toString());
    console.log('[Auth] Using domain:', domain);
    console.log('[Auth] ADMIN_MESSAGE:', ADMIN_MESSAGE);
    
    const token = await Web3Token.sign(
      async (msg: string) => {
        console.log('[Auth] Signing message:', msg.substring(0, 50) + '...');
        const signature = await walletClient.signMessage({ message: msg });
        console.log('[Auth] Signature received, length:', signature.length);
        return signature;
      },
      {
        domain,
      },
    );

    if (!token) {
      console.error('[Auth] Web3Token.sign returned null or undefined');
      return null;
    }

    console.log('[Auth] Token generated successfully, length:', token.length);
    return token;
  } catch (error) {
    console.error('[Auth] Error signing auth message:', error);
    if (error instanceof Error) {
      console.error('[Auth] Error message:', error.message);
      console.error('[Auth] Error stack:', error.stack);
    }
    return null;
  }
};