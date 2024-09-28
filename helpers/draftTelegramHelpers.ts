// import pako from 'pako'; TODO: Import the Pako library for data compression


// TODO:  The abbreviations are used to reduce the overall size of the data object, which helps in minimizing the final encoded string length.
// interface IEncryptedData {
//   c: TelegramScenario;
//   wt?: string;
//   ea?: string;
//   et?: string;
//   u?: number;
// }

//   const { u, wt, et, ea, c } = data;

//   if (u && ea && et && wt) {
//     return { c, wt, ea, et, u };
//   } else if (!u && wt) {
//     return { c, wt };
//   } else {
//     return { c };
//   }
// };

// const urlEncodedString = encodeURIComponent(encDataString); //FIXME: --- add encodeURIComponent on front and decodeURIComponent on back

//TODO: This function encodes the data object by first converting it to a JSON string without spaces,
// then compressing it using the Pako library with maximum compression level (level 9),
// and finally encoding the compressed data into a Base64 string.

// const encodeData = (data: IEncryptedData): string => {
//   const encDataString = JSON.stringify(data).replace(/\s+/g, '');
//   console.log('JSON String:', encDataString);
//   const compressed = pako.deflate(encDataString, { level: 9 });
//   console.log('Compressed Data:', compressed);
//   const encodedData = btoa(String.fromCharCode.apply(null, Array.from(compressed)));
//   console.log('Base64 Encoded Data:', encodedData);

//   return encodedData;
// };

// const dataToBot = createServiceObject({ c: command, wt: workTypeKey });

//   const dataToBot = createServiceObject({
//     c: command,
//     wt: workTypeKey,
//     ea: expertiseAreaKey,
//     et: executionTimeKey,
//     u: uniqueness,
//   });
//   return encodeData(dataToBot);
// };

// const dataToBot = createServiceObject({ c: command });