export function image2base64(file, callback) {
  if (!/image\/(png|jpg|jpeg|gif)/.test(file.type)) throw ("Not Vaid Image");
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    callback(reader.result);
  };
}

export function b64toBlob(dataURI, type) {
  let byteString = atob(dataURI.split(',').pop());
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type });
}

// Detecting data URLs
export function isDataURL(string) {
  let regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
  return !!string.match(regex);
}

