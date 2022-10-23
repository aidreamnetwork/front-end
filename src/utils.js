export function getIPFSLink(CID){
    let list=["https://ipfs.io/ipfs/","https://gateway.ipfs.io/ipfs/","https://nftstorage.link/ipfs/", "https://cloudflare-ipfs.com/ipfs/"]
    let random = Math.floor(list.length* Math.random())
    console.log(list[random] + CID)
    return list[2] + CID;
}