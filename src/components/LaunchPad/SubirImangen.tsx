export const subirImagen = async (imagen: File): Promise<string | undefined> => {
  const JWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMWUwMzFhNi1kOTZjLTQ0YTMtOTZiMy1kYzhiNWQ0MTg3YTAiLCJlbWFpbCI6Im1hcmNlcnNzdGxnMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWRhYTRlYzZkNDY4MzE1MTA0N2QiLCJzY29wZWRLZXlTZWNyZXQiOiJhNDUzOGQwNTU4M2UxMGIyYzRmNjdhMWI0YTA5NzUxYmE0MTlhYTBkN2I3ZTgxNWQzZjVmMDRlMGVlOGVkM2Q4IiwiZXhwIjoxNzUyNzYyNDk3fQ.M2mLS-5HgrP_UKDFfJinM8U4scQR7QCWx2zSqvL6NSg'

  try {
    const data = new FormData()

    data.append('file', imagen)

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JWT}`
      },
      body: data
    })

    const resData = await res.json()
    console.log(resData)
    return resData.IpfsHash
  } catch (error) {
    console.log(error)
    return undefined
  }
}
