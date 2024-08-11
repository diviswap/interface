import { ChainId } from '@uniswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.CHILIZM]: '0x0E6a1Df694c4be9BFFC4D76f2B936bB1A1df7fAC'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
