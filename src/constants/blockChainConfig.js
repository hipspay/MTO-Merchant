import { networkType } from './networkType';

export const blockChainConfig = [
    {
        name: 'Etherium',
        key: 'etherium',
        networkIdTestNet: networkType === 'testnet' ? '3' : '3',
        networkIdMainNet: networkType === 'testnet' ? '3' : '3',
        providerUrl:
            networkType === 'testnet'
                ? 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
                : 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        providerUrlForMainnet:
            'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    },
];
