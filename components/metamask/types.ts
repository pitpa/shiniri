interface Network {
  chainId: string;
  rpcUrls: string[];
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number
  },
  blockExplorerUrls: string[]
}

interface TokenInfo {
  type: string;
  options: {
    address: string;
    symbol: string;
    decimals: number;
    image: string;
  }
}

export type { Network, TokenInfo }