// {
//   isThisOn (noteName, jsonFile, currentTime, fadeLength = 0) {
//     if (!jsonFile?.notes) throw new Error('missing jsonFile.notes')
//     const noteArr = jsonFile.notes[noteName];
//     if (!noteArr) {
//       return {playing:false, fading:false};}

//     for(let i = 0; i < noteArr.length; i++){
//       const thisNote = noteArr[i]
//       if (thisNote.start <= currentTime && thisNote.end > currentTime) {
//         return {playing: true, fading: false};
//       }
//       if (thisNote.start <= currentTime && thisNote.end + fadeLength > currentTime) {
//         // this note is over, but it is still fading
//         return {playing:false, fading:true, latestEnd: thisNote.end }
//       }
//       if (thisNote.start > currentTime) {
//         // the rest are notes in the future;
//         break;
//       }
//     }

//     return {playing:false, fading:false};
//   },

// }

export const foo = () => {};
