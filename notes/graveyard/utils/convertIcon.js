const convertIcon = (data) => {
    console.log("from convertIcon:", data);
    let icon = data;
    const buffer = data;
    const bytes = new Uint8Array(buffer);
    let binary = '';

    bytes.forEach((byte) => binary += String.fromCharCode(byte));
    icon = (btoa(binary));

    return icon;
}

export { convertIcon as default }