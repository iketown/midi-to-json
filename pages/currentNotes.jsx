{
  currentNotes: function (track, time)  {
    if (!track || !time) return 'ERROR'
    const {notes} = track
    const currentNotes = Object.entries(notes)
      .filter(([noteName, noteArr]) => {
        const currentNote = noteArr.find(
          ({ startTime, endTime }) => startTime <= time && endTime > time
        );
        return !!currentNote;
      })
      .map(([noteName]) => noteName);
    return JSON.stringify(currentNotes,null,2);
  }
}
