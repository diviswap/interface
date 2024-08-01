import { useEffect, useState } from 'react'
import { useDomainContract } from './useContract' 
import useDebounce from './useDebounce'

/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */
export default function useENSName(
  account?: string,
  initialENSName = ''
): { ENSName: string | null; loading: boolean } {
  const [ensName, setENSName] = useState<string | null>(initialENSName)
  const [loading, setLoading] = useState(false)

  const debouncedAccount = useDebounce(account, 200)
  const DOMAINS = useDomainContract()

  
  useEffect(() => {
    const fetchENSName = async () => {
      if (debouncedAccount && DOMAINS) {
        setLoading(true)
        try {
          const data = await DOMAINS.getDomainByAddress(debouncedAccount)
          const name = data?.[15] || null 
          setENSName(name)
        } catch (error) {
          console.error('Error fetching ENS name:', error)
          setENSName(null)
        } finally {
          setLoading(false)
        }
      } else {
        setENSName(null)
      }
    }

    fetchENSName()
  }, [debouncedAccount, DOMAINS])

  return {
    ENSName: ensName,
    loading
  }
}
