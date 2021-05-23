const processIndividualImage = (data) => {
    console.log(data);
    const buffer = data;
    const bytes = new Uint8Array(buffer);
    let binary = '';
    
    bytes.forEach((byte) => binary += String.fromCharCode(byte));
    
    return btoa(binary);
}

export { processIndividualImage as default }